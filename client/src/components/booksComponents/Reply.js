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
  const avatar = "/assets/images-converted/moth1.webp";

  const [removeReply] = useMutation(REMOVE_REPLY, {
    variables: { commentId: commentId, replyId: replyId },
  });

  return (
    <Box
      w="85%"
      mt={3}
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
            w={8}
            h={8}
            fit="cover"
            rounded="full"
            borderStyle="solid"
            borderWidth={2}
            alt="Comment avatar"
            src={authorIcon ?? avatar}
          />
          <Text ml={2} fontWeight={600} fontSize="sm">
            {replyAuthor}
          </Text>
        </Flex>
        <Text fontWeight={600} fontSize="xs" mx={3}>
          {getTimeDifference(createdAt)}
        </Text>
      </Flex>
      <Text my={2} fontSize="sm" fontWeight={400}>
        {replyText}
      </Text>
      {Auth.loggedIn() && Auth.getProfile().data.username === replyAuthor && (
        <Flex justifyContent="end" mt={0}>
          <IconButton
            isRound={true}
            aria-label="reply"
            icon={<Icon as={FaTrashCan} />}
            variant="ghost"
            color={"white"}
            mr={2}
            size="md"
            onClick={() => removeReply()}
          />
        </Flex>
      )}
    </Box>
  );
}
