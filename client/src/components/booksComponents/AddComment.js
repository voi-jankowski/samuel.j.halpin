import {
  Button,
  HStack,
  FormControl,
  Textarea,
  useColorModeValue,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useMutation, gql } from "@apollo/client";
import { ADD_COMMENT } from "../../utils/mutations";

export default function AddComment({ commentedBook }) {
  const [commentText, setCommentText] = useState(""); // State to manage the content of the textarea
  const [addError, setAddError] = useState(""); // Add the setAddError function to the state

  const [addComment, { error }] = useMutation(ADD_COMMENT, {
    variables: { commentedBook, commentText },
    // Add the update function to update the cache
    update(cache, { data: { addComment } }) {
      cache.modify({
        fields: {
          comments(existingComments = []) {
            const newCommentRef = cache.writeFragment({
              data: addComment,
              fragment: gql`
                fragment NewComment on Comment {
                  _id
                  commentText
                  createdAt
                  username
                  replies {
                    _id
                    replyText
                    createdAt
                    username
                  }
                }
              `,
            });
            return [...existingComments, newCommentRef];
          },
        },
      });
    },
  });

  const handleInputChange = (event) => {
    setCommentText(event.target.value);
  };

  const handleSaveComment = async (event) => {
    event.preventDefault();

    if (!commentText.trim()) {
      // Check if the comment text is empty or contains only whitespace
      // Set an error state to show the validation message
      setAddError("Comment text cannot be empty.");
      return;
    }

    try {
      const { data } = await addComment({
        variables: {
          commentedBook,
          commentText,
        },
      });
      console.log("Comment added:", data.addComment);
      setCommentText("");
      setAddError(""); // Clear the error state after successful submission
    } catch (err) {
      console.log("Error adding comment:", err.message);
      // Handle the error, show an error message, or take any necessary action
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
      <FormControl id="comment">
        {addError && (
          <p style={{ color: "red.600", marginBottom: "10px" }}>{addError}</p>
        )}
        <Textarea
          value={commentText}
          onChange={handleInputChange}
          placeholder="Share your thoughts on the book..."
        />
      </FormControl>

      <Button
        bg={"purple.500"}
        color={"white"}
        _hover={{
          bg: "red.500",
        }}
        onClick={handleSaveComment} // Call the handleSaveComment function when the button is clicked
      >
        Save
      </Button>
    </HStack>
  );
}
