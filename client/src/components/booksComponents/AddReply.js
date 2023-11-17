import {
  Button,
  FormControl,
  HStack,
  Textarea,
  useColorModeValue,
} from "@chakra-ui/react";
import React, { useState } from "react";

import { useMutation } from "@apollo/client";
import { ADD_REPLY } from "../../utils/mutations";

import AuthService from "../../utils/auth";
const Auth = new AuthService();

export default function AddReply({ commentId, showAddReply, setshowAddReply }) {
  const [replyText, setReplyText] = useState(""); // State to manage the content of the textarea
  const [addError, setAddError] = useState(""); // Add the setAddError function to the state
  const [addReply, { error }] = useMutation(ADD_REPLY);

  const handleInputChange = (event) => {
    setReplyText(event.target.value);
  };

  const handleSaveReply = async (event) => {
    event.preventDefault();

    if (!replyText.trim()) {
      // Check if the reply text is empty or contains only whitespace
      // Set an error state to show the validation message
      setAddError("Reply text cannot be empty.");
      return;
    }

    try {
      const { data } = await addReply({
        variables: {
          commentId,
          replyText,
        },
      });
      console.log("Reply added:", data.addReply);
      setReplyText(""); // Clear the textarea
      setAddError(""); // Clear the error state after successful submission
      setshowAddReply(!showAddReply); // Hide the AddReply component
    } catch (err) {
      console.log("Error adding reply:", err.message);
      // Handle the error, show an error message, or take any necessary action
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
      borderColor="purple.500"
    >
      <FormControl id="reply">
        {addError && (
          <p style={{ color: "red.600", marginBottom: "10px" }}>{addError}</p>
        )}
        <Textarea
          value={replyText}
          onChange={handleInputChange}
          placeholder="@commentAuthor"
          focusBorderColor="purple.400"
        />
      </FormControl>

      <Button
        bg={"purple.400"}
        color={"white"}
        _hover={{
          bg: "purple.900",
        }}
        onClick={handleSaveReply} // Call handleSaveReply when the "Save" button is clicked
      >
        Save
      </Button>
    </HStack>
  );
}
