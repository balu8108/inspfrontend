import {
  Box,
  HStack,
  Text,
  Flex,
  Button,
  Image,
  Icon,
  Card,
  Link,
  useTheme,
  useDisclosure,
} from "@chakra-ui/react";
import { useSelector } from "react-redux";
import UploadAssignmentToClass from "../../../components/popups/UploadAssignmentToClass";
import defaultImageUrl from "../../../assets/images/image1.png";
import "../../../constants/scrollbar/style.css";
import FileBoxComponent from "../../../components/filebox/FileBoxComponent";
import { fileTypes, userType } from "../../../constants/staticvariables";
import { capitalize, checkUserType } from "../../../utils";
import { PiUploadSimpleBold } from "react-icons/pi";
const RecordedClass = ({
  type,
  recordingDetail,
  activeRecording,
  setActiveRecording,
  setIsFileAdded,
}) => {
  const { userProfile } = useSelector((state) => state.auth);
  const isLive = type && type === "live";
  const isSolo = type && type === "solo";
  const userRoleType = checkUserType(userProfile);
  const {
    isOpen: isSchedulePopupOpen,
    onOpen: onSchedulePopupOpen,
    onClose: onScheduleClosePopupOpen,
  } = useDisclosure();
  const { primaryBlue, primaryBlueLight, outerBackground } =
    useTheme().colors.pallete;

  const renderFiles = (data) => {
    let filesData = [];
    if (isLive) {
      filesData = data?.LiveClassRoomFiles;
    } else if (isSolo) {
      filesData = data?.SoloClassRoomFiles;
    } else {
      filesData = [];
    }

    return (
      <>
        {filesData && filesData.length > 0 ? (
          <FileBoxComponent
            data={filesData}
            type={isLive ? fileTypes.live : fileTypes.solo}
          />
        ) : (
          <Text fontSize={"0.8rem"} color={"#2C332978"}>
            No Files
          </Text>
        )}
      </>
    );
  };

  const renderAgenda = (data) => {
    let agenda = "";
    if (isLive) {
      agenda = data?.LiveClassRoomDetail.agenda;
    } else if (isSolo) {
      agenda = data?.agenda;
    } else {
      agenda = "";
    }

    return (
      <>
        {agenda ? (
          <Box>
            <Box>
              <Box>
                {agenda
                  .split("\r\n")
                  .slice(0, 4) // Take only the first 4 items
                  .map((ag, index) => (
                    <HStack key={index} pt={1}>
                      <Box
                        width={"13px"}
                        height={"13px"}
                        bg={"gray.200"}
                        borderRadius={"100%"}
                      />
                      <Text color={"rgba(44, 51, 41, 0.47)"} fontSize={"12px"}>
                        {ag}
                      </Text>
                    </HStack>
                  ))}
              </Box>
            </Box>
          </Box>
        ) : (
          <Text color={"#2C332978"} mt={2} fontSize={"12px"}>
            No Data
          </Text>
        )}
      </>
    );
  };

  const renderRecordings = (data, activeRecording) => {
    let recordings = [];
    if (isLive) {
      recordings = data?.LiveClassRoomRecordings;
    } else if (isSolo) {
      recordings = data?.SoloClassRoomRecordings;
    } else {
      recordings = [];
    }

    return (
      <>
        {recordings?.map(
          (lr) =>
            lr.id !== activeRecording?.id && (
              <Flex key={lr.id}>
                <Flex>
                  <Card
                    mt={"15px"}
                    color={"#2C332978"}
                    fontSize={"13px"}
                    w={"150px"}
                    mr={2}
                    _hover={{ cursor: "pointer" }}
                    onClick={() => setActiveRecording(lr)}
                  >
                    <Image src={defaultImageUrl} alt="Default Image" />
                  </Card>
                </Flex>
              </Flex>
            )
        )}
        {recordings?.length === 0 && (
          <Text color={"rgba(44, 51, 41, 0.47)"} fontSize={"12px"}>
            No recordings available...
          </Text>
        )}
        {recordings?.length === 1 &&
          activeRecording?.id === recordings[0]?.id && (
            <Text color={"rgba(44, 51, 41, 0.47)"} fontSize={"12px"}>
              No other recordings..
            </Text>
          )}
      </>
    );
  };

  return (
    <>
      {isSchedulePopupOpen && (
        <UploadAssignmentToClass
          isOpen={isSchedulePopupOpen}
          onClose={onScheduleClosePopupOpen}
          classId={recordingDetail?.id}
          setIsFileAdded={setIsFileAdded}
          type={type}
        />
      )}
      <Flex
        direction={"column"}
        justifyContent={"space-between"}
        height={"100%"}
        gap={5}
      >
        <Box
          width={"310px"}
          height={"full"}
          borderRadius={"26px"}
          p={6}
          bg={outerBackground}
        >
          <HStack spacing={"10px"}>
            <Box
              width={"12px"}
              height={"25px"}
              borderRadius={"20px"}
              bg={"#3C8DBC"}
            ></Box>
            <Text fontSize={"20px"} lineHeight={"26px"} fontWeight={"400"}>
              Recorded Class
            </Text>
          </HStack>

          <Box mt={6}>
            <Box>
              <Text
                fontSize={"15px"}
                lineHeight={"18px"}
                fontWeight={400}
                color={"rgba(44, 51, 41, 1)"}
              >
                {isLive
                  ? capitalize(recordingDetail?.LiveClassRoomDetail?.topicName)
                  : isSolo
                  ? capitalize(recordingDetail?.topic)
                  : capitalize("No Data")}
              </Text>

              <Text
                fontSize={"12px"}
                fontWeight={400}
                lineHeight={"14px"}
                color={"rgba(44, 51, 41, 0.47)"}
                mt={1}
              >
                {isLive || isSolo ? recordingDetail?.mentorName : "No data"}
              </Text>
            </Box>
          </Box>

          <Box mt={6}>
            <Text fontSize={"15px"} lineHeight={"19px"}>
              Description
            </Text>

            <Text
              mt={1}
              color={"#2C332978"}
              fontSize={"12px"}
              lineHeight={"20px"}
            >
              {isLive
                ? recordingDetail?.LiveClassRoomDetail?.description
                : isSolo
                ? recordingDetail?.description
                : "No Data"}
            </Text>
          </Box>
          <Box mt={6}>
            <Flex direction={"row"} gap={8} mb={2}>
              <Text>Files</Text>
              {userRoleType === userType.teacher && (
                <Icon
                  as={PiUploadSimpleBold}
                  mt={1}
                  onClick={(e) => {
                    onSchedulePopupOpen();
                  }}
                  _hover={{ bg: "none", cursor: "pointer" }}
                />
              )}
            </Flex>
            <Box mt={1}>{renderFiles(recordingDetail)}</Box>
          </Box>
          <Box mt={6}>
            <Text fontSize="15px" lineHeight={"19px"}>
              Agenda
            </Text>
            <Box mt={1}>{renderAgenda(recordingDetail)}</Box>
          </Box>

          <Box mt={6}>
            <Text>Recordings</Text>
            <Flex
              direction={"row"}
              overflowX={"auto"}
              w={"full"}
              className="example"
              gap={"10px"}
            >
              {renderRecordings(recordingDetail, activeRecording)}
            </Flex>
          </Box>
          {isLive && (
            <Box mt={6}>
              {/* <Text>Notes</Text>
          <Box mt={1}>{renderNotes(recordingDetail)}</Box> */}
            </Box>
          )}
        </Box>
        <Text
          fontSize={"12px"}
          lineHeight={"13px"}
          fontWeight={400}
          mt={4}
          color={"rgba(44, 51, 41, 1)"}
        >
          If you fetching any issue in live classes ? click below
        </Text>
        <Link isExternal={true} href={"https://forms.gle/886JxieoWe3vPw7T9"}>
          <Button
            w={"full"}
            bg={primaryBlue}
            color={"#fff"}
            fontWeight={"500"}
            fontSize={"14px"}
            _hover={{ bg: primaryBlueLight }}
          >
            Feedback form
          </Button>
        </Link>
      </Flex>
    </>
  );
};
export default RecordedClass;
