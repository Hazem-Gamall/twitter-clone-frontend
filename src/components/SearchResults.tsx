import { Spinner, VStack, forwardRef } from "@chakra-ui/react";
import { Post } from "./Post/Post";
import { UserCard } from "./Profile/UserCard";
import { searchServiceFactory } from "../services/httpServiceFactories";
import IPost from "../types/Post";
import { IUserProfile } from "../types/User";
import useInfiniteScroll from "../hooks/useInfiniteScroll";

const UserResult = forwardRef(
  ({ userProfile }: { userProfile: IUserProfile }, ref) => {
    return <UserCard ref={ref} userProfile={userProfile} />;
  }
);

const PostResult = forwardRef(({ post }: { post: IPost }, ref) => {
  return <Post ref={ref} post={post} variant="none" />;
});

const SearchResults = ({
  filter,
  query,
}: {
  filter: string;
  query: string;
}) => {
  const httpService = searchServiceFactory(filter);
  const { data, isLoading, error, lastElementRef } = useInfiniteScroll(
    httpService,
    { q: query },
    [query, filter]
  );
  if (!data) return;
  return (
    <>
      {error && <div>Error:{error}</div>}
      {filter === "users" &&
        (data as IUserProfile[]).map((userProfile: IUserProfile, index) => (
          <UserResult
            key={userProfile.user.username}
            userProfile={userProfile}
            ref={index === data.length - 1 ? lastElementRef : null}
          />
        ))}

      {filter === "posts" &&
        (data as IPost[]).map((post: IPost, index) => (
          <PostResult
            key={post.id}
            ref={index === data.length - 1 ? lastElementRef : null}
            post={post}
          />
        ))}
      <VStack>{isLoading && <Spinner alignSelf={"center"} />}</VStack>
    </>
  );
};

export const UserSearchResults = ({ query }: { query: string }) => {
  return <SearchResults filter="users" query={query} />;
};

export const PostSearchResults = ({ query }: { query: string }) => {
  return <SearchResults filter="posts" query={query} />;
};
