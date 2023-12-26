import { Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import { FormEvent, useRef } from "react";
import { BsSearch } from "react-icons/bs";
import { createSearchParams, useNavigate } from "react-router-dom";

interface Props {
  navigateToSearch?: boolean;
}

export const SearchBar = ({ navigateToSearch }: Props) => {
  const searchRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const handleSubmit = (ev: FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    if (searchRef.current) {
      const q = searchRef.current.value;
      if (!q) return;
      navigate({
        pathname: navigateToSearch ? "search" : "",
        search: createSearchParams({ q }).toString(),
      });
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <InputGroup
        variant={"filled"}
        bg={"gray.800"}
        borderRadius={30}
        zIndex={1}
      >
        <InputLeftElement children={<BsSearch />} />
        <Input
          ref={searchRef}
          type="search"
          borderRadius={30}
          placeholder="Search"
        />
      </InputGroup>
    </form>
  );
};
