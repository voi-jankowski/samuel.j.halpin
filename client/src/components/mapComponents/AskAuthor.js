import React from "react";
import { Heading, Container } from "@chakra-ui/react";

import { useQuery } from "@apollo/client";
import { GET_QUESTIONS } from "../../utils/queries";
import AddQuestion from "./AddQuestion";
import Question from "./Question";
import { selectionSort } from "../../utils/timeUtils";

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
                <AddQuestion />
              </Heading>
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
                <AddQuestion />
              </Heading>
            </>
          )}
        </>
      )}
    </Container>
  );
}
