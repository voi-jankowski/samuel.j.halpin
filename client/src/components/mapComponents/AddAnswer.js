import {
  Button,
  FormControl,
  HStack,
  Textarea,
  useColorModeValue,
} from "@chakra-ui/react";
import React, { useState } from "react";

import { useMutation } from "@apollo/client";
import { ADD_ANSWER } from "../../utils/mutations";

import AuthService from "../../utils/auth";
const Auth = new AuthService();

export default function AddAnswer({
  questionId,
  showAddAnswer,
  setShowAddAnswer,
}) {
  const [answerText, setAnswerText] = useState(""); // State to manage the content of the textarea
  const [addError, setAddError] = useState(""); // Add the setAddError function to the state

  const [addAnswer, { error }] = useMutation(ADD_ANSWER);

  const handleInputChange = (event) => {
    setAnswerText(event.target.value);
  };

  const handleSaveAnswer = async (event) => {
    event.preventDefault();

    if (!answerText.trim()) {
      // Check if the comment text is empty or contains only whitespace
      // Set an error state to show the validation message
      setAddError("Answer text cannot be empty.");
      return;
    }

    try {
      const { data } = await addAnswer({
        variables: { questionId, answerText },
      });
      console.log("Answer added:", data.addAnswer);
      setAnswerText("");
      setAddError("");
      setShowAddAnswer(!showAddAnswer);
    } catch (err) {
      console.log("Error adding answer:", err.message);
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
      <FormControl id="answer">
        {addError && (
          <p style={{ color: "red.600", marginBottom: "10px" }}>{addError}</p>
        )}
        <Textarea
          value={answerText}
          onChange={handleInputChange}
          placeholder="Respond here..."
        />
      </FormControl>

      <Button
        bg={"purple.500"}
        color={"white"}
        _hover={{
          bg: "red.500",
        }}
        onClick={handleSaveAnswer}
      >
        Save
      </Button>
    </HStack>
  );
}
