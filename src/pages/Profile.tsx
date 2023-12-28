import { Route, Routes, useParams } from "react-router-dom";
import { Spinner, VStack } from "@chakra-ui/react";
import { TopBar } from "../components/Profile/TopBar";
import { UserDetail } from "../components/Profile/UserDetail";
import useRetrieve from "../hooks/useRetrieve";
import { IUserProfile } from "../types/User";
import { userServiceFactory } from "../services/httpServiceFactories";
import { ProfileContent } from "../components/Profile/ProfileContent";
import { UserFollows } from "../components/Profile/UserFollows";
import { PostDetail } from "../components/Post/PostDetail";

const UserProfile = () => {
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
    <>
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
    </>
  );
};

export const Profile = () => {
  return (
    <>
      <Routes>
        <Route path="/*" element={<UserProfile />} />
        <Route path="/followers" element={<UserFollows type="followers" />} />
        <Route path="/following" element={<UserFollows type="following" />} />
        <Route path="status/:post_id" element={<PostDetail />} />
      </Routes>
    </>
  );
};
