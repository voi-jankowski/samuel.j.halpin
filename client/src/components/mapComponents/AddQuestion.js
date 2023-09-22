import {
  Button,
  HStack,
  FormControl,
  Textarea,
  useColorModeValue,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useMutation, gql } from "@apollo/client";
import { ADD_QUESTION } from "../../utils/mutations";

export default function AddQuestion() {
  const [questionText, setQuestionText] = useState(""); // State to manage the content of the textarea
  const [addError, setAddError] = useState(""); // Add the setAddError function to the state

  const [addQuestion, { error }] = useMutation(ADD_QUESTION, {
    variables: { questionText },
    // Add the update function to update the cache
    update(cache, { data: { addQuestion } }) {
      cache.modify({
        fields: {
          questions(existingQuestions = []) {
            const newQuestionRef = cache.writeFragment({
              data: addQuestion,
              fragment: gql`
                fragment NewQuestion on Question {
                  _id
                  questionText
                  questionAuthor
                  createdAt
                  answers {
                    _id
                    answerText
                    answerAuthor
                    createdAt
                  }
                }
              `,
            });
            return [...existingQuestions, newQuestionRef];
          },
        },
      });
    },
  });

  const handleInputChange = (event) => {
    setQuestionText(event.target.value);
  };

  const handleSaveQuestion = async (event) => {
    event.preventDefault();

    if (!questionText.trim()) {
      // Check if the comment text is empty or contains only whitespace
      // Set an error state to show the validation message
      setAddError("Question text cannot be empty.");
      return;
    }

    try {
      const { data } = await addQuestion({
        variables: { questionText },
      });
      console.log("Question added: ", data);
      setQuestionText("");
      setAddError("");
    } catch (err) {
      console.log("Error adding question: ", err.message);
      //    Handle the error, for example by showing a validation error message
    }
  };

  return (
    <HStack
      spacing={4}
      alignItems="flex-end"
      w="full"
      bg={useColorModeValue("white", "gray.700")}
      rounded={"lg"}
      boxShadow={"lg"}
      mt={6}
      p={4}
      borderWidth="1px"
      borderColor="purple.500"
    >
      <FormControl id="question">
        {addError && (
          <p style={{ color: "red.600", marginBottom: "10px" }}>{addError}</p>
        )}
        <Textarea
          value={questionText}
          onChange={handleInputChange}
          placeholder="Ask me any question..."
        />
      </FormControl>

      <Button
        bg={"purple.400"}
        color={"white"}
        _hover={{
          bg: "purple.700",
        }}
        onClick={handleSaveQuestion} // Call the handleSaveQuestion function when the button is clicked
      >
        Save
      </Button>
    </HStack>
  );
}
