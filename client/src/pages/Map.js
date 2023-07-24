import {
  Box,
  Container,
  Text,
  Image,
  Heading,
  Button,
  Stack,
  useBreakpointValue,
} from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import MothElement from "../components/mapComponents/MothElement";

const inspirations = [
  {
    title: "The Helligan Mills",
    description:
      "I was hiking with my husband in the mountains in Poland, when I saw a strange building perched on top of a crag, and the moment I saw it I knew that was what the Helligan Mills looked like. I’d seen something similar in my head as I was writing it, but when I saw this it was like the book coming to life in front of me.",
    linkImage: "./assets/images/moth1.png",
    image: "",
  },
  {
    title: "Bonhilda Bonhoeffer’s Sweetshop",
    description:
      "There was a shop in my home town in Tasmania called the Reliquaire, and it was one of the most magical places I could ever imagine as a kid. It was so stuffed with glistening objects and sparkling ornaments and had a strange stillness to it. At the Reliquaire they made the most spectacular fudge I’ve ever tasted to this day, and there would always be someone wondering around with a tasting tray.",
    linkImage: "./assets/images/moth2.png",
    image: "",
  },
  {
    title: "Gran",
    description:
      "My own Grandma wore a variety of silk scarves and had oodles of the most wonderful little sayings which she would whip out, including one which I believed until I was about ten which was that she was twenty-one and not a day older. There was however one scarf she had that was half green and half gold and when she stepped into the sunlight it would glisten like a lizard. I always found those colours so bewitching.",
    linkImage: "./assets/images/moth3.png",
    image: "",
  },
  {
    title: "Husk Woods School",
    description:
      "The back of my own school opened onto a vast stretch of bush, and there was even a deer pen right next to our playground. Every now and then one of the deer would get out of their cage and go charging across the fields and do loops around the swings!",
    linkImage: "./assets/images/moth4.png",
    image: "",
  },
  {
    title: "The Riddling Woods",
    description:
      "In Tasmania where I grew up, there were stories all the time about people going missing out in the bush. Often it was Tasmanian Devils that were blamed, but it always meant that there was a sense of unease and apprehension that filled me whenever I went walking through the woods near our house.",
    linkImage: "./assets/images/moth5.png",
    image: "",
  },
  {
    title: "Marley’s Barge",
    description:
      "Near my house in London was a big canal called the Regent’s Canal, and I became fascinated walking along it every day by the barges which were moored along it and the types of people that lived in them. One time I even saw one called ‘The Poppy’ which I thought was a sign that Mumbling Marley might be about.",
    linkImage: "./assets/images/moth6.png",
    image: "",
  },
  {
    title: "The Brindled Weave",
    description:
      "I was inspired by a fabric shop I once went to in Cornwall. It had shelves and shelves groaning under the weight of different coloured silks and satins. And from the back of the shop as I wandered around being generally nosy, a lady appeared with hair so white and feathery it was liked whipped cream. Ever since that day I’ve always kept the image of that fascinating place in my head, until it finally appeared in the Peggs.",
    linkImage: "./assets/images/moth7.png",
    image: "",
  },
];

const heightValues = {
  base: "130vh", // Height on small screens
  // sm: "100vh", // Height on medium screens
  lg: "200vh", // Height on larger screens
};

export default function Map() {
  // Function to get a random position within the container
  const getRandomPosition = () => ({
    top: `${Math.random() * 80 + 10}%`,
    left: `${Math.random() * 80 + 10}%`,
  });

  const height = useBreakpointValue(heightValues);

  return (
    <Box p={4} mt="10%">
      <Box
        position="absolute"
        top="20%"
        left="50%"
        transform="translate(-50%, -50%)"
        textAlign="center"
      >
        <Container spacing={4} maxW={"3xl"}>
          <Heading
            fontSize={{
              base: "2xl",
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
          >
            Wonder across this most peculiar map of Suds from The Peculiar Peggs
            of Riddling Woods to see where the inspiration for different parts
            of the book came from.
          </Text>
        </Container>
      </Box>
      <Box mb={20} position="relative">
        {/* Use the Image component and set the source of the background image */}
        <Image
          src="/assets/images/Map_Frame.png"
          alt="Inspiration Map"
          h={height}
          w="100%"
          m="auto"
          objectFit="cover"
        />
        {/* Render the Moth elements on top of the Image */}
        <Box position="absolute" top="10%" left={0} w="100%" h="80%">
          {inspirations.map((inspiration, index) => (
            <MothElement
              key={index}
              title={inspiration.title}
              description={inspiration.description}
              linkImage={inspiration.linkImage}
              image={inspiration.image}
              style={getRandomPosition()} // Pass the random position as a prop
            />
          ))}
        </Box>
      </Box>
    </Box>
  );
}
