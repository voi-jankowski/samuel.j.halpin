import {
  Button,
  Box,
  FormControl,
  Flex,
  Heading,
  HStack,
  Input,
  Stack,
  Text,
  Textarea,
  useColorModeValue,
} from "@chakra-ui/react";
import React from "react";

const testimonials = [
  {
    name: "Brandon P.",
    content: "This is a reply!",
    avatar:
      "https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=334&q=80",
  },
];

export default function AddReply() {
  const { name, content, avatar } = testimonials[0];
  return (
    <HStack
      spacing={4}
      alignItems="flex-end"
      w="85%"
      bg={useColorModeValue("white", "gray.700")}
      rounded={"lg"}
      boxShadow={"lg"}
      mt={3}
      p={4}
      borderWidth="1px"
      borderColor="red.400"
    >
      <FormControl id="comment">
        <Textarea placeholder="@commentAuthor" />
      </FormControl>

      <Button
        bg={"red.400"}
        color={"white"}
        _hover={{
          bg: "red.500",
        }}
      >
        Save
      </Button>
    </HStack>
  );
}
