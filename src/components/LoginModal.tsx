import {
  Button,
  FormControl,
  FormErrorMessage,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  VStack,
  useDisclosure,
} from "@chakra-ui/react";

import { FieldValues, useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import apiClient from "../services/apiClient";
import { useContext } from "react";
import AuthContext from "../context/AuthProvider";
import { AxiosError } from "axios";

interface ApiResponse {
  access: string;
  refresh: string;
}

const schema = z.object({
  username: z.string().max(35, "Name should be under 35 characters.").min(1),
  password: z.string().min(8, "Password has to be at least 8 characters long."),
});

type FormData = z.infer<typeof schema>;

export const LoginModal = () => {
  const { handleSubmit, register, formState, setError } = useForm<FormData>({
    resolver: zodResolver(schema),
  });
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { setAuth } = useContext(AuthContext);

  const onSubmit = async (data: FieldValues) => {
    try {
      const tokenResult = await apiClient.post<ApiResponse>("/token/", data);

      localStorage.setItem("auth", JSON.stringify({ ...tokenResult.data }));
      setAuth((prev: { access: string; refresh: string }) => ({
        ...prev,
        ...tokenResult.data,
      }));
    } catch (e) {
      if (e instanceof AxiosError && e.response?.status === 401) {
        console.log("error");

        setError("root.serverError", {
          type: "custom",
          message: "Username or password incorrect",
        });
      }

      console.log(e);
    }
  };
  return (
    <>
      <Button onClick={onOpen} borderRadius={30} width={"100%"}>
        Sign in
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <ModalHeader>Login</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <VStack spacing={4}>
                <FormControl isInvalid={!formState.isValid}>
                  {formState.errors.root && (
                    <FormErrorMessage>
                      {formState.errors.root.serverError.message}
                    </FormErrorMessage>
                  )}
                </FormControl>
                <FormControl isInvalid={!formState.isValid}>
                  <Input
                    {...register("username")}
                    required
                    placeholder="username"
                  />
                  {formState.errors?.username && (
                    <FormErrorMessage>
                      {formState.errors.username.message}
                    </FormErrorMessage>
                  )}
                </FormControl>
                <FormControl isInvalid={!formState.isValid}>
                  <Input
                    {...register("password")}
                    type="password"
                    required
                    placeholder="password"
                  />
                  {formState.errors?.password && (
                    <FormErrorMessage>
                      {formState.errors.password.message}
                    </FormErrorMessage>
                  )}
                </FormControl>
              </VStack>
            </ModalBody>

            <ModalFooter>
              <Button type="submit" colorScheme="twitter" mr={3}>
                Submit
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
};
