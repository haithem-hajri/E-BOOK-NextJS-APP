import React from "react";
import BookCard from "../cards/BookCard";
import { Stack, Box, Flex } from "@chakra-ui/react";
import axios from "axios";
import NoBooks from "../no-books-components/NoBooks";
const MyBookComponents = () => {
  const [Books, setMyBooks] = React.useState<any>(null);
  const [isLoading, setIsLoading] = React.useState(false);
  React.useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const res = await axios.get("/api/my-books");
      setMyBooks(res.data);
      setIsLoading(false);
    };
    fetchData();
  }, []);

  return (
    <>
      {Books && Books.length < 1 ? (
        <NoBooks />
      ) : (
        <Flex
          w={["75%", "100%"]}
          m="auto"
          p={[1, 5]}
          direction="row"
          justifyContent="flex-start"
          wrap={["wrap", "wrap"]}
          // align="center"
        >
          {Books &&
            Books.map((book: any) => {
              return <BookCard book={book} key={book._id} />;
            })}
        </Flex>
      )}
    </>
  );
};

export default MyBookComponents;
