import React from "react";
import { Container, Heading, Stack, Text } from "@chakra-ui/react";

const privacyPolicySections = [
  {
    heading: "Personal Information We Collect",
    content:
      "When you register on our site, we may collect your username and email address. This information is essential for you to engage in our website's community, particularly for book discussions and comments.",
  },
  {
    heading: "Use of Personal Information",
    content:
      "We use your personal information to identify you on our platform, enabling you to engage in discussions and interact with our content. We commit to not using this information for marketing or advertising purposes, nor do we share it with third parties for such purposes.",
  },
  {
    heading: "Children's Privacy",
    content:
      "The Samuel J. Halpin Author Page is not directed at children under the age of 13. We do not knowingly collect personal information from children under this age. If we learn that a child under 13 has provided us with personal information, we will promptly delete it. If you are a parent or guardian and believe your child has provided us with their personal information, please contact us for prompt action.",
  },
  {
    heading: "Respectful Community Engagement",
    content:
      "Our community thrives on respect and positivity. We do not tolerate offensive or violent comments and will take immediate action to remove such content. Consistent violation of these standards may result in account termination.",
  },
  {
    heading: "External Links",
    content:
      "Our website may contain external links. These linked sites have their own privacy policies, and we bear no responsibility for their content or privacy practices.",
  },
  {
    heading: "Cookies and Tracking",
    content:
      "At present, we do not use cookies, except for necessary ones related to Stripe services (currently inactive). We will keep you informed of any changes to our use of cookies.",
  },
  {
    heading: "Policy Updates",
    content:
      "We may revise this Privacy Policy periodically. Any changes will be reflected on this page. Please review it regularly for updates.",
  },
  {
    heading: "Contact Information",
    content:
      "For any inquiries or concerns about our Privacy Policy, please contact us at [contact email].",
  },
];

export default function PrivacyPolicy() {
  return (
    <Container maxW={"4xl"} py="30px">
      <Heading
        lineHeight={1.1}
        fontWeight={600}
        fontSize={{ base: "2xl", sm: "3xl" }}
        textAlign={"center"}
        mb={5}
      >
        Privacy Policy
      </Heading>
      <Stack
        spacing={{ base: 8, md: 10 }}
        textAlign={"left"}
        bg={"transpartent"}
        p={5}
      >
        {/* Privacy Policy Text */}
        <Text>Last Updated: Jan 17, 2024</Text>
        <Text>
          Welcome to the Samuel J. Halpin Author Page. This Privacy Policy
          explains how we, at the Samuel J. Halpin Author Page, collect, use,
          and protect your personal information when you use our website [
          Website URL].
        </Text>

        {privacyPolicySections.map((section) => (
          <Stack spacing={5} key={section.heading}>
            <Heading fontSize={"lg"}>{section.heading}</Heading>
            <Text>{section.content}</Text>
          </Stack>
        ))}
      </Stack>
    </Container>
  );
}
