import React from "react";
import {
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  useBreakpointValue,
  useColorModeValue,
  FormErrorMessage,
} from "@chakra-ui/react";

import { useForm } from "react-hook-form";
import { HiEye, HiEyeOff } from "react-icons/hi";
import axios from "axios";
import { useSession, signIn, signOut, getSession } from "next-auth/react";
import { useRouter } from "next/router";
import { parseCookies } from "nookies";
import { useDispatch, useSelector } from "react-redux";
import { loadUser } from "../../redux/userAction";
const cookie = require("js-cookie");
const ProfileComponents = () => {
  const [isLoading, setIsLoading] = React.useState(false);
  const dispatch: any = useDispatch();
  const profile = useSelector((state: any) => state.profile);
  const { loading, error, dbUser } = profile;
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitted },
  } = useForm();
  const { data: session } = useSession();
  const router = useRouter();
  const cookies = parseCookies();
  const user = cookies?.user
    ? JSON.parse(cookies.user)
    : session?.user
    ? session?.user
    : "";

  const onSubmit = (data: Object) => {
    setIsLoading(true);
    axios
      .put("/api/user/register", data, {
        headers: {
          Accept: "application/json",
          Authorization: cookies && cookies.token,
        },
      })
      .then((res) => {
        console.log(res);
        setIsLoading(false);
        dispatch(loadUser(res.data.user.email, res.data.user));
        //  cookie.set("user", JSON.stringify(res.data.user));
        // router.push("/");
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  };
  return (
    <Container
      maxW="lg"
      py={{ base: "12", md: "24" }}
      px={{ base: "0", sm: "8" }}
    >
      <Stack spacing="8">
        <Stack spacing="6">
          <Stack spacing={{ base: "2", md: "3" }} textAlign="center">
            <Heading size={useBreakpointValue({ base: "xs", md: "sm" })}>
              Update profile
            </Heading>
          </Stack>
        </Stack>
        <form onSubmit={handleSubmit(onSubmit)} id="submit">
          <Box
            py={{ base: "0", sm: "8" }}
            px={{ base: "4", sm: "10" }}
            bg={useBreakpointValue({ base: "transparent", sm: "bg-surface" })}
            boxShadow={{ base: "none", sm: useColorModeValue("md", "md-dark") }}
            borderRadius={{ base: "none", sm: "xl" }}
          >
            <Stack spacing="6">
              <Stack spacing="5">
                <FormControl isInvalid={errors.name}>
                  <FormLabel htmlFor="text">Name</FormLabel>
                  <Input
                    //   id="text"
                    type="text"
                    placeholder={dbUser && dbUser.name}
                    {...register("name", {
                      minLength: {
                        value: 4,
                        message: "Minimum length should be 4",
                      },
                    })}
                  />
                  <FormErrorMessage>
                    {errors.name && errors.name.message}
                  </FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={errors.email}>
                  <FormLabel htmlFor="email" mt={4}>
                    Email
                  </FormLabel>
                  <Input
                    //  id="email"
                    type="email"
                    placeholder={dbUser && dbUser.email}
                    {...register("email", {
                      minLength: {
                        value: 4,
                        message: "Minimum length should be 4",
                      },
                    })}
                  />
                  <FormErrorMessage>
                    {errors.email && errors.email.message}
                  </FormErrorMessage>
                </FormControl>
              </Stack>

              <Stack spacing="6" mt={8}>
                <Button
                  id="submit"
                  colorScheme={"brand"}
                  _hover={{ bg: "pink.300" }}
                  type="submit"
                  isLoading={isLoading}
                >
                  {" "}
                  update
                </Button>
              </Stack>
            </Stack>
          </Box>
        </form>
      </Stack>
    </Container>
  );
};

export default ProfileComponents;
