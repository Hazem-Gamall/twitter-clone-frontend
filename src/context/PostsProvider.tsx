import { createContext, useState } from "react";
import IPost from "../types/Post";

interface IPostContext {
  posts?: IPost[];
  setPosts?: (posts: IPost[]) => void;
}

const PostsContext = createContext<IPostContext>({});

interface Props {
  children: React.ReactNode;
}

export const PostsProvider = ({ children }: Props) => {
  const [posts, setPosts] = useState<IPost[]>([]);

  return (
    <PostsContext.Provider value={{ posts, setPosts }}>
      {children}
    </PostsContext.Provider>
  );
};

export default PostsContext;
