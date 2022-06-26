import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Layout from "../layouts/Layout";
import { useSession, signIn, signOut, getSession } from "next-auth/react";
import { parseCookies } from "nookies";
import Hero from "../components/home-components/Hero";
import { Box } from "@chakra-ui/react";
import axios from "axios";
import React from "react";
import Books from "../components/home-components/Books";
const Home: NextPage = ({ books }: any, props) => {
  const { data: session, status } = useSession();
  const cookies = parseCookies();

  const user = cookies?.user
    ? JSON.parse(cookies.user)
    : session?.user
    ? session?.user
    : "";

  return (
    <div>
      <Head>
        <title>Movies App</title>
        <meta name="description" content="a simple movie app " />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <Box bg="#edf3f8">
          <Hero />
        </Box>
        <Books books={books} />
      </Layout>
    </div>
  );
};

export const getServerSideProps = async () => {
  const res = await axios.get(process.env.URL + "/api/book", {
    headers: {
      Accept: "application/json",
      "User-Agent": "*",
    },
  });
  return {
    props: {
      books: res.data,
    },
  };
};
export default Home; 
