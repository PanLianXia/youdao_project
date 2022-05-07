import { ChatSession } from './ChatSession';
import { Message, MessageStatus, messageType } from './Message';
import { User } from './User';

export class UserChat {
  private user: User;
  private msgs: Array<Message> = [];
  private sessions: Record<number, ChatSession> = {};

  constructor(user: User) {
    this.user = user;
  }

  public createChatSession(to: User) {
    if (this.sessions[to.getId()]) {
      return this.sessions[to.getId()];
    }
    const session = new ChatSession(this.user, to);
    this.sessions[to.getId()] = session;
    return session;
  }

  public send(msg: Message) {
    this.msgs.push(msg);
    msg.status = MessageStatus.SENT;
    msg.type = messageType.SEND;
  }

  public receive(msg: Message) {
    this.msgs.push(msg);
    msg.status = MessageStatus.RECEIVING;
    msg.type = messageType.RECEIVED;
  }
  // 告诉服务端这些消息已经读过了
  public readTo(lastId: number) {
    const unreads = this.msgs.filter((x) => x.id <= lastId && x.status === MessageStatus.RECEIVED);
    unreads.forEach((msg) => {
      msg.status = MessageStatus.READED;
    });
  }

  public unReadMessage(lastReadId: number) {
    // Client id(最后一条消息)
    return this.msgs.filter((x) => x.id > lastReadId);
  }
}
