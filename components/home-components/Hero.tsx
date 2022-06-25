import {
  Flex,
  Container,
  Heading,
  Stack,
  Text,
  Button,
  Icon,
  Link,
} from "@chakra-ui/react";

export default function Hero() {
  return (
    <Container maxW={"5xl"}>
      <Stack
        textAlign={"center"}
        align={"center"}
        spacing={{ base: 8, md: 10 }}
        py={{ base: 20, md: 28 }}
      >
        <Heading
          fontWeight={600}
          fontSize={{ base: "3xl", sm: "4xl", md: "6xl" }}
          lineHeight={"110%"}
        >
          Meeting scheduling{" "}
          <Text as={"span"} color={"pink.400"}>
            made easy
          </Text>
        </Heading>
        <Text color={"gray.500"} maxW={"3xl"}>
          Never miss a meeting. Never be late for one too. Keep track of your
          meetings and receive smart reminders in appropriate times. Read your
          smart “Daily Agenda” every morning.
        </Text>
        <Stack spacing={6} direction={"row"}>
          <Button
            as="a"
            rounded={"full"}
            href={"/add-book"}
            px={6}
            colorScheme={"orange"}
            bg={"pink.400"}
            _hover={{ bg: "pink.500" }}
          >
            Add Book
          </Button>

          <Button rounded={"full"} px={6} bg={"white"} textColor={"pink.400"}>
            Learn more
          </Button>
        </Stack>
        {/* <Flex w={'full'}>
          <Illustration
            height={{ sm: '24rem', lg: '28rem' }}
            mt={{ base: 12, sm: 16 }}
          />
  </Flex>*/}
      </Stack>
    </Container>
  );
}
