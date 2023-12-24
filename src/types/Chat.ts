import IMessage from "./Message";
import { IUserProfile } from "./User";

export default interface IChat {
  id: number;
  creation: string;
  last_edit: string;
  first_user_profile: IUserProfile;
  second_user_profile: IUserProfile;
  last_message: IMessage;
}
