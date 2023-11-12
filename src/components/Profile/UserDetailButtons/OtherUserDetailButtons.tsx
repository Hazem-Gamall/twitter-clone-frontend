import { Button, IconButton } from "@chakra-ui/react";
import { FiMail, FiMoreHorizontal } from "react-icons/fi";
import { userFollowingService } from "../../../services/httpServiceFactories";
import useAuth from "../../../hooks/useAuth";
import { IUserProfile } from "../../../types/User";
interface Props {
  userProfile: IUserProfile;
  setUserProfile: (userProfile: IUserProfile) => void;
}

export const OtherUserDetailButtons = ({
  userProfile,
  setUserProfile,
}: Props) => {
  const { auth } = useAuth();

  const httpService = userFollowingService(auth?.username as string);

  const handleFollow = () => {
    const { request } = httpService.create({
      username: userProfile.user.username,
    });
    request
      .then((resp) => console.log("followed succesfully", resp.data))
      .then(() => setUserProfile({ ...userProfile, followed_by_user: true }))
      .catch((error) => console.log("error following", error));
  };

  const handleUnfollow = () => {
    const { request } = httpService.delete(userProfile.user.username);
    request
      .then((resp) => console.log("unfollowed succesfully", resp.data))
      .then(() => setUserProfile({ ...userProfile, followed_by_user: false }))
      .catch((error) => console.log("error following", error));
  };

  return (
    <>
      <IconButton
        aria-label="more"
        icon={<FiMoreHorizontal />}
        borderRadius={30}
        fontSize={"xl"}
        variant={"outline"}
      />

      <IconButton
        aria-label="messages"
        icon={<FiMail />}
        borderRadius={30}
        fontSize={"xl"}
        variant={"outline"}
      />

      {userProfile.followed_by_user ? (
        <Button variant={"outline"} borderRadius={30} onClick={handleUnfollow}>
          Following
        </Button>
      ) : (
        <Button colorScheme="twitter" borderRadius={30} onClick={handleFollow}>
          Follow
        </Button>
      )}
    </>
  );
};
