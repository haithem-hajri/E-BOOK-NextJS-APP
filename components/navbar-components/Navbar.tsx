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
} from "@chakra-ui/react";
import { AiOutlineMenu, AiOutlineSearch } from "react-icons/ai";
import { CgChevronDownO } from "react-icons/cg";
import Link from "next/link";
import { useRouter } from "next/router";
import { parseCookies } from "nookies";
import MobileNav from "./MobileNav";
const cookie = require("js-cookie");
import { useSession, signIn, signOut, getSession } from "next-auth/react";
import { useDispatch, useSelector } from "react-redux";
import { loadUser } from "../../redux/userAction";
const Choc = () => {
  const bg = useColorModeValue("white", "gray.800");
  const mobileNav = useDisclosure();
  const router = useRouter();
  const dispatch = useDispatch();
  const [tabIndex, setTabIndex] = React.useState(0);
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const cookies = parseCookies();
  const profile = useSelector((state: any) => state.profile);
  const [userState, setUserState] = React.useState<any>("");
  const { loading, error, dbUser } = profile;
  const { data: session } = useSession();
  const user = cookies?.user
    ? JSON.parse(cookies.user)
    : session?.user
    ? session?.user
    : "";
  React.useEffect(() => {
    session ? setUserState(session.user) : setUserState(user);
    console.log("dbUser:",dbUser)
    if (user) {
      //@ts-ignore
      dispatch(loadUser(user.email, user));
    }
  }, [router, setUserState]);
  React.useEffect(() => {
    if (user) {
      //  console.log("user",user)
      setIsLoggedIn(true);
    }
  }, [user]);
  React.useEffect(() => {
    if (router.pathname === "/") {
      setTabIndex(0);
    }
    if (router.pathname === "/about") {
      setTabIndex(1);
    }
    if (router.pathname === "/contact") {
      setTabIndex(2);
    }
  }, [router.pathname]);

  const handleTabsChange = (index: any) => {
    setTabIndex(index);
  };
  const logoutHandler = async () => {
    if (session) {
      signOut();
    }
    cookie.remove("token");
    cookie.remove("user");
    setIsLoggedIn(false);
    router.push("/signin");
    //  setUserState("")
  };
  return (
    <React.Fragment>
      <chakra.header
        bg={bg}
        w="full"
        px={{ base: 2, sm: 4 }}
        py={4}
        shadow="md"
      >
        <Flex alignItems="center" justifyContent="space-between" mx="auto">
          <Flex>
            <chakra.h1
              fontSize="xl"
              fontWeight="medium"
              ml="2"
              color={"pink.400"}
              as={"a"}
              cursor="pointer"
              href={"/"}
            >
              EBK
            </chakra.h1>
          </Flex>
          <HStack width={{ base: "auto", md: "90%", lg: "90%" }} spacing={1}>
            <Flex
              display={{ base: "none", md: "inline-flex" }}
              // alignItems="center"
              justifyContent="space-between"
              mx={1}
              borderWidth={0}
              // overflowX="auto"
              width={"100%"}
            >
              <Tabs
                index={tabIndex}
                onChange={handleTabsChange}
                borderBottomColor="transparent"
                alignItems={"center"}
                colorScheme={"brand"}
              >
                <TabList>
                  <Link href={"/"}>
                    <Tab
                      py={4}
                      m={0}
                      _hover={{ boxShadow: "none", color: "pink.400" }}
                      _focus={{ boxShadow: "none", color: "pink.400" }}
                    >
                      Books
                    </Tab>
                  </Link>
                  <Link href={"/about"} color="red.400">
                    <Tab
                      py={4}
                      m={0}
                      _hover={{ boxShadow: "none", color: "pink.400" }}
                      _focus={{ boxShadow: "none", color: "pink.400" }}
                    >
                      About US
                    </Tab>
                  </Link>
                  <Link href={"/contact"}>
                    <Tab
                      py={4}
                      m={0}
                      _hover={{ boxShadow: "none", color: "pink.400" }}
                      _focus={{ boxShadow: "none", color: "pink.400" }}
                    >
                      Contact US
                    </Tab>
                  </Link>
                </TabList>
              </Tabs>
              <Spacer />
              <HStack spacing={2} alignItems="center" mx="10">
                <InputGroup display={{ base: "none", lg: "block" }}>
                  <InputLeftElement pointerEvents="none">
                    <AiOutlineSearch />
                  </InputLeftElement>
                  <Input type="tel" placeholder="Search..." />
                </InputGroup>
              </HStack>

              {dbUser ? (
                <HStack
                  // flex={{ base: 1, md: 0 }}
                  justify={"flex-end"}
                  direction={"row"}
                  //  alignItems={"center"}
                >
                  <Box>
                    <Text
                      //  noOfLines={1}
                      fontSize={{ base: "16px", lg: "17px" }}
                    >
                      {" "}
                      {dbUser && dbUser.name}
                    </Text>
                  </Box>
                  {/***********Menu*********/}
                  <Menu>
                    <MenuButton
                      as={Button}
                      rounded={"full"}
                      variant={"link"}
                      cursor={"pointer"}
                      minW={0}
                    >
                      <CgChevronDownO
                        size={20}
                        color={"black"}
                        cursor="pointer"
                        fontWeight={"500"}
                      />
                    </MenuButton>
                    <MenuList>
                      <Link href={"/my-profile"}>
                        <MenuItem>My Profile</MenuItem>
                      </Link>
                      <Link href={"/my-books"}>
                        <MenuItem>My Books</MenuItem>
                      </Link>
                      <MenuDivider />
                      <MenuItem onClick={logoutHandler}>Disconnect</MenuItem>
                    </MenuList>
                  </Menu>
                </HStack>
              ) : (
                <HStack
                  flex={{ base: 1, md: 0 }}
                  justify={"flex-end"}
                  direction={"row"}
                  spacing={6}
                >
                  <Button
                    as={"a"}
                    fontSize={"sm"}
                    fontWeight={400}
                    variant={"link"}
                    href={"/signin"}
                    //   onClick={() => {
                    //    setIsLoggedIn(true);
                    //   }}
                  >
                    Sign In
                  </Button>
                  <Button
                    as={"a"}
                    display={{ base: "none", md: "inline-flex" }}
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
                </HStack>
              )}
            </Flex>

            <MobileNav
              mobileNav={mobileNav}
              bg={bg}
              isLoggedIn={isLoggedIn}
              logoutHandler={logoutHandler}
            />
          </HStack>
        </Flex>
      </chakra.header>
    </React.Fragment>
  );
};
export default Choc;
