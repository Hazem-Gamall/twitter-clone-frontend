import IChat from "./Chat";
import { IUserProfile } from "./User";

export default interface IMessage {
  id: number;
  text: string;
  chat: IChat;
  author: IUserProfile;
  creating: string;
  last_edit: string;
  seen: boolean;
}
