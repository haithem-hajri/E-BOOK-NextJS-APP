import React from "react";
import ContactUsComponents from "../components/contact-us-components/ContactUsComponents";
import Layout from "../layouts/Layout";
import Head from "next/head";
const contact = () => {
  return (
    <Layout>
      <Head>
        <title>E-BOOK Contact</title>
        <meta name="description" content="a simple movie app " />
        <link rel="icon" href="/letter.ico" />
      </Head>
      <ContactUsComponents />
    </Layout>
  );
};

export default contact;
