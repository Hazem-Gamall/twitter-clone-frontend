import IPost from "./Post";
import { IUserProfile } from "./User";

export interface INotification {
  id: number;
  notification_type: "R" | "T" | "L" | "M";
  issuer: IUserProfile;
  post: IPost;
  receiver: IUserProfile;
  creation: string;
  viewed: boolean;
}
