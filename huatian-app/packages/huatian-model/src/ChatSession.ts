import { Message } from './Message';
import { User } from './User';

export class ChatSession {
  private from: User;
  private to: User;
  public constructor(from: User, to: User) {
    this.from = from;
    this.to = to;
  }

  public chat(sendMsg: Message, toReceiveMsg: Message) {
    this.from.chat().send(sendMsg);
    this.to.chat().receive(toReceiveMsg);
  }
}
