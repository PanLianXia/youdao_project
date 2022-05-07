import { UserChat } from './UserChat';

export class User {
  private id: number;
  private _chat: UserChat;

  public constructor(id: number) {
    this.id = id;
    this._chat = new UserChat(this);
  }

  //不推荐这样写
  // 使用时 const user = new User(); user.id用户可能不知道id是函数
  // get id() {
  //   return this._id;
  // }

  public getId() {
    return this.id;
  }

  public chat() {
    return this._chat;
  }
}
