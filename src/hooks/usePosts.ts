import { useContext } from "react";
import PostsContext from "../context/PostsProvider";

const usePosts = () => {
  const { posts, setPosts } = useContext(PostsContext);

  return {
    posts,
    setPosts,
  };
};

export default usePosts;
