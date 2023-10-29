import { useParams } from "react-router-dom";
import { Spinner, VStack } from "@chakra-ui/react";
import { TopBar } from "./TopBar";
import { UserDetail } from "./UserDetail";
import useRetrieve from "../../hooks/useRetrieve";
import { IUserProfile } from "../../types/User";
import { userServiceFactory } from "../../services/httpServiceFactories";
import { PostsProvider } from "../../context/PostsProvider";
import { ProfileContent } from "./ProfileContent";

export const Profile = () => {
  const { username } = useParams();
  const {
    data: userProfile,
    setData: setUserProfile,
    error,
    isLoading,
  } = useRetrieve<IUserProfile>(userServiceFactory(), username as string, [
    username,
  ]);

  return (
    <PostsProvider>
      {error ? (
        <div>{error}</div>
      ) : (
        <VStack align={"stretch"}>
          <TopBar username={username} />
          {error && <div>{error}</div>}
          {isLoading ? (
            <Spinner alignSelf={"center"} />
          ) : (
            <>
              <UserDetail
                userProfile={userProfile}
                setUserProfile={setUserProfile}
              />
              <ProfileContent userProfile={userProfile} />
            </>
          )}
        </VStack>
      )}
    </PostsProvider>
  );
};