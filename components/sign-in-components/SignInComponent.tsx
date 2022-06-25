import {
  Box,
  Button,
  Checkbox,
  Container,
  Divider,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Input,
  Stack,
  Text,
  useBreakpointValue,
  useColorModeValue,
  IconButton,
  InputGroup,
  InputProps,
  InputRightElement,
  useDisclosure,
  useMergeRefs,
  FormErrorMessage,
  useToast,
} from "@chakra-ui/react";
import * as React from "react";
import axios from "axios";
import { useSession, signIn, signOut, getSession } from "next-auth/react";
import { useRouter } from "next/router";
import { parseCookies } from "nookies";
import { useForm } from "react-hook-form";
import { OAuthButtonGroup } from "./OAuthButtonGroup ";
const cookie = require("js-cookie");
import { HiEye, HiEyeOff } from "react-icons/hi";
const SignInComponent = () => {
  const toast = useToast();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitted },
  } = useForm();
  const [isLoading, setIsLoading] = React.useState(false);
  const { isOpen, onToggle } = useDisclosure();
  const inputRef = React.useRef<HTMLInputElement>(null);
  const router = useRouter();
  const cookies = parseCookies();
  const { data: session } = useSession();

  React.useEffect(() => {
    if (session) {
      router.push("/");
    }

    if (cookies?.user) {
      router.push("/");
    }
  }, [router, session]); // eslint-disable-line

  const onClickReveal = () => {
    onToggle();
    if (inputRef.current) {
      inputRef.current.focus({ preventScroll: true });
    }
  };

  const onSubmit = (data: Object, e: any) => {
    setIsLoading(true);
    axios
      .post("http://localhost:3000/api/user/login", data)
      .then((res) => {
        console.log(res);
        // signIn()
        setIsLoading(false);
        cookie.set("token", res.data.token);
        cookie.set("user", JSON.stringify(res.data.user));

        router.push("/");
      })
      .catch((err: any) => {
        setIsLoading(false);
        toast({
          title: "An error occurred.",
          description: err.response.data.error,
          status: "error",
          duration: 5000,
          isClosable: true,
        });
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
              Log in to your account
            </Heading>
            <HStack spacing="1" justify="center">
              <Text color="muted">Don t have an account?</Text>
              <Button variant="link" colorScheme="blue">
                Sign up
              </Button>
            </HStack>
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
                <FormControl isInvalid={errors.email}>
                  <FormLabel htmlFor="email">Email</FormLabel>
                  <Input
                    type="email"
                    {...register("email", {
                      required: "This is required",
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
                {/************password section********************/}
                <FormControl isInvalid={errors.password}>
                  <FormLabel htmlFor="password" mt={4}>
                    password
                  </FormLabel>
                  <InputGroup>
                    <InputRightElement>
                      <IconButton
                        variant="link"
                        aria-label={
                          isOpen ? "Mask password" : "Reveal password"
                        }
                        icon={isOpen ? <HiEyeOff /> : <HiEye />}
                        onClick={onClickReveal}
                      />
                    </InputRightElement>
                    <Input
                      //   id="password"
                      {...register("password", {
                        required: "This is required",
                        minLength: {
                          value: 4,
                          message: "Minimum length should be 4",
                        },
                      })}
                      //  ref={mergeRef}
                      //  name="password"
                      type={isOpen ? "text" : "password"}
                      autoComplete="current-password"
                    />
                  </InputGroup>
                  <FormErrorMessage>
                    {errors.password && errors.password.message}
                  </FormErrorMessage>
                </FormControl>
              </Stack>
              <HStack justify="space-between">
                <Checkbox defaultChecked>Remember me</Checkbox>
                <Button variant="link" colorScheme="blue" size="sm">
                  Forgot password?
                </Button>
              </HStack>
              <Stack spacing="6">
                <Button
                  colorScheme={"brand"}
                  type="submit"
                  id="submit"
                  isLoading={isLoading}
                  _hover={{ bg: "pink.300" }}
                >
                  Sign in
                </Button>
                <HStack>
                  <Divider />
                  <Text fontSize="sm" whiteSpace="nowrap" color="muted">
                    or continue with
                  </Text>
                  <Divider />
                </HStack>
                <OAuthButtonGroup />
              </Stack>
            </Stack>
          </Box>
        </form>
      </Stack>
    </Container>
  );
};

export default SignInComponent;
