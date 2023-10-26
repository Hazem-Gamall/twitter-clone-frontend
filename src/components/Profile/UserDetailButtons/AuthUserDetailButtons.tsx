import {
  Avatar,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  Heading,
  IconButton,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Textarea,
  VStack,
  useDisclosure,
} from "@chakra-ui/react";
import TextareaAutoResize from "react-textarea-autosize";
import z from "zod";
import { AiOutlineClose } from "react-icons/ai";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { userWithImageServiceFactory } from "../../../services/httpServiceFactories";
import { IUserProfile } from "../../../types/User";

interface Props {
  userProfile: IUserProfile;
  setUserProfile: (userProfile: IUserProfile) => void;
}

const schema = z.object({
  cover_picture: z.any(),
  avatar: z.any(),
  user: z.object({
    name: z
      .string()
      .max(35, "Name can't exceed 35 characters.")
      .min(1, "You must provide a name."),
  }),
  bio: z.string().max(160, "Bio can't exceed 160 characters."),
  date_of_birth: z
    .string()
    .refine((date) => Date.parse(date) || { message: "Enter a valid date" }),
});

type FormData = z.infer<typeof schema>;

export const AuthUserDetailButtons = ({
  userProfile,
  setUserProfile,
}: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const userService = userWithImageServiceFactory();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      user: { name: userProfile.user.name },
      bio: userProfile.bio,
      date_of_birth: userProfile.date_of_birth,
    },
  });

  const onSubmit = (formData: FormData) => {
    console.log("formData", { formData });
    userService
      .patch(userProfile.user.username, formData)
      .request.then((resp) => {
        console.log("patch resp", resp);
        setUserProfile({ ...userProfile, ...resp.data });
      })
      .catch((err) => console.log("patch error", err));
  };

  return (
    <>
      <Button onClick={onOpen} variant={"outline"} borderRadius={30}>
        Edit profile
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay bg={"rgba(211,211,211,0.1)"} />
        <ModalContent bg={"black"} pb={5}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <ModalHeader p={2}>
              <HStack justifyContent={"space-between"}>
                <HStack>
                  <IconButton
                    variant={"ghost"}
                    borderRadius={30}
                    aria-label="Close"
                    icon={<AiOutlineClose />}
                    onClick={onClose}
                  />
                  <Heading fontSize={"xl"}>Edit profile</Heading>
                </HStack>
                <Button type="submit" colorScheme="cream" borderRadius={30}>
                  Save
                </Button>
              </HStack>
            </ModalHeader>

            <ModalBody>
              <VStack alignItems={"flex-start"}>
                <Input
                  {...register("cover_picture")}
                  type="file"
                  accept="image/*"
                />
                <HStack>
                  <Avatar src={userProfile.avatar}></Avatar>
                  <Input {...register("avatar")} type="file" accept="image/*" />
                </HStack>
                <FormControl isInvalid={!!errors.user?.name}>
                  <FormLabel>Name</FormLabel>
                  <Input {...register("user.name")} />
                  <FormErrorMessage>
                    {errors.user?.name?.message}
                  </FormErrorMessage>
                </FormControl>

                <FormControl isInvalid={!!errors.bio}>
                  <FormLabel>Bio</FormLabel>
                  <Textarea
                    {...register("bio")}
                    resize={"none"}
                    size={"lg"}
                    maxLength={160}
                    as={TextareaAutoResize}
                  />
                  <FormErrorMessage>{errors.bio?.message}</FormErrorMessage>
                </FormControl>

                <FormControl isInvalid={!!errors.date_of_birth}>
                  <FormLabel>Birth date</FormLabel>
                  <Input
                    {...register("date_of_birth")}
                    type="date"
                    placeholder={userProfile.date_of_birth}
                    max={new Date().toISOString().split("T")[0]}
                  />
                  <FormErrorMessage>
                    {errors.date_of_birth?.message}
                  </FormErrorMessage>
                </FormControl>
              </VStack>
            </ModalBody>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
};
