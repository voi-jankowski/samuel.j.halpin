import React, { useState } from "react";
import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  CloseButton,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  Text,
  useColorModeValue,
  Container,
  Modal,
  ModalOverlay,
  ModalContent,
} from "@chakra-ui/react";

import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useSelector, useDispatch } from "react-redux";
import { update } from "../features/user";

import { useMutation } from "@apollo/client";
import { UPDATE_USER } from "../utils/mutations";

import DeleteUser from "../components/profileComponents/DeleteUser";
import PasswordChange from "../components/profileComponents/PasswordChange";

import Login from "../components/header/Login";
import Signup from "../components/header/Signup";

import AuthService from "../utils/auth";
const Auth = new AuthService();

export default function Profile() {
  const dispatch = useDispatch();
  // Add a separate state variable to control viibility of Delete modal
  const [isDeleteOpen, setDeleteOpen] = useState(false);
  // Add a separate state variable to control viibility of Password modal
  const [isPasswordOpen, setPasswordOpen] = useState(false);
  // Add a separate state variable to track Login modal visibility
  const [isLoginOpen, setLoginOpen] = useState(false);
  const [isSignupOpen, setSignupOpen] = useState(false);

  //  // Add a separate state to change the visibilty of a password field
  const [showPassword, setShowPassword] = useState(false);

  // Extract the user data from the global state to use in the form
  const user = useSelector((state) => state.user.value);
  // Extract the theme color from the global state
  // const themeColor = useSelector((state) => state.theme.value);

  const [formState, setFormState] = useState({
    username: user.username,
    email: user.email,
    password: "",
    userIcon: user.userIcon,
  });

  const [updateUser, { error, data }] = useMutation(UPDATE_USER);

  const [successAlert, setSuccessAlert] = useState(""); // Success alert state
  const [errorAlert, setErrorAlert] = useState(""); // Error alert state
  const [validationAlert, setValidationAlert] = useState(""); // Validation alert state

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    // Check for empty fields and display a validation alert
    if (
      !formState.username.trim() ||
      !formState.email.trim() ||
      !formState.password.trim()
    ) {
      setValidationAlert("All fields must be filled.");
      setSuccessAlert(""); // Clear success alert
      setErrorAlert(""); // Clear error alert
      return;
    }

    try {
      const { data } = await updateUser({
        variables: { ...formState },
      });

      // Pass the values of the form to the global state to update the changes
      dispatch(
        update({
          username: data.updateUser.username,
          email: data.updateUser.email,
          // password: formState.password,
          userIcon: "/assets/images/moth7.png",
        })
      );

      // Show success alert and redirect to home page after 2 seconds
      setSuccessAlert("Profile has been updated.");
      setErrorAlert(""); // Clear error alert
      setValidationAlert(""); // Clear validation alert

      setTimeout(() => {
        window.location.replace("/");
      }, 2000);
    } catch (e) {
      console.error(e);

      setSuccessAlert(""); // Clear success alert
      setValidationAlert(""); // Clear validation alert
      // Check if the error is a duplicate key error for username
      if (
        e.message.includes("E11000 duplicate key error") &&
        e.message.includes("username_1")
      ) {
        setErrorAlert("This username is already in use. Try another one.");
      }
      // Check if the error is a duplicate key error for email
      else if (
        e.message.includes("E11000 duplicate key error") &&
        e.message.includes("email_1")
      ) {
        setErrorAlert(
          "This email is already in use. Try logging in or resetting your password."
        );
      } else if (e.message.includes("Incorrect credentials")) {
        setErrorAlert("Incorrect password. Try again.");
      } else {
        setErrorAlert("Something went wrong. Try again.");
      }
    }
  };

  return (
    <Container>
      <Flex
        minH={"60vh"}
        align={"center"}
        justify={"center"}
        bg={"transparent"}
      >
        <Stack
          spacing={4}
          w={"full"}
          maxW={"md"}
          bg={useColorModeValue("white", "gray.700")}
          rounded={"xl"}
          boxShadow={"lg"}
          p={6}
          my={12}
        >
          {Auth.loggedIn() ? (
            <>
              <Heading lineHeight={1.1} fontSize={{ base: "2xl", sm: "3xl" }}>
                User Profile Edit
              </Heading>

              <Text fontSize={{ base: "sm", sm: "md" }} pb={6}>
                Update your username and email address here.
              </Text>
              <form onSubmit={handleFormSubmit}>
                {/* <FormControl id="userIcon">
                  <FormLabel>User Icon</FormLabel>

                  <Stack direction={["column", "row"]} spacing={6}>
                    <Center>
                      <Avatar size="xl" src={user.userIcon}>
                        <AvatarBadge
                          as={IconButton}
                          size="sm"
                          rounded="full"
                          top="-10px"
                          colorScheme="red"
                          aria-label="remove Image"
                          icon={<SmallCloseIcon />}
                        />
                      </Avatar>
                    </Center>
                    <Center w="full">
                      <Button w="full">Change Icon</Button>
                    </Center>
                  </Stack>
                </FormControl> */}
                <FormControl id="userName">
                  <FormLabel>Username</FormLabel>
                  <Input
                    placeholder={user.username}
                    _placeholder={{ color: "gray.500" }}
                    type="text"
                    name="username"
                    value={formState.username}
                    onChange={handleChange}
                    focusBorderColor="purple.500"
                  />
                </FormControl>
                <FormControl id="email">
                  <FormLabel>Email address</FormLabel>
                  <Input
                    placeholder={user.email}
                    _placeholder={{ color: "gray.500" }}
                    type="email"
                    name="email"
                    value={formState.email}
                    onChange={handleChange}
                    focusBorderColor="purple.500"
                  />
                </FormControl>
                <FormControl id="password" isRequired>
                  <FormLabel>Confirm password</FormLabel>
                  <InputGroup>
                    <Input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={formState.password}
                      onChange={handleChange}
                      focusBorderColor="purple.400"
                    />
                    <InputRightElement h={"full"}>
                      <Button
                        variant={"ghost"}
                        onClick={() =>
                          setShowPassword((showPassword) => !showPassword)
                        }
                      >
                        {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                </FormControl>
                <br />

                <Button
                  bg={"purple.400"}
                  color={"white"}
                  w="full"
                  _hover={{
                    bg: "purple.500",
                  }}
                  type="submit"
                >
                  Update Profile
                </Button>

                <br />

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
                <br />
                <Stack spacing={6} direction={["column", "row"]}>
                  <Button
                    bg={"red.400"}
                    color={"white"}
                    w="full"
                    _hover={{
                      bg: "red.500",
                    }}
                    onClick={() => setDeleteOpen(true)}
                  >
                    Delete Account
                  </Button>
                  <Modal
                    isOpen={isDeleteOpen}
                    onClose={() => setDeleteOpen(false)}
                  >
                    <ModalOverlay />
                    <ModalContent>
                      <DeleteUser onClose={() => setDeleteOpen(false)} />
                    </ModalContent>
                  </Modal>

                  <Button
                    bg={"purple.400"}
                    color={"white"}
                    w="100%"
                    _hover={{
                      bg: "purple.500",
                    }}
                    onClick={() => setPasswordOpen(true)}
                  >
                    Update Password
                  </Button>
                  <Modal
                    isOpen={isPasswordOpen}
                    onClose={() => setPasswordOpen(false)}
                  >
                    <ModalOverlay />
                    <ModalContent>
                      <PasswordChange onClose={() => setPasswordOpen(false)} />
                    </ModalContent>
                  </Modal>
                </Stack>
              </form>
            </>
          ) : (
            <Stack align={"center"}>
              <Heading fontSize={"4xl"} textAlign={"center"}>
                <span
                  onClick={() => setLoginOpen(true)}
                  style={{ cursor: "pointer", color: "violet" }}
                >
                  Log in
                </span>{" "}
                or{" "}
                <span
                  onClick={() => setSignupOpen(true)}
                  style={{ cursor: "pointer", color: "violet" }}
                >
                  Sign up
                </span>
              </Heading>

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
              <Modal
                size={"lg"}
                isOpen={isSignupOpen}
                onClose={() => setSignupOpen(false)}
              >
                <ModalOverlay />
                <ModalContent>
                  <Signup setSignupOpen={setSignupOpen} />
                </ModalContent>
              </Modal>
              <Heading fontSize={"4xl"} textAlign={"center"}>
                or
              </Heading>
              <Button
                bg={"purple.400"}
                color={"white"}
                w="80%"
                _hover={{
                  bg: "purple.500",
                }}
                onClick={() => window.replace("/")}
              >
                Return to Home
              </Button>
            </Stack>
          )}
        </Stack>
      </Flex>
    </Container>
  );
}
