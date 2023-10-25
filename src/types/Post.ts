export default interface IPost {
  id: number;
  media: [
    {
      id: number;
      file: string;
      post: number;
    }
  ];
  creation: string;
  text: string;
  repost: false;
  post_user: {
    name: string;
    avatar: string;
    username: string;
  };
  embed: boolean;
  replies_count: number;
  likes_count: number;
  liked_by_user: boolean;
  repost_count: number;
  reposted_by_user: boolean;
}
