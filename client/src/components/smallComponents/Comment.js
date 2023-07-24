import React, { useState } from "react";
import { Box, IconButton, Flex, Image, Icon, Text } from "@chakra-ui/react";
import { FaReply, FaTrashCan } from "react-icons/fa6";
import Reply from "./Reply";
import AddReply from "./AddReply";

export default function Comment({
  commentAuthor,
  authorIcon,
  commentText,
  createdAt,
  replies,
}) {
  const avatar =
    "https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=334&q=80";

  // Add state to track whether AddReply should be displayed or not
  const [showAddReply, setShowAddReply] = useState(false);

  //   Function to toggle the display of AddReply
  const toggleAddReply = () => {
    setShowAddReply(!showAddReply);
  };

  return (
    <Flex mt={6} p={0} w="full" flexDir="column" alignItems="flex-end">
      <Box
        w="full"
        py={4}
        px={6}
        bg="red.400"
        _dark={{
          bg: "red.400",
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
              color="gray.600"
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
            color="gray.600"
            _dark={{
              color: "gray.200",
            }}
            mx={3}
          >
            {/* {getTimeDifference(createdAt)} */}6 weeks ago
          </Text>
        </Flex>
        <Text
          my={2}
          fontSize="md"
          fontWeight={400}
          color="gray.600"
          _dark={{
            color: "gray.200",
          }}
        >
          {commentText}
        </Text>

        <Flex justifyContent="end" mt={4}>
          <IconButton
            isRound={true}
            aria-label="reply"
            icon={<Icon as={FaTrashCan} />}
            variant="ghost"
            color="gray.600"
            _dark={{
              color: "gray.200",
            }}
            mr={2}
            size="md"
          />
          <IconButton
            isRound={true}
            aria-label="reply"
            icon={<Icon as={FaReply} />}
            variant="ghost"
            color="gray.600"
            _dark={{
              color: "gray.200",
            }}
            mr={2}
            size="md"
            onClick={toggleAddReply}
          />
        </Flex>
      </Box>
      {/* Show AddReply only when showAddReply is true */}
      {showAddReply && <AddReply />}
      {replies.length > 0 &&
        replies.map((reply) => (
          <Reply
            key={reply._id}
            replyAuthor={reply.replyAuthor}
            authorIcon={reply.authorIcon}
            replyText={reply.replyText}
            createdAt={reply.createdAt}
          />
        ))}
    </Flex>
  );
}
