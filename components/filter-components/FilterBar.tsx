import React from "react";
import {
  StackDivider,
  Box,
  VStack,
  CheckboxGroup,
  Checkbox,
  Stack,
  Heading,
  Text,
} from "@chakra-ui/react";
const FilterBar = (props: any) => {
  const { language, setLanguage, category, setCategory } = props;
  //return filter bar with chakra ui with selecting category of movies
  const handleLanguageChange = (e: any) => {
    //add or remove the value from the categories array
    if (e.target.checked) {
      setLanguage([...language, e.target.value]);
    } else {
      setLanguage(
        language.filter((language: string) => language !== e.target.value)
      );
    }
  };
  const handleCategoryChange = (e: any) => {
    //add or remove the value from the categories array
    if (e.target.checked) {
      setCategory([...category, e.target.value]);
    } else {
      setCategory(
        category.filter((category: string) => category !== e.target.value)
      );
    }
  };
  return (
    <Stack
      spacing={5}
      divider={<StackDivider borderColor="gray.200" />}
      align={"strech"}
      p={5}
    >
      <Text fontWeight={"500"} fontSize={"lg"} color="gray.700">
        Category
      </Text>
      <CheckboxGroup
        size={"md"}
        colorScheme="pink"
        defaultValue={["Actions", "Drame"]}
      >
        <Stack spacing={[1, 3]} direction={["column", "column"]} px={18}>
          <Checkbox
            onChange={(e: any) => handleCategoryChange(e)}
            value="romance"
          >
            Romance
          </Checkbox>
          <Checkbox
            onChange={(e: any) => handleCategoryChange(e)}
            value="action"
          >
            Action
          </Checkbox>
          <Checkbox
            onChange={(e: any) => handleCategoryChange(e)}
            value="mystery"
          >
            Mystery
          </Checkbox>
          <Checkbox
            onChange={(e: any) => handleCategoryChange(e)}
            value="science_fiction"
          >
            Science fiction{" "}
          </Checkbox>
          <Checkbox
            onChange={(e: any) => handleCategoryChange(e)}
            value="horror"
          >
            Horror
          </Checkbox>
          <Checkbox
            onChange={(e: any) => handleCategoryChange(e)}
            value="children"
          >
            {"Children's"}
          </Checkbox>
        </Stack>
      </CheckboxGroup>

      <Text fontWeight={"500"} fontSize={"lg"} color="gray.700">
        Language
      </Text>
      <CheckboxGroup
        size={"md"}
        colorScheme="pink"
        // defaultValue={["English", "Arabic"]}
      >
        <Stack spacing={[1, 3]} direction={["column", "column"]} px={18}>
          <Checkbox
            onChange={(e: any) => handleLanguageChange(e)}
            value="arabic"
          >
            Arabic
          </Checkbox>
          <Checkbox
            onChange={(e: any) => handleLanguageChange(e)}
            value="english"
          >
            English
          </Checkbox>
          <Checkbox
            onChange={(e: any) => handleLanguageChange(e)}
            value="frensh"
          >
            Frensh
          </Checkbox>
        </Stack>
      </CheckboxGroup>
    </Stack>
  );
};

export default FilterBar;
