import { useRef, useCallback } from "react";
import {
  Box,
  Flex,
  Avatar,
  Image,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  Stack,
  Center,
  IconButton,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerBody,
  Text,
  useTheme,
  useDisclosure,
} from "@chakra-ui/react";
import insplogo from "../../assets/images/insplogo.png";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, NavLink, useLocation } from "react-router-dom";
import { FaBars } from "react-icons/fa6";
import { setStudentFeedbackOpen } from "../../store/actions/studentFeedbackActions";
import { setUserProfile, setSecretToken } from "../../store/actions/authAction";
// In below links the available To is the user type
// if the same link is available to both type of user then we add 0,1
// or if for specific then it will be 0 or 1
// for example Assignments is available to students only not for teacher
// Similary Courses is available to teacher only not for student
const links = [
  { path: "/homepage", label: "Home", availableTo: [0, 1], type: "route" },
  {
    path: "/schedule-class",
    label: "Calendar",
    availableTo: [0, 1],
    type: "route",
  },
  {
    path: "/my-courses/PHYSICS",
    label: "Courses",
    availableTo: [1],
    type: "route",
  },
  {
    path: "/mentor/alluploads",
    label: "Uploads",
    availableTo: [1],
    type: "route",
  },

  {
    path: "/student/assignments/PHYSICS",
    label: "Assignments",
    availableTo: [0],
    type: "route",
  },
  {
    path: "/library/PHYSICS/1",
    label: "Library",
    availableTo: [0],
    type: "route",
  },
  {
    path: "/feedback-student", // student to give feedback
    label: "Suggestion",
    availableTo: [0],
    type: "button",
  },
  {
    path: "/feedback-mentor", // mentor to see feedback
    label: "Suggestion",
    availableTo: [1],
    type: "route",
  },
  {
    path: "/insp-website",
    label: "INSP Portal",
    availableTo: [0, 1],
    type: "route",
  },
];
const NavLinks = ({ userData, type }) => {
  const location = useLocation();
  const dispatch = useDispatch();
  const openStudentFeedback = () => {
    dispatch(setStudentFeedbackOpen(true, null));
  };

  return (
    <>
      {links.map(
        (link) =>
          link.availableTo.includes(userData?.user_type) && (
            <Box key={link.path} position="relative">
              <Box mx={2} my={type === "hamburger" ? 4 : 0}>
                {link.path === "/insp-website" ? (
                  <a
                    href={`${process.env.REACT_APP_EXTERNAL_INSP_BASE_URL}/student/profile`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {link.label}
                  </a>
                ) : link.type === "route" ? (
                  <NavLink
                    to={link.path}
                    style={({ isActive, isPending }) => ({
                      fontWeight: isActive ? 700 : 300,
                    })}
                  >
                    {link.label}
                  </NavLink>
                ) : (
                  <Text onClick={openStudentFeedback}>{link.label}</Text>
                )}
              </Box>
              {type === "normal" && (
                <Box
                  position="absolute"
                  width="100%"
                  height="2px"
                  bg="black"
                  borderRadius="md"
                  style={{
                    visibility: location.pathname.startsWith(link.path)
                      ? "visible"
                      : "hidden",
                  }}
                />
              )}
            </Box>
          )
      )}
    </>
  );
};

const DrawerComponent = ({
  isOpen,
  onClose,
  btnRef,
  userData,
  handleLogout,
}) => {
  return (
    <Drawer
      isOpen={isOpen}
      placement="right"
      onClose={onClose}
      finalFocusRef={btnRef}
    >
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />

        <DrawerBody>
          <Box py={7}>
            <Box textAlign={"center"}>
              <Center>
                <Avatar size={"lg"} name={userData?.name} objectFit={"cover"} />
              </Center>
              <Text mt={2}>{userData?.name}</Text>
            </Box>

            <NavLinks userData={userData} type="hamburger" />
            <Text mx={2} onClick={handleLogout}>
              Logout
            </Text>
          </Box>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};

export default function Navbar() {
  const theme = useTheme();
  const { outerBackground } = theme.colors.pallete;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef();
  const { userProfile: inspUserProfile } = useSelector((state) => state.auth);

  const handleLogout = useCallback(async () => {
    try {
      dispatch(setSecretToken(null));
      dispatch(setUserProfile(null));
      navigate("/");
    } catch (err) {}
  }, [navigate]);

  return (
    <>
      <Box bg={outerBackground} py={1} px={[6, 8, 10, 20]}>
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <Box>
            <a
              href={process.env.REACT_APP_EXTERNAL_INSP_BASE_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image src={insplogo} objectFit={"cover"} width={120} />
            </a>
          </Box>
          {/*This hamburger  button become visible in lower screen sizes  */}
          <Box display={["block", "block", "block", "none"]}>
            <IconButton
              icon={<FaBars />}
              bg="none"
              onClick={onOpen}
              ref={btnRef}
            ></IconButton>
          </Box>

          <Flex
            alignItems={"center"}
            display={["none", "none", "none", "flex"]}
          >
            <Flex mr={6} gap={6} fontSize={"0.98rem"} fontWeight={300}>
              <NavLinks userData={inspUserProfile} type="normal" />
            </Flex>
            <Stack direction={"row"} spacing={7}>
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
                    width={42}
                    height={42}
                    name={inspUserProfile?.name}
                    objectFit={"cover"}
                  />
                </MenuButton>
                <MenuList alignItems={"center"} zIndex={10}>
                  <br />
                  <Center>
                    <Avatar
                      size={"2xl"}
                      name={inspUserProfile?.name}
                      objectFit={"cover"}
                    />
                  </Center>
                  <br />
                  <Center>
                    <p>{inspUserProfile?.name}</p>
                  </Center>
                  <br />
                  <MenuDivider />
                  <MenuItem onClick={handleLogout}>Logout</MenuItem>
                </MenuList>
              </Menu>
            </Stack>
          </Flex>
        </Flex>
      </Box>

      <DrawerComponent
        isOpen={isOpen}
        btnRef={btnRef}
        onClose={onClose}
        userData={inspUserProfile}
        handleLogout={handleLogout}
      />
    </>
  );
}
