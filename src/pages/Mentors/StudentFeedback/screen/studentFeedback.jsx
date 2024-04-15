/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import {
  Box,
  Flex,
  Input,
  Button,
  InputLeftElement,
  InputRightElement,
  InputGroup,
  Text,
} from "@chakra-ui/react";
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableContainer,
  Select,
} from "@chakra-ui/react";
import { IoSearch } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";
import { RiDeleteBin5Line } from "react-icons/ri";
import { FaChevronLeft } from "react-icons/fa";
import { FaChevronRight } from "react-icons/fa";
import {
  deleteStudentFeedbackById,
  getAllStudentFeedback,
} from "../../../../api/studentfeedback";
import moment from "moment";
import { useSelector } from "react-redux";
import { useToastContext } from "../../../../components/toastNotificationProvider/ToastNotificationProvider";
import { checkUserType } from "../../../../utils";
import { useNavigate } from "react-router-dom";
const tableHeaderData = [
  "S.NO",
  "Date & time",
  "Student Name",
  "Feedback",
  "Action",
];

export default function StudentFeedbackDetails() {
  const { addNotification } = useToastContext();
  const [search, setSearch] = useState("");
  const [limit, setLimit] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const { userProfile } = useSelector((state) => state.auth);

  const [feedbackData, setFeedbackData] = useState([]);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "search") {
      setSearch(value);
    } else if (name === "limit") {
      setLimit(value);
    }
  };

  const handleSearch = () => {
    getFeedbackData({ limit, page: 1, search: search });
  };

  const handlePageChange = (value) => {
    let newPage = currentPage;
    if (value === "prev") {
      newPage -= 1;
    } else {
      newPage += 1;
    }
    setCurrentPage(newPage);
  };

  const handleDelete = async (id) => {
    try {
      await deleteStudentFeedbackById(id);
      addNotification("Student feedback deleted successfully", "success", 3000);
      getFeedbackData({ limit, page: currentPage, search: "" });
    } catch (err) {
      console.log("delete student feedback by id error", err);
    }
  };

  const getFeedbackData = async (body) => {
    try {
      const response = await getAllStudentFeedback(body);
      const { data, page, totalPages } = response.data;
      setFeedbackData(data);
      if (data.length === 0) {
        setCurrentPage(0);
      } else {
        setCurrentPage(page);
      }
      setTotalPages(totalPages);
    } catch (err) {
      console.log("get student feedback", err);
    }
  };
  const clearSearch = () => {
    setSearch("");
    getFeedbackData({ limit, page: 1, search: "" });
  };

  useEffect(() => {
    getFeedbackData({ limit, page: 1, search: search });
  }, [limit]);

  useEffect(() => {
    getFeedbackData({ limit, page: currentPage, search: search });
  }, [currentPage]);

  useEffect(() => {
    const userRoleType = checkUserType(userProfile);
    // {userRoleType: 'STUDENT'}
    if (userRoleType === "STUDENT") {
      navigate("/");
    }
  }, []);

  return (
    <Box>
      <Flex p={"14px"}>
        <InputGroup>
          <InputLeftElement pointerEvents="none">
            <IoSearch />
          </InputLeftElement>
          <Input
            type="text"
            id="search"
            name="search"
            value={search}
            onChange={handleChange}
            placeholder="Search"
          />
          {search && (
            <InputRightElement cursor={"pointer"} onClick={clearSearch}>
              <RxCross2 />
            </InputRightElement>
          )}
        </InputGroup>
        <Button
          isDisabled={!search}
          variant={"ghost"}
          bg={"#356F9F"}
          color={"white"}
          size={"14px"}
          lineHeight={"16px"}
          ml={"10px"}
          px={6}
          _hover={{ opacity: "0.9" }}
          type="button"
          onClick={handleSearch}
        >
          Search
        </Button>
      </Flex>

      <Flex mt={"20px"}>
        <TableContainer w={"99vw"} whiteSpace={"wrap"} overflow={"hidden"}>
          <Table variant="simple" className="!overflow-hidden">
            <Thead bg={"#F9FAFC"}>
              <Tr h={"50px"}>
                {tableHeaderData.map((item, index) => (
                  <Th
                    textTransform={"uppercase"}
                    key={index}
                    fontWeight={"600"}
                    fontStyle={"normal"}
                    fontSize={"18px"}
                    lineHeight={"30px"}
                    letterSpacing={"0.213px"}
                    whiteSpace={"nowrap"}
                  >
                    {item}
                  </Th>
                ))}
              </Tr>
            </Thead>
            <Tbody>
              {feedbackData.length > 0 ? (
                feedbackData.map((item, index) => (
                  <Tr key={item.id}>
                    <Td>{(currentPage - 1) * limit + index + 1}</Td>
                    <Td>{moment(item.createdAt).format("L")}</Td>
                    <Td>{item.studentName}</Td>
                    <Td w={"50%"}>{item.feedback}</Td>
                    <Td onClick={() => handleDelete(item.id)}>
                      <RiDeleteBin5Line />
                    </Td>
                  </Tr>
                ))
              ) : (
                <Tr h={"300px"}>
                  <Td colSpan={5} textAlign={"center"}>
                    No data found
                  </Td>
                </Tr>
              )}
            </Tbody>
            <Tfoot>
              <Tr>
                <Th
                  fontWeight={"400"}
                  fontStyle={"normal"}
                  fontSize={"14px"}
                  lineHeight={"20px"}
                  whiteSpace={"nowrap"}
                  colSpan={5}
                  textTransform={"capitalize"}
                  color={"#3A3541AD"}
                >
                  <Flex alignItems={"center"} justifyContent={"end"}>
                    <Text>Rows per page :</Text>
                    <Select
                      id="limit"
                      name="limit"
                      mx={"10px"}
                      size="xs"
                      w={"70px"}
                      value={limit}
                      onChange={handleChange}
                    >
                      <option value="10">10</option>
                      <option value="20">20</option>
                      <option value="30">30</option>
                    </Select>
                    <Flex
                      mx={"10px"}
                      color={"#3A3541DE"}
                      justifyContent={"center"}
                      alignItems={"center"}
                    >
                      <Text className="text-sm" textTransform={"lowercase"}>
                        {currentPage} of {totalPages}
                      </Text>
                      <Box color={"#3A35418A"}>
                        <Button
                          isDisabled={currentPage <= 1}
                          variant="ghost"
                          size="sm"
                          onClick={() => handlePageChange("prev")}
                        >
                          <FaChevronLeft />
                        </Button>
                        <Button
                          isDisabled={currentPage === totalPages}
                          variant="ghost"
                          size="sm"
                          onClick={() => handlePageChange("next")}
                        >
                          <FaChevronRight />
                        </Button>
                      </Box>
                    </Flex>
                  </Flex>
                </Th>
              </Tr>
            </Tfoot>
          </Table>
        </TableContainer>
      </Flex>
    </Box>
  );
}
