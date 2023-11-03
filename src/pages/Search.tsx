import { useSearchParams } from "react-router-dom";
import useInfiniteScroll from "../hooks/useInfiniteScroll";
import { Spinner, VStack } from "@chakra-ui/react";
import { IUserProfile } from "../types/User";
import { userSearchServiceFactory } from "../services/httpServiceFactories";
import { TopBar } from "../components/Profile/TopBar";
import { UserCard } from "../components/Profile/UserCard";

export const Search = () => {
  const [searchParams] = useSearchParams();
  const q = searchParams.get("q");
  const httpService = userSearchServiceFactory();
  const { data, isLoading, error, lastElementRef } =
    useInfiniteScroll<IUserProfile>(httpService, { q }, [q]);

  if (error) return <div>Error:{error}</div>;

  return (
    <>
      <TopBar username="Search" />
      <VStack>
        {data &&
          data.map((userProfile, index) => (
            <UserCard
              key={userProfile.user.username}
              userProfile={userProfile}
              ref={index === data.length - 1 ? lastElementRef : null}
            />
          ))}
        {isLoading && <Spinner alignSelf={"center"} />}
      </VStack>
    </>
  );
};
