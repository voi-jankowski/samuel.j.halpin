import React, { useState } from "react";
// The navbar template sourced from https://chakra-templates.dev/navigation/navbar
import {
  Box,
  Flex,
  Avatar,
  HStack,
  Link,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
  useColorMode,
  Center,
  Modal,
  ModalOverlay,
  ModalContent,
  useBreakpointValue,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon, MoonIcon, SunIcon } from "@chakra-ui/icons";
import Login from "./Login";
import Signup from "./Signup";

import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../features/user";

import AuthService from "../../utils/auth";
const Auth = new AuthService();

const Links = [
  { name: "Home", url: "/" },
  { name: "Books", url: "/books" },
  { name: "Inspiration Maps", url: "/map" },
  { name: "Teaching Resources", url: "/teaching" },
];

const NavLink = ({ children, url }) => {
  const linkSize = useBreakpointValue({ base: "sm", md: "lg" });

  return (
    <Link
      key={children}
      px={2}
      py={1}
      rounded={"md"}
      fontSize={linkSize} // Set the font size based on the breakpoint value
      _hover={{
        textDecoration: "none",
        bg: useColorModeValue("gray.300", "gray.700"),
      }}
      href={url}
    >
      {children}
    </Link>
  );
};

export default function Navbar() {
  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();
  // Add a separate state variable to track Login modal visibility
  const [isLoginOpen, setLoginOpen] = useState(false);
  const [isSignupOpen, setSignupOpen] = useState(false);

  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.value);
  console.log(user);

  // create logic for logging out
  const handleLogout = (event) => {
    event.preventDefault();
    Auth.logout();
    dispatch(logout());
  };

  return (
    <>
      <Box bg="transparent" px={4}>
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <IconButton
            size={"md"}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={"Open Menu"}
            display={{ md: "none" }}
            onClick={(event) => {
              event.stopPropagation(); // Stop event propagation
              isOpen ? onClose() : onOpen();
            }}
          />

          <HStack as={"nav"} spacing={4} display={{ base: "none", md: "flex" }}>
            {Links.map((link) => (
              <NavLink key={link.name} url={link.url}>
                {link.name}
              </NavLink>
            ))}
          </HStack>

          <Flex alignItems={"center"}>
            <Stack direction={"row"} spacing={7}>
              <Button onClick={toggleColorMode}>
                {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
              </Button>

              <Menu>
                <MenuButton
                  as={Button}
                  rounded={"full"}
                  variant={"link"}
                  cursor={"pointer"}
                  minW={0}
                >
                  <Avatar
                    size={"sm"}
                    src={"https://avatars.dicebear.com/api/male/username.svg"}
                  />
                </MenuButton>
                <MenuList alignItems={"center"}>
                  <br />
                  <Center>
                    <Avatar
                      size={"2xl"}
                      src={"https://avatars.dicebear.com/api/male/username.svg"}
                    />
                  </Center>
                  <br />

                  {Auth.loggedIn() ? (
                    <>
                      <Center>
                        <p>{user.username}</p>
                      </Center>
                      <br />
                      <MenuDivider />
                      <MenuItem as={Link} href="/profile" onClick={onClose}>
                        Your Profile
                      </MenuItem>
                      <MenuItem onClick={handleLogout}>Logout</MenuItem>
                    </>
                  ) : (
                    <>
                      <Center>
                        <p>Login or Create New User</p>
                      </Center>
                      <br />
                      <MenuDivider />

                      <MenuItem as={Link} onClick={() => setLoginOpen(true)}>
                        Login
                      </MenuItem>
                      <Modal
                        isOpen={isLoginOpen}
                        onClose={() => setLoginOpen(false)}
                      >
                        <ModalOverlay />
                        <ModalContent>
                          <Login />
                        </ModalContent>
                      </Modal>
                      <MenuItem as={Link} onClick={() => setSignupOpen(true)}>
                        Signup
                      </MenuItem>
                      <Modal
                        isOpen={isSignupOpen}
                        onClose={() => setSignupOpen(false)}
                      >
                        <ModalOverlay />
                        <ModalContent>
                          <Signup />
                        </ModalContent>
                      </Modal>
                    </>
                  )}
                </MenuList>
              </Menu>
            </Stack>
          </Flex>
        </Flex>

        {isOpen ? (
          <Box pb={4} display={{ md: "none" }}>
            <Stack as={"nav"} spacing={4}>
              {Links.map((link) => (
                <NavLink key={link.name} url={link.url}>
                  {link.name}
                </NavLink>
              ))}
            </Stack>
          </Box>
        ) : null}
      </Box>
    </>
  );
}
