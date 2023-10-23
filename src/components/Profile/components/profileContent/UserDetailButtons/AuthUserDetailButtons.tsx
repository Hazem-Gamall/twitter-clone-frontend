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
import { IUserProfile } from "../../../../../types/User";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { userServiceFactory } from "../../../../../services/httpServiceFactories";

interface Props {
  userProfile: IUserProfile;
}

const schema = z.object({
  cover_picture: z.any(),
  avatar: z.any(),
  name: z
    .string()
    .max(35, "Name can't exceed 35 characters.")
    .min(1, "You must provide a name."),
  bio: z.string().max(160, "Bio can't exceed 160 characters."),
  date_of_birth: z
    .string()
    .refine((date) => Date.parse(date) || { message: "Enter a valid date" }),
});

type FormData = z.infer<typeof schema>;

export const AuthUserDetailButtons = ({ userProfile }: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const userService = userServiceFactory();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: userProfile.user.name,
      bio: userProfile.bio,
      date_of_birth: userProfile.date_of_birth,
    },
  });

  const onSubmit = (formData: FormData) => {
    console.log("formData", { formData });
    formData.avatar = formData.avatar[0] || "";
    formData.cover_picture = formData.cover_picture[0] || "";
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
                <FormControl isInvalid={!!errors.name}>
                  <FormLabel>Name</FormLabel>
                  <Input {...register("name")} />
                  <FormErrorMessage>{errors.name?.message}</FormErrorMessage>
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
