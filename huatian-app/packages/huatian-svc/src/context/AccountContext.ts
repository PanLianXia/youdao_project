import { UserRepository } from '../repo/UserRepository';

export class AccountContext {
  // 单例，每个场景在一个服务中一个就够了
  private static inst: AccountContext;
  private repo: UserRepository = new UserRepository();
  public static getInstance() {
    if (!AccountContext.inst) {
      AccountContext.inst = new AccountContext();
    }
    return AccountContext.inst;
  }

  public async verity(uname: string, passwd: string) {
    const user = this.repo.getUser(uname, passwd);
    return user;
  }
}
