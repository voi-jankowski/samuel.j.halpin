import {
  Box,
  Container,
  Text,
  Image,
  Heading,
  useBreakpointValue,
  Flex,
} from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import MothElement from "../components/mapComponents/MothElement";
import AskAuthor from "../components/mapComponents/AskAuthor";

import AuthService from "../utils/auth";
const Auth = new AuthService();

const inspirations = [
  {
    title: "The Helligan Mills",
    description:
      "I was hiking with my husband in the mountains in Poland, when I saw a strange building perched on top of a crag, and the moment I saw it I knew that was what the Helligan Mills looked like. I’d seen something similar in my head as I was writing it, but when I saw this it was like the book coming to life in front of me.",
    linkImage: "./assets/images-converted/moth1.webp",
    image: "./assets/images-converted/The_TV_Tower.webp",
    finalPosition: { top: "20%", left: "10%" },
  },
  {
    title: "Bonhilda Bonhoeffer’s Sweetshop",
    description:
      "There was a shop in my home town in Tasmania called the Reliquaire, and it was one of the most magical places I could ever imagine as a kid. It was so stuffed with glistening objects and sparkling ornaments and had a strange stillness to it. At the Reliquaire they made the most spectacular fudge I’ve ever tasted to this day, and there would always be someone wondering around with a tasting tray.",
    linkImage: "./assets/images-converted/moth2.webp",
    image: "./assets/images-converted/Bonhilda_Bonhoeffer_Sweet_Shop.webp",
    finalPosition: { top: "50%", left: "20%" },
  },
  {
    title: "Gran",
    description:
      "My own Grandma wore a variety of silk scarves and had oodles of the most wonderful little sayings which she would whip out, including one which I believed until I was about ten which was that she was twenty-one and not a day older. There was however one scarf she had that was half green and half gold and when she stepped into the sunlight it would glisten like a lizard. I always found those colours so bewitching.",
    linkImage: "./assets/images-converted/moth3.webp",
    image: "./assets/images-converted/Gran.webp",
    finalPosition: { top: "55%", left: "50%" },
  },
  {
    title: "Husk Woods School",
    description:
      "The back of my own school opened onto a vast stretch of bush, and there was even a deer pen right next to our playground. Every now and then one of the deer would get out of their cage and go charging across the fields and do loops around the swings!",
    linkImage: "./assets/images-converted/moth4.webp",
    image: "./assets/images-converted/Husk_School.webp",
    finalPosition: { top: "60%", left: "75%" },
  },
  {
    title: "The Riddling Woods",
    description:
      "In Tasmania where I grew up, there were stories all the time about people going missing out in the bush. Often it was Tasmanian Devils that were blamed, but it always meant that there was a sense of unease and apprehension that filled me whenever I went walking through the woods near our house.",
    linkImage: "./assets/images-converted/moth5.webp",
    image: "./assets/images-converted/Riddling_Woods.webp",
    finalPosition: { top: "75%", left: "55%" },
  },
  {
    title: "Marley’s Barge",
    description:
      "Near my house in London was a big canal called the Regent’s Canal, and I became fascinated walking along it every day by the barges which were moored along it and the types of people that lived in them. One time I even saw one called ‘The Poppy’ which I thought was a sign that Mumbling Marley might be about.",
    linkImage: "./assets/images-converted/moth6.webp",
    image: "./assets/images-converted/Barge.webp",
    finalPosition: { top: "15%", left: "60%" },
  },
  {
    title: "The Brindled Weave",
    description:
      "I was inspired by a fabric shop I once went to in Cornwall. It had shelves and shelves groaning under the weight of different coloured silks and satins. And from the back of the shop as I wandered around being generally nosy, a lady appeared with hair so white and feathery it was liked whipped cream. Ever since that day I’ve always kept the image of that fascinating place in my head, until it finally appeared in the Peggs.",
    linkImage: "./assets/images-converted/moth7.webp",
    image: "./assets/images-converted/Brindled_Weave.webp",
    finalPosition: { top: "80%", left: "10%" },
  },
];

// Define the different heights for the map based on the screen size
const heightValues = {
  base: "60vh", // Height on small screens
  sm: "100vh", // Height on medium screens
  lg: "150vh", // Height on larger screens
};

export default function Map() {
  const height = useBreakpointValue(heightValues);

  return (
    <Box p={4} mt={0}>
      <Box flexDirection={"collumn"} zIndex={2}>
        <Box
          display="flex"
          alignItems="flex-start"
          justifyContent="flex-start"
          mx={{ base: 0, md: 10 }}
        >
          <Image
            src="./assets/images-converted/Frame_1.webp"
            alt="Frame 1"
            w="25%"
            mt={8}
            objectFit="cover"
            opacity={0.8}
          />
          <Container spacing={4} maxW={"3xl"} textAlign="center">
            <Heading
              fontSize={{
                base: "xl",
                md: "3xl",
                lg: "4xl",
                xl: "5xl",
                "2xl": "6xl",
              }}
              fontWeight={"bold"}
            >
              Inspiration Map
            </Heading>

            <Text
              color={"gray.600"}
              fontSize={{ base: "sm", sm: "lg", lg: "xl", xl: "2xl" }}
              p={{ base: 2, sm: 4, lg: 6, xl: 8 }}
            >
              Wonder across this most peculiar map of Suds from The Peculiar
              Peggs of Riddling Woods and try clicking on the moths to learn
              where the inspiration for different parts of the book came from.
            </Text>
            <Box
              display="flex"
              alignItems="flex-start"
              justifyContent="flex-end"
              mx={{ base: 0, md: 10 }}
            >
              <Image
                src="./assets/images-converted/Frame_3.webp"
                alt="Frame 3"
                w="45%"
                mt={20}
                objectFit="cover"
                opacity={0.8}
              />
            </Box>
          </Container>
        </Box>
      </Box>

      <Box mt={-20} mb={20} zIndex={1} position={"relative"}>
        {/* Use the Image component and set the source of the background image */}
        <Image
          src="/assets/images-converted/Map_Frame.webp"
          alt="Inspiration Map"
          h={height}
          w="auto"
          m="auto"
          objectFit="cover"
          zIndex={2}
        />
        {/* Render the Moth elements on top of the Image */}
        <Box position="absolute" top={0} left={0} w="100%" h="100%" zIndex={3}>
          {inspirations.map(
            (
              { title, description, linkImage, image, finalPosition },
              index
            ) => (
              <MothElement
                key={index}
                title={title}
                description={description}
                linkImage={linkImage}
                image={image}
                finalPosition={finalPosition}
                style={{
                  position: "absolute",
                  transform: "translate(-50%, -50%)", // Center the elements
                }}
              />
            )
          )}
        </Box>
      </Box>

      {Auth.loggedIn() ? (
        <AskAuthor />
      ) : (
        <>
          <Flex justifyContent="center">
            <Text color={"purple.500"} fontSize="lg" fontWeight={"600"}>
              You must be logged in to view and leave questions!
            </Text>
          </Flex>
        </>
      )}
    </Box>
  );
}
