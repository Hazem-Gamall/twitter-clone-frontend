interface User {
  name: string;
  username: string;
  email: string;
}

export interface UserProfile {
  user: User;
  date_of_birth: Date;
  follower_count: number;
  following_count: number;
  avatar?: string;
  cover_picture?: string;
}
