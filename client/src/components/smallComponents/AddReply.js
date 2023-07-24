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
import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_REPLY } from "../../utils/mutations";

import AuthService from "../../utils/auth";
const Auth = new AuthService();

export default function AddReply({ commentId }) {
  const [replyText, setReplyText] = useState(""); // State to manage the content of the textarea
  const [addReply, { error }] = useMutation(ADD_REPLY);

  const handleInputChange = (event) => {
    setReplyText(event.target.value);
  };

  const handleSaveReply = async (event) => {
    event.preventDefault();
    try {
      const { data } = await addReply({
        variables: {
          commentId,
          replyText,
        },
      });
      console.log("Reply added:", data.addReply);
      setReplyText("");
    } catch (err) {
      console.error(err);
    }
  };

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
        <Textarea
          value={replyText}
          onChange={handleInputChange}
          placeholder="@commentAuthor"
        />
      </FormControl>

      <Button
        bg={"red.400"}
        color={"white"}
        _hover={{
          bg: "red.500",
        }}
        onClick={handleSaveReply} // Call handleSaveReply when the "Save" button is clicked
      >
        Save
      </Button>
    </HStack>
  );
}
