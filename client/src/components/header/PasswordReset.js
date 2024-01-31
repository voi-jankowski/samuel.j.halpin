import React, { useState } from "react";
import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  CloseButton,
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
  Modal,
  ModalOverlay,
  ModalContent,
} from "@chakra-ui/react";

import Login from "./Login";

import { useMutation } from "@apollo/client";
import { REQUEST_PASSWORD_RESET } from "../../utils/mutations";

export default function PasswordReset() {
  const [formState, setFormState] = useState({
    email: "",
  });

  // Add a state for the Login modal visibility
  const [isLoginOpen, setLoginOpen] = useState(false);

  const [requestPasswordReset, { error }] = useMutation(
    REQUEST_PASSWORD_RESET,
    {
      onCompleted: (data) => {
        console.log("Mutation completed:", data);
        // Show generic success message
        setValidationAlert("");
        setSuccessAlert(
          "If your email address exists in our records, you will receive a password reset link"
        );
        setErrorAlert("");
      },
      onError: (err) => {
        console.error("Mutation error:", err);
        // Show generic error message
        setValidationAlert("");
        setSuccessAlert("");
        setErrorAlert("Something went wrong, please try again later.");
      },
    }
  );

  const [successAlert, setSuccessAlert] = useState("");
  const [validationAlert, setValidationAlert] = useState("");
  const [errorAlert, setErrorAlert] = useState("");

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
    try {
      await requestPasswordReset({
        variables: { email: formState.email },
      });
    } catch (err) {
      console.error(err); // For debugging purposes only, remove in production
    }

    // Clear form input
    setFormState({ email: "" });
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
                autoComplete="email"
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
            <Link color={"purple.500"} onClick={() => setLoginOpen(true)}>
              Back to Login
            </Link>
          </Text>
          <Modal
            size={"lg"}
            isOpen={isLoginOpen}
            onClose={() => setLoginOpen(false)}
          >
            <ModalOverlay />
            <ModalContent>
              <Login setLoginOpen={setLoginOpen} />
            </ModalContent>
          </Modal>

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

          {/* Error Alert */}
          {errorAlert && (
            <Alert status="error" mt={4} rounded="md">
              <AlertIcon />
              <AlertTitle mr={2}>Error!</AlertTitle>
              <AlertDescription>{errorAlert}</AlertDescription>
              <CloseButton
                onClick={() => setErrorAlert("")}
                position="relative"
              />
            </Alert>
          )}
        </form>
      </Box>
    </Box>
  );
}
