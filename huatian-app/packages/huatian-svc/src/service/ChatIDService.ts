import { ChatIDSetDao } from '../dao/Dao';
import { DB } from '../dao/DB';

const STEP = 100000;
export class ChatIDService {
  private static inst = new ChatIDService();
  private id_base: number = -1;
  private id_start: number = 0;

  public static getInstance() {
    return ChatIDService.inst;
  }

  /**
   * 每次拿到得是一个集合得ID
   * 比如： 0-99999
   */
  private async requestIdSet() {
    if (this.id_base >= this.id_start && this.id_base < this.id_start + STEP) {
      return;
    }

    const sequelize = DB.getSequelize();
    // 事务
    const transaction = await sequelize.transaction();

    try {
      // 最后一条记录
      // 0----->100000
      // 0----->100000
      const lastRecord = await ChatIDSetDao.findOne({
        order: [['id', 'desc']],
        // 上锁保证第二个请求再第一个请求执行完
        lock: transaction.LOCK.UPDATE,
      });
      const startNumber = lastRecord ? lastRecord.getDataValue('start') + 100000 : 0;
      await ChatIDSetDao.create({
        app: 'test',
        start: startNumber,
      });

      this.id_start = startNumber;
      this.id_base = startNumber;
    } catch (ex) {
      console.error(ex);
      transaction.rollback();
    }
  }

  public async getId() {
    await this.requestIdSet();
    return this.id_base++;
  }
}
