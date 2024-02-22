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
  const avatar = "/assets/images-converted/moth7.webp";

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
    <Flex
      mt={6}
      p={0}
      w="full"
      flexDir="column"
      alignItems="flex-end"
      color="white"
      _dark={{
        color: "white",
      }}
    >
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
              alt="Comment avatar"
              src={authorIcon ?? avatar}
            />
            <Text
              ml={2}
              fontWeight={600}
              fontSize="medium"
              color="white"
              _dark={{
                color: "white",
              }}
            >
              {commentAuthor}
            </Text>
          </Flex>
          <Text fontWeight={600} fontSize="xs" mx={3}>
            {getTimeDifference(createdAt)}
          </Text>
        </Flex>
        <Text my={2} fontSize="md" fontWeight={400}>
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
              mr={2}
              size="md"
              color={"white"}
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
              mr={2}
              size="md"
              color={"white"}
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
