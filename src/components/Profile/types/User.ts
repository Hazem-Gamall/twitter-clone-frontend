interface User {
  name: string;
  username: string;
  email: string;
  date_joined: string;
}

export interface IUserProfile {
  user: User;
  date_of_birth: Date;
  follower_count: number;
  following_count: number;
  avatar?: string;
  cover_picture?: string;
}
