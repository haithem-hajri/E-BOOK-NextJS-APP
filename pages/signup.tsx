import React from "react";
import Layout from "../layouts/Layout";
import SignUpComponent from "../components/sign-up-components/SignUpComponent";
import { Box } from "@chakra-ui/react";
const signup = () => {
  return (
    <Layout>
      <Box>
        <SignUpComponent />
      </Box>
    </Layout>
  );
};

export default signup;
