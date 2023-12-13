import React, { useState } from "react";
import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  CloseButton,
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Link,
} from "@chakra-ui/react";

export default function PasswordReset({ setPasswordResetOpen }) {
  const [formState, setFormState] = useState({
    email: "",
  });

  const [successAlert, setSuccessAlert] = useState("");
  const [errorAlert, setErrorAlert] = useState("");
  const [validationAlert, setValidationAlert] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    // Check for empty email field and display a validation alert
    if (!formState.email.trim()) {
      setValidationAlert("Email field must be filled.");
      setSuccessAlert("");
      setErrorAlert("");
      return;
    }

    // Implement your password reset logic here
    // Example: Send a password reset email to the provided email address

    // Clear form input
    setFormState({ email: "" });

    // Show success alert
    setValidationAlert("");
    setErrorAlert("");
    setSuccessAlert("Password reset instructions sent to your email.");

    // Close the modal
    setPasswordResetOpen(false);
  };

  return (
    <Flex
      minH={"50vh"}
      align={"center"}
      justify={"center"}
      bg={"transparent"}
      rounded={"lg"}
    >
      <Stack
        spacing={8}
        mx={"auto"}
        maxW={"lg"}
        py={12}
        px={6}
        bg={useColorModeValue("gray.50", "gray.800")}
        rounded={"lg"}
        boxShadow={"lg"}
      >
        <Stack align={"center"}>
          <Heading fontSize={"4xl"}>Reset Your Password</Heading>
          <Text fontSize={"lg"} color={"gray.600"}>
            Enter your email to reset your password.
          </Text>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <form onSubmit={handleFormSubmit}>
            <Stack spacing={4}>
              <FormControl id="email" isRequired>
                <FormLabel>Email address</FormLabel>
                <Input
                  type="email"
                  name="email"
                  value={formState.email}
                  onChange={handleChange}
                  focusBorderColor="purple.400"
                />
              </FormControl>
              <Stack spacing={10}>
                <Button
                  bg={"purple.400"}
                  color={"white"}
                  _hover={{
                    bg: "purple.500",
                  }}
                  type="submit"
                >
                  Reset Password
                </Button>
              </Stack>
            </Stack>
            <br />
            <Text textAlign={"right"}>
              <Link
                color={"purple.500"}
                onClick={() => setPasswordResetOpen(false)}
              >
                Cancel
              </Link>
            </Text>

            {/* Success Alert */}
            {successAlert && (
              <Alert status="success" mt={4} rounded="md">
                <AlertIcon />
                <AlertTitle mr={2}>Success!</AlertTitle>
                <AlertDescription>{successAlert}</AlertDescription>
                <CloseButton
                  onClick={() => setSuccessAlert("")}
                  position="relative"
                />
              </Alert>
            )}

            {/* Validation Alert */}
            {validationAlert && (
              <Alert status="error" mt={4} rounded="md">
                <AlertIcon />
                <AlertTitle mr={2}>Validation Error!</AlertTitle>
                <AlertDescription>{validationAlert}</AlertDescription>
                <CloseButton
                  onClick={() => setValidationAlert("")}
                  position="relative"
                />
              </Alert>
            )}
          </form>
        </Box>
      </Stack>
    </Flex>
  );
}
