import { User } from '@huatian/model';

export class UserRepository {
  // 本地用户存储
  private users: Record<number, User> = {};

  public static inst = new UserRepository();
  public static getInstance() {
    return UserRepository.inst;
  }

  public getUser(uid: number): User;
  public getUser(user: string, passwd: string): User;
  public getUser(identity: number | string, passwd?: string): User {
    // 窄化
    if (typeof identity === 'number') {
      const uid = identity;
      if (this.users[uid]) {
        return this.users[uid];
      }

      const newUser = new User(uid);
      this.users[uid] = newUser;
      return newUser;
    } else {
      const user = identity;
      const idmap = {
        zhangsan: 1,
        lisi: 2,
        wangwu: 3,
      };

      return this.getUser(idmap[user] || 1);
    }
  }
}
