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
  useToast
} from "@chakra-ui/react";
import * as React from "react";
import { useForm } from "react-hook-form";
import { HiEye, HiEyeOff } from "react-icons/hi";
import axios from "axios";
import { useSession, signIn, signOut, getSession } from "next-auth/react"
import { useRouter } from "next/router"
import { parseCookies } from "nookies"
const cookie = require("js-cookie");
const SignUpComponent = () => {
  const toast = useToast () ; 
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitted },
  } = useForm();
  const { data: session } = useSession()
  const router = useRouter()
  const cookies = parseCookies()
  const { isOpen, onToggle } = useDisclosure();
  const [isLoading, setIsLoading] = React.useState(false);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const mergeRef: ((node: HTMLInputElement) => void) | null = useMergeRefs(
    inputRef,
    null
  );
  React.useEffect(() => {
    if (session) {
      router.push("/")
    }

    if (cookies?.user) {
      router.push("/")
    }
  }, [router]) // eslint-disable-line


  const onClickReveal = () => {
    onToggle();
    if (inputRef.current) {
      inputRef.current.focus({ preventScroll: true });
    }
  };

  const onSubmit = (data: Object) => {
    setIsLoading(true);
    axios
      .post("http://localhost:3000/api/user/register", data)
      .then((res) => {
        setIsLoading(false);
        cookie.set("token", res.data?.token)
        cookie.set("user", JSON.stringify(res.data.user))
        router.push("/")
      })
      .catch((err) => {
        setIsLoading(false);
        toast({
          title: 'An error occurred.',
          description: err.response.data.msg,
          status: 'error',
          duration: 5000,
          isClosable: true,
        })
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
              SIGN UP
            </Heading>
            <HStack spacing="1" justify="center">
              <Text color="muted">Don you have an account?</Text>
              <Button variant="link" colorScheme="blue">
                Sign in
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
                <FormControl isInvalid={errors.name}>
                  <FormLabel htmlFor="text">Name</FormLabel>
                  <Input
                    //   id="text"
                    type="text"
                    {...register("name", {
                      required: "This is required",
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

              <Stack spacing="6" mt={8}>
                <Button
                  id="submit"
                  colorScheme={"brand"}
                  _hover={{ bg: "pink.300" }}
                  type="submit"
                  isLoading={isLoading}
                >
                  {" "}
                  Sign up
                </Button>
              </Stack>
            </Stack>
          </Box>
        </form>
      </Stack>
    </Container>
  );
};

export default SignUpComponent;
