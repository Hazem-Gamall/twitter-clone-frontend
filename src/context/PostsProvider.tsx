import { createContext, useState } from "react";

const PostsContext = createContext({});

interface Props {
  children: React.ReactNode;
}

export const PostsProvider = ({ children }: Props) => {
  const [posts, setPosts] = useState([]);

  return (
    <PostsContext.Provider value={{ posts, setPosts }}>
      {children}
    </PostsContext.Provider>
  );
};

export default PostsContext;
