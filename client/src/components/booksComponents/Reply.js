import React from "react";
import { Box, Icon, Flex, Image, IconButton, Text } from "@chakra-ui/react";
import { FaTrashCan } from "react-icons/fa6";
import { getTimeDifference } from "../../utils/timeUtils";

import { useMutation } from "@apollo/client";
import { REMOVE_REPLY } from "../../utils/mutations";

import AuthService from "../../utils/auth";
const Auth = new AuthService();

export default function Reply({
  replyId,
  replyAuthor,
  authorIcon,
  replyText,
  createdAt,
  commentId,
}) {
  const avatar = "./assets/images/moth1.png";

  const [removeReply] = useMutation(REMOVE_REPLY, {
    variables: { commentId: commentId, replyId: replyId },
  });

  return (
    <Box
      w="85%"
      mt={3}
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
            w={8}
            h={8}
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
            fontSize="sm"
            color="gray.600"
            _dark={{
              color: "gray.200",
            }}
          >
            {replyAuthor}
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
          {getTimeDifference(createdAt)}
        </Text>
      </Flex>
      <Text
        my={2}
        fontSize="sm"
        fontWeight={400}
        color="gray.600"
        _dark={{
          color: "gray.200",
        }}
      >
        {replyText}
      </Text>
      {Auth.loggedIn() && Auth.getProfile().data.username === replyAuthor && (
        <Flex justifyContent="end" mt={0}>
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
            onClick={() => removeReply()}
          />
        </Flex>
      )}
    </Box>
  );
}
