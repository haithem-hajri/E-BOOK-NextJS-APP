import React from "react";
import {
  chakra,
  Box,
  Flex,
  useColorModeValue,
  HStack,
  Button,
  useDisclosure,
  VStack,
  IconButton,
  CloseButton,
  InputGroup,
  InputLeftElement,
  Input,
  Tabs,
  TabList,
  Tab,
  Spacer,
  Text,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  // Link,
  color,
  Divider,
} from "@chakra-ui/react";
import { AiOutlineMenu, AiOutlineSearch } from "react-icons/ai";
import { CgChevronDownO } from "react-icons/cg";
import Link from "next/link";
import { useRouter } from "next/router";
const MobileNav = (props: any) => {
  const { mobileNav, bg, isLoggedIn, logoutHandler } = props;

  return (
    <Box display={{ base: "inline-flex", md: "none" }} w={"100%"}>
      <IconButton
        display={{ base: "flex", md: "none" }}
        aria-label="Open menu"
        fontSize="20px"
        color="pink.400"
        _dark={{ color: "inherit" }}
        variant="ghost"
        icon={<AiOutlineMenu />}
        onClick={mobileNav.onOpen}
      />

      <VStack
        pos="absolute"
        top={0}
        left={0}
        right={0}
        display={mobileNav.isOpen ? "flex" : "none"}
        flexDirection="column"
        p={2}
        pb={4}
        // m={2}
        bg={bg}
        spacing={3}
        rounded="sm"
        shadow="sm"
        zIndex={100}
        minH={"70vh"}
      >
        <CloseButton aria-label="Close menu" onClick={mobileNav.onClose} />
        <Link href={"/"}>
          <Button w="full" variant="ghost" color={"pink.400"}>
            Books
          </Button>
        </Link>
        <Link href={"/contact"}>
          <Button w="full" variant="ghost">
            Contact us
          </Button>
        </Link>
        <Link href={"/about"}>
          <Button w="full" variant="ghost">
            About US
          </Button>
        </Link>
        <Divider />
        {/****************user authentification**************/}
        {!isLoggedIn ? (
          <>
            <Button as={"a"} color="black" variant={"link"} href={"/signin"}>
              Sign In
            </Button>
            <Button
              as={"a"}
              fontSize={"sm"}
              fontWeight={600}
              color={"white"}
              bg={"pink.400"}
              _hover={{
                bg: "pink.300",
              }}
              href={"/signup"}
            >
              Sign Up
            </Button>
          </>
        ) : (
          <>
            <Link href={"/my-profile"}>
              <Button w="full" variant="ghost" color={"pink.400"}>
                My Profile
              </Button>
            </Link>
            <Link href={"/my-books"}>
              <Button w="full" variant="ghost">
                My Books
              </Button>
            </Link>
            <Button
              fontSize={"sm"}
              fontWeight={600}
              color={"white"}
              bg={"pink.400"}
              _hover={{
                bg: "pink.300",
              }}
              onClick={logoutHandler}
            >
              Disconnect
            </Button>
          </>
        )}
        <InputGroup>
          <InputLeftElement pointerEvents="none">
            <AiOutlineSearch />
          </InputLeftElement>
          <Input type="tel" placeholder="Search..." />
        </InputGroup>
      </VStack>
    </Box>
  );
};

export default MobileNav;
