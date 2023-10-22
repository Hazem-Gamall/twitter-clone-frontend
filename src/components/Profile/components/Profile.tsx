import { useParams } from "react-router-dom";
import useApiClient from "../../../hooks/useApiClient";
import { useEffect, useState } from "react";
import { Spinner, VStack } from "@chakra-ui/react";
import { TopBar } from "./TopBar";
import { UserDetail } from "./UserDetail";
import { UserProfile } from "../types/User";

export const Profile = () => {
  const { username } = useParams();
  const apiClient = useApiClient();
  const [userProfile, setUserProfile] = useState<UserProfile>(Object);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    apiClient
      .get(`/users/${username}/`)
      .then((resp) => {
        setUserProfile(resp.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log("error", error);
        setIsLoading(false);
        setError(error.message);
      });
  }, [username]);

  return (
    <VStack align={"stretch"}>
      <TopBar username={username} />
      {error && <div>{error}</div>}
      {isLoading ? <Spinner /> : <UserDetail userProfile={userProfile} />}
    </VStack>
  );
};
