export enum MessageStatus {
  SENDING = 0,
  SENT,
  RECEIVING,
  RECEIVED,
  READED,
  ERROR,
}

export enum messageType {
  SEND = 0,
  RECEIVED,
  SYSTEM,
  NOTIFY,
}

export type Message = TextMessage | ImageMessage;
interface MessageDate {
  id: number;
  status: MessageStatus;
  type: messageType;
  from: number;
  to: number;
}
export interface TextMessage extends MessageDate {
  msg: string;
}
export interface ImageMessage extends MessageDate {
  url: string;
}
