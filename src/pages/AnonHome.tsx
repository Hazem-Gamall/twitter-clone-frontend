import {
  Button,
  Divider,
  Flex,
  Grid,
  GridItem,
  Heading,
  Image,
  VStack,
} from "@chakra-ui/react";
import { LoginModal } from "../components/LoginModal";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { useEffect } from "react";
import { RegisterationForm } from "../components/RegisterationForm";

export const AnonHome = () => {
  const navigate = useNavigate();
  const { auth } = useAuth();
  useEffect(() => {
    if (auth?.access) navigate("/home", { replace: true });
  }, [auth]);

  return (
    <Grid
      templateAreas={`"logo form"`}
      templateColumns={"1fr 1fr"}
      minHeight={"100vh"}
    >
      <GridItem area={"logo"}>
        <Flex
          height={"100%"}
          direction={"column"}
          alignItems={"center"}
          justifyContent={"center"}
        >
          <Image
            boxSize={400}
            src="https://upload.wikimedia.org/wikipedia/commons/9/95/Twitter_new_X_logo.png"
          />
        </Flex>
      </GridItem>
      <GridItem area={"form"}>
        <VStack
          spacing={16}
          alignItems={"flex-start"}
          justifyContent={"center"}
          height={"100%"}
        >
          <Heading size={"4xl"}>Happening now</Heading>
          <VStack width={"50%"}>
            <Heading alignSelf={"start"} as={"h2"}>
              Join today
            </Heading>
            <Button borderRadius={30} width={"100%"}>
              Google
            </Button>
            <Button borderRadius={30} width={"100%"}>
              Apple
            </Button>
            <Divider />

            <RegisterationForm />
          </VStack>
          <VStack width={"50%"}>
            <Heading as={"h5"} size={"md"}>
              Already have an account?
            </Heading>
            <LoginModal />
          </VStack>
        </VStack>
      </GridItem>
    </Grid>
  );
};
