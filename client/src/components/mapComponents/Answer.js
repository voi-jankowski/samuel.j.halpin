import React from "react";
import { Box, Icon, Flex, Image, IconButton, Text } from "@chakra-ui/react";
import { FaTrashCan } from "react-icons/fa6";
import { getTimeDifference } from "../../utils/timeUtils";

import { useMutation } from "@apollo/client";
import { REMOVE_ANSWER } from "../../utils/mutations";

import AuthService from "../../utils/auth";
const Auth = new AuthService();

export default function Answer({
  answerId,
  answerText,
  createdAt,
  questionId,
}) {
  const avatar = "./assets/images-converted/avatarSam.webp";

  const [removeAnswer] = useMutation(REMOVE_ANSWER, {
    variables: { questionId: questionId, answerId: answerId },
    update(cache, { data: { removeAnswer } }) {
      cache.evict({ id: cache.identify(removeAnswer) });
    },
  });

  const isAdmin = Auth.getProfile().data.username === "admin";

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
            color="brand.500"
            _dark={{
              color: "brand.400",
            }}
            alt="Answer avatar"
            src={avatar}
          />
          <Text
            ml={2}
            fontWeight={600}
            fontSize="sm"
            color="gray.200"
            _dark={{
              color: "gray.200",
            }}
          >
            Samuel J. Halpin
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
        fontSize="sm"
        fontWeight={400}
        color="gray.200"
        _dark={{
          color: "gray.200",
        }}
      >
        {answerText}
      </Text>
      {isAdmin && (
        <Flex justifyContent="end" mt={0}>
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
            onClick={() => removeAnswer()}
          />
        </Flex>
      )}
    </Box>
  );
}
