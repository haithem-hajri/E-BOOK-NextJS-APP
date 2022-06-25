import React from "react";
import {
  Container,
  Box,
  Stack,
  Heading,
  Text,
  Button,
  Icon,
  Link,
  useBreakpointValue,
  useColorModeValue,
  Divider,
  HStack,
  Checkbox,
  CheckboxGroup,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  NumberInputField,
  NumberInputStepper,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  Textarea,
  RadioGroup,
  Radio,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { useForm, Controller } from "react-hook-form";
import AddFiles from "./AddFiles";
import Router, { useRouter } from "next/router";

const AddBookComponents = () => {
  const toast = useToast();
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors, isSubmitted },
  } = useForm();
  const [isLoading, setIsLoading] = React.useState(false);
  const [images, setImages] = React.useState<any>();
  const [bookFile, setBookFile] = React.useState<any>();
  const [imageError, setImageError] = React.useState<boolean>(false);
  const [bookFileError, setBookFileError] = React.useState<boolean>(false);
  const router = useRouter();

  const onSubmit = (data: any) => {
    setIsLoading(true);
    if (!images) {
      setImageError(true);
      setIsLoading(false);
    } else if (!bookFile) {
      setBookFileError(true);
      setIsLoading(false);
    } else {
      setImageError(false);
      setIsLoading(true);
      //create form data
      const formData: any = new FormData();
      formData.append("image", images[0].file);
      formData.append("title", data.title);
      formData.append("author", data.author);
      formData.append("category", data.category);
      formData.append("description", data.description);
      formData.append("language", data.language);
      formData.append("book_file", bookFile);
      formData.append("rating", data.rating);

      axios
        .post("http://localhost:3000/api/book", formData)
        .then((res) => {
          setIsLoading(false);
          toast({
            title: "book created.",
            description: "We've created your account for you.",
            status: "success",
            duration: 5000,
            isClosable: true,
          });
          router.push("/");
        })
        .catch((err) => {
          console.log("err:", err);
          setIsLoading(false);
        });
    }
  };

  return (
    <Box
      //   maxW="lg"
      py={{ base: "12", md: "24" }}
      px={{ base: "0", sm: "8" }}
      w="100%"
    >
      <Stack spacing="8">
        <Stack spacing="6">
          <Stack spacing={{ base: "2", md: "3" }} textAlign="center">
            <Heading size={useBreakpointValue({ base: "xs", md: "sm" })}>
              Add your Book
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
            w={"80%"}
            m={"auto"}
          >
            <Stack spacing={[1, 5]} direction={["column", "row"]}>
              <Stack spacing="6" direction="column" w={["100%", "50%"]}>
                <AddFiles
                  imageError={imageError}
                  images={images}
                  setImages={setImages}
                  setBookFile={setBookFile}
                  bookFile={bookFile}
                  bookFileError={bookFileError}
                  setImageError={setImageError}
                  setBookFileError={setBookFileError}
                />
              </Stack>
              <Divider orientation="vertical" />
              {/***************************Information*****************************/}
              <Stack spacing="5" w={["100%", "50%"]}>
                <FormControl isInvalid={errors.title}>
                  <FormLabel htmlFor="title">title</FormLabel>
                  <Input
                    type="text"
                    {...register("title", {
                      required: "This is required",
                      minLength: {
                        value: 4,
                        message: "Minimum length should be 4",
                      },
                    })}
                  />
                  <FormErrorMessage>
                    {errors.title && errors.title.message}
                  </FormErrorMessage>
                </FormControl>

                <FormControl isInvalid={errors.author}>
                  <FormLabel>author</FormLabel>
                  <Input
                    type="text"
                    {...register("author", {
                      required: "This is required",
                      minLength: {
                        value: 4,
                        message: "Minimum length should be 4",
                      },
                    })}
                  />
                  <FormErrorMessage>
                    {errors.author && errors.author.message}
                  </FormErrorMessage>
                </FormControl>

                <FormControl isInvalid={errors.category}>
                  <FormLabel htmlFor="title">Category</FormLabel>
                  <Controller
                    name="category"
                    control={control}
                    render={({ field: { ref, ...rest } }) => (
                      <CheckboxGroup {...rest} colorScheme="green">
                        <Stack spacing={[1, 5]} direction={"column"} p={4}>
                          <Checkbox value="romance">Romance</Checkbox>
                          <Checkbox value="action">Action</Checkbox>
                          <Checkbox value="mystery">Mystery</Checkbox>
                          <Checkbox value="science_fiction">
                            Science fiction{" "}
                          </Checkbox>
                          <Checkbox value="horror">Horror</Checkbox>
                          <Checkbox value="children">{"Children's"}</Checkbox>
                        </Stack>
                      </CheckboxGroup>
                    )}
                    rules={{
                      required: {
                        value: true,
                        message: "Please select at least one",
                      },
                    }}
                  />
                  <FormErrorMessage>
                    {errors.category?.message}
                  </FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={errors.description}>
                  <FormLabel htmlFor="description">description</FormLabel>
                  <Textarea
                    {...register("description", {
                      required: "This is required",
                      minLength: {
                        value: 4,
                        message: "Minimum length should be 4",
                      },
                    })}
                  />
                  <FormErrorMessage>
                    {errors.description && errors.description.message}
                  </FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={errors.language}>
                  <FormLabel htmlFor="language">language</FormLabel>
                  <Controller
                    name="language"
                    control={control}
                    render={({ field: { ref, ...rest } }) => (
                      <RadioGroup {...rest}>
                        <Stack direction="row">
                          <Radio value="arabic">Arabic</Radio>
                          <Radio value="frensh">Frensh</Radio>
                          <Radio value="english">English</Radio>
                        </Stack>
                      </RadioGroup>
                    )}
                    rules={{
                      required: {
                        value: true,
                        message: "Please select at least one",
                      },
                    }}
                  />

                  <FormErrorMessage>
                    {errors.language && errors.language.message}
                  </FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={errors.rating}>
                  <FormLabel htmlFor="rating">rating</FormLabel>
                  <Controller
                    name="rating"
                    control={control}
                    render={({ field: { ref, ...rest } }) => (
                      <NumberInput defaultValue={1} min={1} max={5} {...rest}>
                        <NumberInputField />
                        <NumberInputStepper>
                          <NumberIncrementStepper />
                          <NumberDecrementStepper />
                        </NumberInputStepper>
                      </NumberInput>
                    )}
                    rules={{
                      required: {
                        value: true,
                        message: "Please select at least one",
                      },
                    }}
                  />

                  <FormErrorMessage>
                    {errors.rating && errors.rating.message}
                  </FormErrorMessage>
                </FormControl>
              </Stack>
            </Stack>
            {/****************Submit Book**************/}
            <Stack spacing="6" align="center">
              <Button
                colorScheme={"brand"}
                type="submit"
                id="submit"
                isLoading={isLoading}
                _hover={{ bg: "pink.300" }}
                w={"50%"}
                mt={{ base: "4", sm: "6" }}
              >
                Submit
              </Button>
              <HStack>
                <Divider />
              </HStack>
            </Stack>
          </Box>
        </form>
      </Stack>
    </Box>
  );
};

export default AddBookComponents;
