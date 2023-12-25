interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  date_joined: string;
}

export interface IUserProfile {
  user: User;
  date_of_birth: string;
  follower_count: number;
  following_count: number;
  followed_by_user: boolean;
  avatar?: string;
  cover_picture?: string;
  bio?: string;
}
