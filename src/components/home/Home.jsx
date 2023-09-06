import { Box, Center, Text, Image, Link } from "@chakra-ui/react";
import { BiLinkExternal } from "react-icons/bi";
import insplogo from "../../assets/images/insplogo.png";
const Home = () => {
  return (
    <>
      <Center height={"100vh"}>
        <Box px={4}>
          <Center my={6}>
            <Image src={insplogo} objectFit={"cover"} width={200} />
          </Center>
          <Center my={6}>
            <Text fontSize={"1rem"}>
              For Login into Video Portal Click on Below Link
            </Text>
          </Center>
          <Center my={6}>
            <Link
              color={"blue"}
              href="https://www.inspedu.in/"
              display={"inline-flex"}
              alignItems={"center"}
              fontSize={"1rem"}
            >
              Redirect To Insp Website <BiLinkExternal />
            </Link>
          </Center>
        </Box>
      </Center>
    </>
  );
};

export default Home;
