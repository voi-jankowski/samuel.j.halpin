import React, { useState } from "react";
import { Box, IconButton, Flex, Image, Icon, Text } from "@chakra-ui/react";
import { FaReply, FaTrash } from "react-icons/fa";
import Answer from "./Answer";
import AddAnswer from "./AddAnswer";
import { getTimeDifference, selectionSort } from "../../utils/timeUtils";

import { useMutation } from "@apollo/client";
import { REMOVE_QUESTION } from "../../utils/mutations";

import AuthService from "../../utils/auth";
const Auth = new AuthService();

export default function Question({
  questionId,
  questionAuthor,
  authorIcon,
  questionText,
  createdAt,
  answers,
}) {
  const avatar =
    "https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=334&q=80";

  // State to display the AddReply component
  const [showAddAnswer, setShowAddAnswer] = useState(false);

  const [removeQuestion] = useMutation(REMOVE_QUESTION, {
    variables: { questionId: questionId },
    update(cache, { data: { removeQuestion } }) {
      cache.evict({ id: cache.identify(removeQuestion) });
    },
  });

  const sortedAnswers = selectionSort(answers, "createdAt");

  const loggedInUsername = Auth.loggedIn()
    ? Auth.getProfile().data.username
    : null;
  const isAdmin = loggedInUsername === "admin";

  return (
    <Flex mt={6} p={0} w="full" flexDir="column" alignItems="flex-end">
      <Box
        w="full"
        py={4}
        px={6}
        bg="purple.400"
        _dark={{
          bg: "purple.400",
        }}
        shadow="lg"
        rounded="lg"
      >
        <Flex justifyContent="space-between">
          <Flex alignItems={"center"} justifyContent="start">
            <Image
              w={10}
              h={10}
              fit="cover"
              rounded="full"
              borderStyle="solid"
              borderWidth={2}
              color="brand.500"
              _dark={{
                color: "brand.400",
              }}
              alt="Question avatar"
              src={authorIcon ?? avatar}
            />
            <Text
              ml={2}
              fontWeight={600}
              fontSize="medium"
              color="gray.200"
              _dark={{
                color: "gray.200",
              }}
            >
              {questionAuthor}
            </Text>
          </Flex>
          <Text
            fontWeight={600}
            fontSize="xs"
            color="gray.200"
            _dark={{
              color: "gray.200",
            }}
            mx={3}
          >
            {getTimeDifference(createdAt)}
          </Text>
        </Flex>
        <Text
          my={2}
          fontSize="md"
          fontWeight={400}
          color="gray.200"
          _dark={{
            color: "gray.200",
          }}
        >
          {questionText}
        </Text>

        <Flex justifyContent="end" mt={0}>
          {/* Render Trash button for the author and admin */}
          {(loggedInUsername === questionAuthor || isAdmin) && (
            <IconButton
              isRound={true}
              aria-label="delete"
              icon={<Icon as={FaTrash} />}
              variant="ghost"
              color="gray.200"
              _dark={{
                color: "gray.200",
              }}
              mr={2}
              size="md"
              onClick={removeQuestion}
            />
          )}
          {isAdmin && (
            <IconButton
              isRound={true}
              aria-label="answer"
              icon={<Icon as={FaReply} />}
              variant="ghost"
              color="gray.200"
              _dark={{
                color: "gray.200",
              }}
              mr={2}
              size="md"
              onClick={() => setShowAddAnswer(!showAddAnswer)}
            />
          )}
        </Flex>
      </Box>
      {/* Show the AddAnswer component if the user clicks the reply button */}
      {showAddAnswer && (
        <AddAnswer
          questionId={questionId}
          showAddAnswer={showAddAnswer}
          setShowAddAnswer={setShowAddAnswer}
        />
      )}
      {sortedAnswers.length > 0 &&
        sortedAnswers.map((answer) => (
          <Answer
            key={answer._id}
            answerId={answer._id}
            createdAt={answer.createdAt}
            answerText={answer.answerText}
            questionId={questionId}
          />
        ))}
    </Flex>
  );
}
