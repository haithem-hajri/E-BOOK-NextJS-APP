import React from "react";
import {
  Badge,
  Box,
  Flex,
  Image,
  Link,
  Text,
  transform,
} from "@chakra-ui/react";
import { StarIcon } from "@chakra-ui/icons";

const BookCard = (props: Object | any) => {
  const { book } = props;
  if (!book) return <div> Looading ... !</div>;

  return (
    <Box
      className="card-book"
      bg="white"
      w="14rem"
      borderWidth="1px"
      rounded="lg"
      shadow="lg"
      h={["18rem", "18rem"]}
      m={["1rem", "1rem"]}
    >
      <Image
        src={book && "/api/image/" + book._id}
        //book.imageUrl&&book.imageUrl
        alt={book.title && book.title}
        roundedTop="lg"
        h={"9.5rem"}
        w={"100%"}
        objectFit="cover"
      />

      <Box p="6">
        <Box display="flex" alignItems="baseline">
          <Badge rounded="full" px="2" colorScheme="teal">
            {book.category}
          </Badge>
        </Box>
        <Link href={"/books/" + book._id}> 
          <Text
            mt="1"
            fontWeight="semibold"
            as="h4"
            lineHeight="tight"
            noOfLines={1}
            cursor="pointer"
          >
            {book.title}
          </Text>
        </Link>
        <Box>
          {book.formattedPrice}
          <Box as="span" color="gray.600" fontSize="sm">
            {book.language}
          </Box>
        </Box>

        <Box display="flex" mt="2" alignItems="center">
          {Array(5)
            .fill("")
            .map((_, i) => (
              <StarIcon
                key={i}
                color={i < book.rating ? "teal.500" : "gray.300"}
              />
            ))}
          <Box as="span" ml="2" color="gray.600" fontSize="sm">
            {book.reviewCount}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default BookCard;
