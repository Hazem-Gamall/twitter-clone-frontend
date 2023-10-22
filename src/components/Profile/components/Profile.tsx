import { useParams } from "react-router-dom";
import useApiClient from "../../../hooks/useApiClient";
import { useEffect, useState } from "react";
import { VStack } from "@chakra-ui/react";
import { TopBar } from "./TopBar";
import { UserDetail } from "./UserDetail";
import { UserProfile } from "../types/User";

export const Profile = () => {
  const { username } = useParams();
  const apiClient = useApiClient();
  const [userProfile, setUserProfile] = useState<UserProfile>(Object);

  useEffect(() => {
    apiClient
      .get(`/users/${username}/`)
      .then((resp) => console.log(resp))
      .catch((error) => console.log("error", error));
  }, [username]);

  return (
    <VStack align={"stretch"}>
      <TopBar username={username} />
      <UserDetail userProfile={userProfile} />
    </VStack>
  );
};
