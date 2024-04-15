import React, { useEffect } from "react";
import { Flex, Spinner, Box, Text } from "@chakra-ui/react";
import { useParams, useNavigate } from "react-router-dom";
import { decryptData } from "../../utils/crypticFunctions";
import { loginApi, loginWithUidApi } from "../../api/authapis";
import { useToastContext } from "../toastNotificationProvider/ToastNotificationProvider";
import { setSecretToken, setUserProfile } from "../../store/actions/authAction";
import { useDispatch } from "react-redux";
const AuthLoading = ({ message }) => {
  const { addNotification } = useToastContext();
  const { secret_token, unique_id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const login = async () => {
    try {
      let res;
      if (process.env.REACT_APP_ENVIRON === "production") {
        res = await loginWithUidApi(unique_id);
      } else {
        res = await loginApi(secret_token);
      }

      if (res.status === 200) {
        const decrptUserDetail = await decryptData(res?.data?.data?.authData);
        dispatch(setSecretToken(res?.data?.data?.secret_token));
        dispatch(setUserProfile(decrptUserDetail));
        navigate("/homepage");
      }
    } catch (err) {
      addNotification(err?.response?.data?.data, "error", 5000);
      navigate("/");
    }
  };
  useEffect(() => {
    const tokenExists =
      process.env.REACT_APP_ENVIRON === "production"
        ? !!unique_id
        : !!secret_token;

    if (!tokenExists) {
      navigate("/");
    } else {
      login();
    }
  }, [secret_token, unique_id]);

  return (
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
  );
};

export default AuthLoading;
