import React from "react";
import BookDetailsComponent from "../../components/book-details-component/BookDetailsComponent";
import Layout from "../../layouts/Layout";
import { useRouter } from 'next/router';
import axios from "axios";
const BookDetails = ({book}:any) => {
  const router = useRouter()
  const { pid } = router.query
  return (
    <Layout>
      <BookDetailsComponent book={book}/>
    </Layout>
  );
};
export const getServerSideProps = async (context:any) => {
  const { id } = context.query;
 
  const res = await axios.get(process.env.URL+"/api/book/"+id, {
    headers: {
      Accept: "application/json",
      "User-Agent": "*",
    },
  });
  return {
    props: {
      book: res.data,
    },
  };
};
export default BookDetails;
