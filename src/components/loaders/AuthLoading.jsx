import React, { useEffect } from "react";
import { Flex, Spinner, Box, Text } from "@chakra-ui/react";
import { useParams, useNavigate } from "react-router-dom";
import { loginApi } from "../../api/authapis";
const AuthLoading = ({ message }) => {
  const { secret_token } = useParams();
  const navigate = useNavigate();

  const login = async (secret_token) => {
    try {
      const res = await loginApi(secret_token);

      if (res.status === 200) {
        // set local storage

        localStorage.setItem(
          "insp_user_profile",
          JSON.stringify(res?.data?.data?.authData)
        );
        navigate("/schedule-class");
      }
    } catch (err) {
      // some error occurs then redirect to auth
      console.log(err);
      navigate("/");
    }
  };
  useEffect(() => {
    if (!secret_token) {
      navigate("/");
    } else {
      // Try to login
      login(secret_token);
    }
  }, [secret_token]);
  return (
    <>
      <Flex
        position={"absolute"}
        width={"100%"}
        height={"100vh"}
        top={0}
        left={0}
        bg="rgba(0,0,0,0.5)"
        zIndex={20}
        justifyContent={"center"}
        alignItems={"center"}
        direction={"column"}
      >
        <Spinner size="xl" />
        {message && (
          <Box mt={6}>
            <Text>{message}</Text>
          </Box>
        )}
      </Flex>
    </>
  );
};

export default AuthLoading;
