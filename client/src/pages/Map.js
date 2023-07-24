import {
  Box,
  Flex,
  Heading,
  Button,
  Stack,
  useColorModeValue,
} from "@chakra-ui/react";
import React from "react";

const inspirations = [
  {
    title: "The Helligan Mills",
    description:
      "I was hiking with my husband in the mountains in Poland, when I saw a strange building perched on top of a crag, and the moment I saw it I knew that was what the Helligan Mills looked like. I’d seen something similar in my head as I was writing it, but when I saw this it was like the book coming to life in front of me.",
    linkImage: "url(/assets/images/moth1.png)",
    image: "",
  },
  {
    title: "Bonhilda Bonhoeffer’s Sweetshop",
    description:
      "There was a shop in my home town in Tasmania called the Reliquaire, and it was one of the most magical places I could ever imagine as a kid. It was so stuffed with glistening objects and sparkling ornaments and had a strange stillness to it. At the Reliquaire they made the most spectacular fudge I’ve ever tasted to this day, and there would always be someone wondering around with a tasting tray.",
    linkImage: "url(/assets/images/moth2.png)",
    image: "",
  },
  {
    title: "Gran",
    description:
      "My own Grandma wore a variety of silk scarves and had oodles of the most wonderful little sayings which she would whip out, including one which I believed until I was about ten which was that she was twenty-one and not a day older. There was however one scarf she had that was half green and half gold and when she stepped into the sunlight it would glisten like a lizard. I always found those colours so bewitching.",
    linkImage: "url(/assets/images/moth3.png)",
    image: "",
  },
  {
    title: "Husk Woods School",
    description:
      "The back of my own school opened onto a vast stretch of bush, and there was even a deer pen right next to our playground. Every now and then one of the deer would get out of their cage and go charging across the fields and do loops around the swings!",
    linkImage: "url(/assets/images/moth4.png)",
    image: "",
  },
  {
    title: "The Riddling Woods",
    description:
      "In Tasmania where I grew up, there were stories all the time about people going missing out in the bush. Often it was Tasmanian Devils that were blamed, but it always meant that there was a sense of unease and apprehension that filled me whenever I went walking through the woods near our house.",
    linkImage: "url(/assets/images/moth5.png)",
    image: "",
  },
  {
    title: "Marley’s Barge",
    description:
      "Near my house in London was a big canal called the Regent’s Canal, and I became fascinated walking along it every day by the barges which were moored along it and the types of people that lived in them. One time I even saw one called ‘The Poppy’ which I thought was a sign that Mumbling Marley might be about.",
    linkImage: "url(/assets/images/moth6.png)",
    image: "",
  },
  {
    title: "The Brindled Weave",
    description:
      "I was inspired by a fabric shop I once went to in Cornwall. It had shelves and shelves groaning under the weight of different coloured silks and satins. And from the back of the shop as I wandered around being generally nosy, a lady appeared with hair so white and feathery it was liked whipped cream. Ever since that day I’ve always kept the image of that fascinating place in my head, until it finally appeared in the Peggs.",
    linkImage: "url(/assets/images/moth7.png)",
    image: "",
  },
];

export default function Map() {
  const bg = useColorModeValue("white", "gray.800");
  return (
    <Box
      w="full"
      h="container.xl"
      backgroundImage="url(/assets/images/Map_Frame.png)"
      bgPos="center"
      bgSize="cover"
    >
      <Flex
        align="center"
        pos="relative"
        justify="center"
        boxSize="full"
        //   bg="blackAlpha.700"
      >
        <Stack textAlign="center" alignItems="center" spacing={6}>
          <Heading
            fontSize={["2xl", , "3xl"]}
            fontWeight="semibold"
            color="white"
            textTransform="uppercase"
          >
            Build Your new{" "}
          </Heading>
          <Button colorScheme="brand" textTransform="uppercase" w="fit-content">
            Start project
          </Button>
        </Stack>
      </Flex>
    </Box>
  );
}
