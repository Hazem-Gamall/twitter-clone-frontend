import { useParams } from "react-router-dom";
import { Spinner, VStack } from "@chakra-ui/react";
import { TopBar } from "../TopBar";
import { UserDetail } from "../UserDetail";
import { IUserProfile } from "../../../../types/User";
import { ProfileContent } from "../ProfileContent";
import { userServiceFactory } from "../../../../services/httpServiceFactories";
import useRetrieve from "../../../../hooks/useRetrieve";

export const Profile = () => {
  const { username } = useParams();
  const {
    data: userProfile,
    error,
    isLoading,
  } = useRetrieve<IUserProfile>(userServiceFactory(), username as string, [
    username,
  ]);

  return (
    <VStack align={"stretch"}>
      <TopBar username={username} />
      {error && <div>{error}</div>}
      {isLoading ? <Spinner /> : <UserDetail userProfile={userProfile} />}
      {isLoading ? <Spinner /> : <ProfileContent userProfile={userProfile} />}
    </VStack>
  );
};
