import React from "react";
import { useQuery } from "@apollo/client";
import {
  Container,
  Stack,
  Flex,
  Box,
  Heading,
  Text,
  Button,
  Image,
  Icon,
  useColorModeValue,
} from "@chakra-ui/react";
import { selectionSort } from "../../utils/timeUtils";
import AddComment from "./AddComment";
import Comment from "./Comment";
import { GET_COMMENTS } from "../../utils/queries";

import AuthService from "../../utils/auth";
const Auth = new AuthService();

export default function BoookCardExtended({
  index,
  title,
  image,
  link,
  description,
  publisher,
  publisherLogo,
  year,
}) {
  const { loading, data } = useQuery(GET_COMMENTS, {
    variables: { commentedBook: title },
  });
  console.log(data);
  const comments = data?.comments || [];

  const sortedComments = selectionSort(comments, "createdAt");

  return (
    <Container maxW={"6xl"}>
      <Stack
        align={"center"}
        spacing={{ base: 8, md: 10 }}
        py={{ base: 5, md: 7 }}
        direction={{ base: "column", md: "row" }}
      >
        <Stack flex={1} spacing={{ base: 5, md: 10 }}>
          <Heading
            lineHeight={1.1}
            fontWeight={600}
            fontSize={{ base: "3xl", sm: "4xl", lg: "6xl" }}
          >
            <Text
              as={"span"}
              position={"relative"}
              _after={{
                content: "''",
                width: "full",
                height: "30%",
                position: "absolute",
                bottom: 1,
                left: 0,
                bg: "purple.500",
                zIndex: -1,
              }}
            >
              {title}
            </Text>
          </Heading>
          <Text color={"gray.500"}>{description}</Text>
          <Stack
            spacing={{ base: 4, sm: 6 }}
            direction={{ base: "column", sm: "row" }}
          >
            <Button
              as={"a"}
              href={link}
              rounded={"full"}
              size={"lg"}
              fontWeight={"normal"}
              px={6}
              colorScheme={"red"}
              bg={"purple.500"}
              _hover={{ bg: "red.500" }}
            >
              Buy the Book
            </Button>
          </Stack>
        </Stack>
        <Flex
          flex={1}
          justify={"center"}
          align={"center"}
          position={"relative"}
          w={"full"}
        >
          <Blob
            w={"150%"}
            h={"150%"}
            position={"absolute"}
            top={"-20%"}
            left={0}
            zIndex={-1}
            color={useColorModeValue("red.50", "purple.500")}
          />
          <Box
            position={"relative"}
            height={"550px"}
            rounded={"2xl"}
            boxShadow={"2xl"}
            width={"full"}
            overflow={"hidden"}
          >
            <Image
              alt={"Hero Image"}
              fit={"cover"}
              align={"center"}
              w={"100%"}
              h={"100%"}
              src={image}
            />
          </Box>
        </Flex>
      </Stack>

      {/* Comments Section */}
      {loading ? (
        <div>Loading...</div>
      ) : (
        <>
          {comments ? (
            <>
              <Heading
                lineHeight={1.1}
                fontWeight={600}
                fontSize={{ base: "xl", sm: "2xl", lg: "3xl" }}
                color={"purple.500"}
              >
                Readers' Comments
                {sortedComments.map((comment) => (
                  <Comment
                    key={comment._id}
                    commentId={comment._id}
                    commentAuthor={comment.commentAuthor}
                    authorIcon={comment.authorIcon}
                    commentText={comment.commentText}
                    createdAt={comment.createdAt}
                    replies={comment.replies}
                  />
                ))}
                {Auth.loggedIn() ? (
                  <AddComment commentedBook={title} />
                ) : (
                  <>
                    <br />
                    <Text color={"red.600"} fontSize="lg">
                      You must be logged in to leave questions!
                    </Text>
                  </>
                )}
              </Heading>
            </>
          ) : (
            <>
              <Heading
                lineHeight={1.1}
                fontWeight={600}
                fontSize={{ base: "xl", sm: "2xl", lg: "3xl" }}
                color={"purple.500"}
              >
                Be the first to leave a comment...
                {Auth.loggedIn() ? (
                  <AddComment />
                ) : (
                  <span color={"red.600"}>but log in first!</span>
                )}
              </Heading>
            </>
          )}
        </>
      )}
    </Container>
  );
}

export const Blob = (props) => {
  return (
    <Icon
      width={"100%"}
      viewBox="0 0 578 440"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M239.184 439.443c-55.13-5.419-110.241-21.365-151.074-58.767C42.307 338.722-7.478 282.729.938 221.217c8.433-61.644 78.896-91.048 126.871-130.712 34.337-28.388 70.198-51.348 112.004-66.78C282.34 8.024 325.382-3.369 370.518.904c54.019 5.115 112.774 10.886 150.881 49.482 39.916 40.427 49.421 100.753 53.385 157.402 4.13 59.015 11.255 128.44-30.444 170.44-41.383 41.683-111.6 19.106-169.213 30.663-46.68 9.364-88.56 35.21-135.943 30.551z"
        fill="currentColor"
      />
    </Icon>
  );
};
