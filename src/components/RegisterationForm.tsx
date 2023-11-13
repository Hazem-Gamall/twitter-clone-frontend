import {
  Button,
  HStack,
  Heading,
  FormControl,
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  VStack,
  useDisclosure,
  Input,
  FormLabel,
  FormErrorMessage,
} from "@chakra-ui/react";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { unAuthinticatedApiClient } from "../services/apiClient";

const schema = z.object({
  user: z
    .object({
      name: z
        .string()
        .min(1, "Name is required")
        .max(35, "Name cannot exceed 35 characters"),
      username: z
        .string()
        .min(1, "Username is required")
        .max(35, "Username cannot exceed 35 characters"),
      email: z
        .string()
        .email("This is not a correct email")
        .optional()
        .or(z.literal("")),
      password: z.string().min(8, "Password must be 8 characters minimum"),
      confirm: z.string().min(8, "Password must be 8 characters minimum"),
    })
    .refine((data) => data.password === data.confirm, {
      message: "Passwords don't match",
      path: ["confirm"],
    }),

  date_of_birth: z
    .string()
    .min(1, "Birth date is required")
    .refine((date) => Date.parse(date) || { message: "Enter a valid date" }),
});

type FormData = z.infer<typeof schema>;

export const RegisterationForm = () => {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<FormData>({ resolver: zodResolver(schema) });
  console.log("errors", errors);
  const onFormSubmit = (data: FormData) => {
    unAuthinticatedApiClient
      .post("/users/", data)
      .then((resp) => {
        console.log("resp", resp);
        onClose();
      })
      .catch((error) => {
        console.log("error", error);
        if (error.response?.status !== 400) return;
        if (error.response?.data?.user) {
          const userErrors = error.response.data.user;
          console.log("error user", userErrors);

          const userErrorTypes = [
            "username",
            "name",
            "email",
            "password",
          ] as const;
          type UserErrorTypes = (typeof userErrorTypes)[number];
          (Object.keys(userErrors) as UserErrorTypes[]).forEach((err) =>
            setError(`user.${err}`, { message: userErrors[err] })
          );
        }
      });
  };
  return (
    <>
      <Button
        colorScheme="twitter"
        borderRadius={30}
        width={"100%"}
        onClick={onOpen}
      >
        Create account
      </Button>
      <Modal size={"xl"} onClose={onClose} isOpen={isOpen}>
        <ModalOverlay bg={"rgba(211,211,211,0.1)"} />
        <ModalContent bg={"black"} pb={5}>
          <ModalHeader as={HStack} justifyContent={"flex-start"}>
            <ModalCloseButton />
          </ModalHeader>
          <VStack py={10} px={20} align={"stretch"}>
            <Heading fontSize={"2xl"}>Create your account</Heading>
            <form onSubmit={handleSubmit(onFormSubmit)}>
              <FormControl isInvalid={!!errors.user?.name}>
                <FormLabel>Name</FormLabel>
                <Input {...register("user.name")} placeholder="Name" />
                <FormErrorMessage>
                  {errors.user?.name?.message}
                </FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={!!errors.user?.username}>
                <FormLabel>Username</FormLabel>
                <Input {...register("user.username")} placeholder="Username" />
                <FormErrorMessage>
                  {errors.user?.username?.message}
                </FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={!!errors.user?.email}>
                <FormLabel>Email</FormLabel>
                <Input
                  {...register("user.email")}
                  type="email"
                  placeholder="Email"
                />
                <FormErrorMessage>
                  {errors.user?.email?.message}
                </FormErrorMessage>
              </FormControl>
              <HStack>
                <FormControl isInvalid={!!errors.user?.password}>
                  <FormLabel>Password</FormLabel>
                  <Input
                    {...register("user.password")}
                    type="password"
                    placeholder="Password"
                  />
                  <FormErrorMessage>
                    {errors.user?.password?.message}
                  </FormErrorMessage>
                </FormControl>

                <FormControl isInvalid={!!errors.user?.confirm}>
                  <FormLabel>Confirm password</FormLabel>
                  <Input
                    {...register("user.confirm")}
                    type="password"
                    placeholder="Confirm passsword"
                  />
                  <FormErrorMessage>
                    {errors.user?.confirm?.message}
                  </FormErrorMessage>
                </FormControl>
              </HStack>

              <FormControl isInvalid={!!errors.date_of_birth}>
                <FormLabel>Birth date</FormLabel>
                <Input
                  {...register("date_of_birth")}
                  type="date"
                  max={new Date().toISOString().split("T")[0]}
                />
                <FormErrorMessage>
                  {errors.date_of_birth?.message}
                </FormErrorMessage>
              </FormControl>
              <Button mt={5} borderRadius={30} width={"100%"} type="submit">
                Create
              </Button>
            </form>
          </VStack>
        </ModalContent>
      </Modal>
    </>
  );
};
