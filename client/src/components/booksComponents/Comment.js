import React, { useState } from "react";
import { Box, IconButton, Flex, Image, Icon, Text } from "@chakra-ui/react";
import { FaReply, FaTrashCan } from "react-icons/fa6";
import Reply from "./Reply";
import AddReply from "./AddReply";
import { getTimeDifference, selectionSort } from "../../utils/timeUtils";

import { useMutation } from "@apollo/client";
import { REMOVE_COMMENT } from "../../utils/mutations";

import AuthService from "../../utils/auth";
const Auth = new AuthService();

export default function Comment({
  commentId,
  commentAuthor,
  authorIcon,
  commentText,
  createdAt,
  replies,
}) {
  const avatar =
    "https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=334&q=80";

  // State to display the AddReply component
  const [showAddReply, setshowAddReply] = useState(false);

  const [removeComment] = useMutation(REMOVE_COMMENT, {
    variables: { commentId: commentId },
    update(cache, { data: { removeComment } }) {
      cache.evict({ id: cache.identify(removeComment) });
    },
  });

  const sortedReplies = selectionSort(replies, "createdAt");

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
        bg="purple.500"
        _dark={{
          bg: "purple.500",
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
              alt="Comment avatar"
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
              {commentAuthor}
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
          {commentText}
        </Text>

        <Flex justifyContent="end" mt={0}>
          {/* Render Trash button for the author and admin */}
          {(loggedInUsername === commentAuthor || isAdmin) && (
            <IconButton
              isRound={true}
              aria-label="reply"
              icon={<Icon as={FaTrashCan} />}
              variant="ghost"
              color="gray.200"
              _dark={{
                color: "gray.200",
              }}
              mr={2}
              size="md"
              onClick={removeComment}
            />
          )}
          {/* Render Reply button only when logged in */}
          {Auth.loggedIn() && (
            <IconButton
              isRound={true}
              aria-label="reply"
              icon={<Icon as={FaReply} />}
              variant="ghost"
              color="gray.200"
              _dark={{
                color: "gray.200",
              }}
              mr={2}
              size="md"
              onClick={() => setshowAddReply(!showAddReply)}
            />
          )}
        </Flex>
      </Box>
      {/* Show AddReply only when showExtraContent is true */}
      {showAddReply && (
        <AddReply
          commentId={commentId}
          showAddReply={showAddReply}
          setshowAddReply={setshowAddReply}
        />
      )}
      {sortedReplies.length > 0 &&
        sortedReplies.map((reply) => (
          <Reply
            key={reply._id}
            replyId={reply._id}
            replyAuthor={reply.replyAuthor}
            authorIcon={reply.authorIcon}
            replyText={reply.replyText}
            createdAt={reply.createdAt}
            commentId={commentId}
          />
        ))}
    </Flex>
  );
}
