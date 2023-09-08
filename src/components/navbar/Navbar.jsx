import { useEffect, useState } from "react";
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
  useTheme,
} from "@chakra-ui/react";
import insplogo from "../../assets/images/insplogo.png";
import { getStorageData } from "../../utils";
export default function Navbar() {
  const theme = useTheme();
  const { backgroundLightBlue } = theme.colors.pallete;
  const [userData, setUserData] = useState(null);

  const getUserDetails = async () => {
    try {
      const res = getStorageData("insp_user_profile");
      setUserData(res.data);
    } catch (err) {}
  };
  useEffect(() => {
    getUserDetails();
  }, []);
  return (
    <>
      <Box bg={backgroundLightBlue} py={1} px={20}>
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <Box>
            <Image src={insplogo} objectFit={"cover"} width={120} />
          </Box>

          <Flex alignItems={"center"}>
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
                    name={userData && userData?.name}
                    objectFit={"cover"}
                  />
                </MenuButton>
                <MenuList alignItems={"center"} zIndex={10}>
                  <br />
                  <Center>
                    <Avatar
                      size={"2xl"}
                      name={userData && userData?.name}
                      objectFit={"cover"}
                    />
                  </Center>
                  <br />
                  <Center>
                    <p>{userData && userData?.name}</p>
                  </Center>
                  <br />
                  <MenuDivider />
                  <MenuItem>Logout</MenuItem>
                </MenuList>
              </Menu>
            </Stack>
          </Flex>
        </Flex>
      </Box>
    </>
  );
}
