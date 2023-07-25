import React from "react";
import { Heading, Container, Text } from "@chakra-ui/react";

import { useQuery } from "@apollo/client";
import { GET_QUESTIONS } from "../../utils/queries";
import AddQuestion from "./AddQuestion";
import Question from "./Question";
import { selectionSort } from "../../utils/timeUtils";

import AuthService from "../../utils/auth";
const Auth = new AuthService();

export default function AskAuthor() {
  const { loading, data } = useQuery(GET_QUESTIONS);
  console.log(data);

  const questions = data?.questions || [];

  const sortedQuestions = selectionSort(questions, "createdAt");

  return (
    <Container maxW={"6xl"}>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <>
          {questions ? (
            <>
              <Heading
                lineHeight={1.1}
                fontWeight={600}
                fontSize={{ base: "xl", sm: "2xl", lg: "3xl" }}
                color={"red.400"}
              >
                Readers' Questions
                {sortedQuestions.map((question) => (
                  <Question
                    key={question._id}
                    questionId={question._id}
                    questionText={question.questionText}
                    questionAuthor={question.questionAuthor}
                    authorIcon={question.authorIcon}
                    createdAt={question.createdAt}
                    answers={question.answers}
                  />
                ))}
              </Heading>
              {Auth.loggedIn() ? (
                <AddQuestion />
              ) : (
                <Text color={"red.600"}>
                  You must be logged in to leave questions!
                </Text>
              )}
            </>
          ) : (
            <>
              <Heading
                lineHeight={1.1}
                fontWeight={600}
                fontSize={{ base: "xl", sm: "2xl", lg: "3xl" }}
                color={"red.400"}
              >
                Be the first to leave a question...
                {Auth.loggedIn() ? (
                  <AddQuestion />
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
