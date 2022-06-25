import React from "react";
import { Box, useColorModeValue, Image, Heading } from "@chakra-ui/react";
const AboutUsComponent = () => {
  const bg = useColorModeValue("gray.100", "gray.900");
  return (
    <Box bgColor={bg} position={"relative"} w="full">
      <Box
        width={"20%"}
        height={"full"}
        bg={"pink.100"}
        opacity={"0.6"}
        position={"absolute"}
        display={{ base: "none", md: "flex" }}
      />
      <Box
        display={"flex"}
        flexDirection={{ base: "column", md: "row" }}
        justifyContent={"space-around"}
        alignItems={{ base: "center", md: "flex-start" }}
        pb={10}
      >
        <Box
          position="relative"
          width={{ base: "full", md: "40%" }}
          pt={{ base: "0", md: "10" }}
          // display={{ base: "none", md: "flex" }}
        >
          <Image
            src="https://images.unsplash.com/photo-1607004468138-e7e23ea26947?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=435&q=80"
            alt="ok"
            w={"full"}
            h={{ base: "50%", md: "full" }}
          />
        </Box>

        <Box
          pt={{ base: "10", md: "10rem" }}
          ml={{ base: "0", md: "5" }}
          maxW="32rem"
          display={"flex"}
          flexDirection="column"
          justifyContent={"center"}
          // alignItems="center"
        >
          <Heading as="h1" size="4xl" noOfLines={1} color={"pink.500"} mb={15}>
            ABOUT US
          </Heading>
          <Heading as="h2" size="md" noOfLines={1} mb="5">
            We are a team of developers who love to create beautiful things.
          </Heading>

          <Heading as="h5" size="xs">
            We are a team of developers who love to create beautiful things. We
            are a team of developers who love to create beautiful things. We are
            a team of developers who love to create beautiful things. We are a
            team of developers who love to create beautiful things.
          </Heading>
        </Box>
      </Box>
    </Box>
  );
};

export default AboutUsComponent;
