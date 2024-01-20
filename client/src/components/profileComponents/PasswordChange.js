import React, { useState } from "react";
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
  Heading,
  useColorModeValue,
} from "@chakra-ui/react";

export default function PasswordChange() {
  const [formState, setFormState] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    // Logic for handling input changes
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    // Logic for form submission
  };

  return (
    <Box
      minH={"50vh"}
      mx={"auto"}
      maxW={"lg"}
      py={12}
      px={6}
      bg={useColorModeValue("gray.50", "gray.800")}
      rounded={"lg"}
      boxShadow={"lg"}
    >
      <Stack align={"center"}>
        <Heading fontSize={"4xl"}>Change Your Password</Heading>
      </Stack>
      <Box
        rounded={"lg"}
        bg={useColorModeValue("white", "gray.700")}
        boxShadow={"lg"}
        p={8}
      >
        <form onSubmit={handleFormSubmit}>
          <Stack spacing={4}>
            <FormControl id="currentPassword" isRequired>
              <FormLabel>Current Password</FormLabel>
              <Input
                type="password"
                name="currentPassword"
                value={formState.currentPassword}
                onChange={handleChange}
                focusBorderColor="purple.400"
              />
            </FormControl>

            <FormControl id="newPassword" isRequired>
              <FormLabel>New Password</FormLabel>
              <Input
                type="password"
                name="newPassword"
                value={formState.newPassword}
                onChange={handleChange}
                focusBorderColor="purple.400"
              />
            </FormControl>

            <FormControl id="confirmPassword" isRequired>
              <FormLabel>Confirm New Password</FormLabel>
              <Input
                type="password"
                name="confirmPassword"
                value={formState.confirmPassword}
                onChange={handleChange}
                focusBorderColor="purple.400"
              />
            </FormControl>

            <Button
              bg={"purple.400"}
              color={"white"}
              _hover={{
                bg: "purple.500",
              }}
              type="submit"
            >
              Change Password
            </Button>
          </Stack>
        </form>
      </Box>
    </Box>
  );
}
