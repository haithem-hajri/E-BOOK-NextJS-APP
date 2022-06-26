import React from "react";
import Layout from "../layouts/Layout";
import AboutUsComponent from "../components/about-us-components/AboutUsComponent";
import Head from "next/head";
const About = () => {
  return (
    <Layout>
      <Head>
        <title>E-BOOK about</title>
        <meta name="description" content="a simple movie app " />
        <link rel="icon" href="/letter.ico" />
      </Head>
      <AboutUsComponent />
    </Layout>
  );
};

export default About;
