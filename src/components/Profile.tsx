import { useParams } from "react-router-dom";
import useApiClient from "../hooks/useApiClient";
import { useEffect } from "react";

export const Profile = () => {
  const { username } = useParams();
  const apiClient = useApiClient();
  useEffect(() => {
    apiClient.get("/users/1/").then((resp) => console.log(resp));
  }, []);
  return <div>{username} Profile</div>;
};
