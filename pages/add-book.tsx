import React from "react";
import AddBookComponents from "../components/add-book/AddBookComponents";
import { Box, Stack } from "@chakra-ui/react";
import Layout from "../layouts/Layout";
const AddBook = () => {
  return (
    <Layout>
      <AddBookComponents />
    </Layout>
  );
};

export default AddBook;
