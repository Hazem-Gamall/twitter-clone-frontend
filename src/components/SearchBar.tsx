import { Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import { FormEvent, useRef } from "react";
import { BsSearch } from "react-icons/bs";
import { createSearchParams, useNavigate } from "react-router-dom";

export const SearchBar = () => {
  const searchRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const handleSubmit = (ev: FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    if (searchRef.current) {
      navigate({
        pathname: "search",
        search: createSearchParams({ q: searchRef.current.value }).toString(),
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
