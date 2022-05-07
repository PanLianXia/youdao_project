import { Message } from '@huatian/model';
import { UserRepository } from '../repo/UserRepository';
import { ChatIDService } from '../service/ChatIDService';

export class ChatContext {
  private static inst = new ChatContext();
  private repo = UserRepository.getInstance();

  public static getInstance() {
    return ChatContext.inst;
  }

  public async send(uid: number, msg: Message) {
    const sendMag = { ...msg };
    const reveiveMag = { ...msg };
    sendMag.id = await ChatIDService.getInstance().getId();
    reveiveMag.id = await ChatIDService.getInstance().getId();
    msg.from = uid;
    const from = this.repo.getUser(msg.from);
    const to = this.repo.getUser(msg.to);
    const session = from.chat().createChatSession(to);
    session.chat(sendMag, reveiveMag);
    return sendMag.id;
  }

  public read(uid: number, lastId: number) {
    const user = this.repo.getUser(uid);
    return user.chat().unReadMessage(lastId);
  }
}
