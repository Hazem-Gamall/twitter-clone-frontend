import { Link, createSearchParams, useSearchParams } from "react-router-dom";
import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import { TopBar } from "../components/Profile/TopBar";
import {
  PostSearchResults,
  UserSearchResults,
} from "../components/Search/SearchResults";

export const Search = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";
  const filter = searchParams.get("f") || "users";
  const tabIndex = filter === "users" ? 0 : 1;

  return (
    <>
      <TopBar username="Search" />
      <Tabs isFitted index={tabIndex}>
        <TabList>
          <Tab
            as={Link}
            to={{
              pathname: "/search",
              search: createSearchParams({
                f: "users",
                q: query,
              }).toString(),
            }}
          >
            Users
          </Tab>
          <Tab
            as={Link}
            to={{
              pathname: "/search",
              search: createSearchParams({
                f: "posts",
                q: query,
              }).toString(),
            }}
          >
            Posts
          </Tab>
        </TabList>
        <TabPanels>
          <TabPanel p={0}>
            <UserSearchResults query={query} />
          </TabPanel>
          <TabPanel p={0}>
            <PostSearchResults query={query} />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </>
  );
};
