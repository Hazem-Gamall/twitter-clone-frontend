import { useParams } from "react-router-dom";
import {
  postRepliesServiceFatory,
  postsServiceFatory,
} from "../../services/httpServiceFactories";
import useRetrieve from "../../hooks/useRetrieve";
import { Divider, Spinner } from "@chakra-ui/react";
import { Post } from "./Post";
import IPost from "../../types/Post";
import { TopBar } from "../Profile/TopBar";
import { ReplyPost } from "./ReplyPost";
import { NewPost } from "./NewPost";
import useList from "../../hooks/useList";

export const PostDetail = () => {
  let { post_id } = useParams();
  post_id = post_id as string;
  const {
    data: post,
    isLoading: postLoading,
    error: postError,
  } = useRetrieve<IPost>(postsServiceFatory(), post_id, [post_id]);

  const {
    data: replies,
    setData: setReplies,
    isLoading: repliesLoading,
    error: repliesError,
  } = useList<IPost>(postRepliesServiceFatory(parseInt(post_id)), {}, [
    post_id,
  ]);

  if (postLoading) return <Spinner />;

  return (
    <>
      {postError && <div>error: {postError}</div>}
      <TopBar username="Post" />
      {post.reply_to ? (
        <ReplyPost post={post} />
      ) : (
        <Post post={post} variant="none" />
      )}
      <NewPost
        handlePostSubmit={(post) => setReplies([post, ...replies])}
        reply_post={post}
      />
      <Divider mt={5} />
      {repliesError && <div>replies error: {repliesError}</div>}
      {!repliesError && repliesLoading ? (
        <Spinner />
      ) : (
        replies.map((reply) => <Post post={reply} variant="none" />)
      )}
    </>
  );
};
