import React from "react";
import {
  Box,
  Stack,
  Flex,
  Spacer,
  HStack,
  StackDivider,
} from "@chakra-ui/react";
import FilterBar from "../filter-components/FilterBar";
import axios from "axios";
import BookCard from "../cards/BookCard";
// movies list  filter bar with chakra ui
const Books = (props: any) => {
  const { books } = props;
  const [language, setLanguage] = React.useState<any | Array<string>>([]);
  const [category, setCategory] = React.useState<any | Array<string>>([]);
  const [booksData, setBooksData] = React.useState(books);
  React.useEffect(() => {
    if (language) {
      axios
        .get(`/api/book?language=${language}&category=${category}`)
        .then((res) => {
          setBooksData(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [language, category]);
  return (
    <HStack
      display={"flex"}
      alignItems={"flex-start"}
      justify="center"
      w={"90%"}
      m="auto"
      divider={
        <StackDivider borderColor="gray.200" display={["none", "flex"]} />
      }
    >
      <Box display={["none", "flex"]}>
        <FilterBar
          setLanguage={setLanguage}
          language={language}
          category={category}
          setCategory={setCategory}
        />
      </Box>
      <Flex
        w={["75%", "99%", "99%"]}
        m="auto"
        direction="row"
        alignItems={"center"}
        justifyContent={["center", "flex-start"]}
        wrap={["wrap", "wrap"]}
        // align="center"
      >
        {booksData.map((book: any) => {
          return <BookCard book={book} key={book._id} />;
        })}
      </Flex>
    </HStack>
  );
};

export default Books; 

