import React from "react";
import { useState } from "react";

import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Checkbox,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";

import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useDispatch } from "react-redux";
import { logout } from "../../features/user";
import { useMutation } from "@apollo/client";
import { REMOVE_USER } from "../../utils/mutations";

import AuthService from "../../utils/auth";
const Auth = new AuthService();

export default function DeleteUser({ onClose }) {
  const dispatch = useDispatch();
  const [deleteConfirmed, setDeleteConfirmed] = useState(false);

  // Add a separate state to change the visibilty of a password field
  const [showPassword, setShowPassword] = useState(false);

  const [formState, setFormState] = useState({
    password: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const [removeUser, { error, data }] = useMutation(REMOVE_USER);

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    if (!deleteConfirmed) {
      alert(
        "Please confirm you want to delete your account by ticking the box"
      );
      return;
    }

    if (!formState.password.trim()) {
      alert("Please enter your password");
      return;
    }

    try {
      const { data } = await removeUser();
      console.log(data);
      // Pass the values of the form to the global state
      dispatch(logout());
      Auth.logout();
      //   window.location.replace("/");
    } catch (e) {
      console.error(e);
    }
  };

  const handleCancel = () => {
    console.log("Cancel clicked");
    onClose(); // Call the onClose function from the prop to close the modal
  };

  return (
    <Flex
      id="delete-modal"
      minH={"60vh"}
      align={"center"}
      justify={"center"}
      background={"transparent"}
    >
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"} color={"red.500"}>
            Delete Account
          </Heading>
        </Stack>
        <br />
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <Stack spacing={4}>
            <Text fontSize={"lg"} color={"red.400"}>
              Are you sure you want to leave us?
            </Text>
            <Stack spacing={10}>
              <Stack
                direction={{ base: "column", sm: "row" }}
                align={"start"}
                justify={"space-between"}
              >
                <Checkbox
                  colorScheme="purple"
                  onChange={(e) => setDeleteConfirmed(e.target.checked)}
                >
                  Tick the box to confirm
                </Checkbox>
              </Stack>

              {deleteConfirmed && ( // Conditionally render the password field
                <FormControl id="password" isRequired>
                  <FormLabel>Confirm Password</FormLabel>
                  <InputGroup>
                    <Input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={formState.password}
                      onChange={handleChange}
                      focusBorderColor="purple.400"
                    />
                    <InputRightElement width="4.5rem">
                      <Button
                        h="1.75rem"
                        size="sm"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <ViewOffIcon /> : <ViewIcon />}
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                </FormControl>
              )}

              <Stack spacing={6} direction={["column", "row"]}>
                <Button
                  bg={"purple.400"}
                  color={"white"}
                  w="full"
                  _hover={{
                    bg: "purple.500",
                  }}
                  onClick={handleCancel}
                >
                  Cancel
                </Button>
                <Button
                  bg={"red.400"}
                  color={"white"}
                  w="full"
                  _hover={{
                    bg: "red.500",
                  }}
                  onClick={handleFormSubmit}
                >
                  Delete
                </Button>
              </Stack>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
