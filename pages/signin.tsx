import React from "react";
import Layout from "../layouts/Layout";
import SignInComponent from "../components/sign-in-components/SignInComponent";
import { Box } from "@chakra-ui/react";
const signin = () => {
  return (
    <Layout>
      <Box>
        <SignInComponent />
      </Box>
    </Layout>
  );
};

export default signin;
