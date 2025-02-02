import { EXTERNAL_INSP_BASE_URL } from "../../constants/staticurls";

// This is temporary secret key instead of this we will use clients secret key who is logged in

const secret_key = {
  secret_key: process.env.REACT_APP_S_KEY,
};

export const fetchAllSubjectsApi = async () => {
  const body = secret_key;
  const requestOptions = {
    method: "POST",
    body: JSON.stringify(body),
  };
  try {
    const response = await fetch(
      EXTERNAL_INSP_BASE_URL + "/webservices/apis/subjects",
      requestOptions
    );
    const data = await response.json();
    if (data.status) {
      return data;
    }
  } catch (err) {
    console.log("err in fetching subjects", err);
  }
};

export const fetchAllChaptersApi = async () => {
  const body = secret_key;
  const requestOptions = {
    method: "POST",
    body: JSON.stringify(body),
  };

  try {
    const response = await fetch(
      EXTERNAL_INSP_BASE_URL + "/webservices/apis/chapters",
      requestOptions
    );
    const data = await response.json();
    if (data.status) {
      return data;
    }
  } catch (err) {
    console.log("err in fetching chapters", err);
  }
};
export const fetchAllTopicsApi = async (chapter_id) => {
  const body = { chapter_id: chapter_id, ...secret_key };
  const requestOptions = {
    method: "POST",
    body: JSON.stringify(body),
  };
  try {
    const response = await fetch(
      EXTERNAL_INSP_BASE_URL + "/webservices/apis/topics/",
      requestOptions
    );
    const data = await response.json();

    if (data.status) {
      return data;
    }
  } catch (err) {
    console.log("err in fetching topics", err);
  }
};

// this is the external api where we will get all the topics without providing chapter_id.
export const fetchAllTopicsWithoutChapterIdApi = async () => {
  const body = secret_key;
  const requestOptions = {
    method: "POST",
    body: JSON.stringify(body),
  };

  try {
    const response = await fetch(
      EXTERNAL_INSP_BASE_URL + "/webservices/apis/all_topics",
      requestOptions
    );
    const data = await response.json();
    if (data.status) {
      return data;
    }
  } catch (err) {
    console.log("err in fetching topics data", err);
  }
};

// this is the api which will fetch all the  topics for particular subject.
export const fetchAllTopicsForSubjectApi = async (subject_id) => {
  const body = { subject_id: subject_id, ...secret_key };
  const requestOptions = {
    method: "POST",
    body: JSON.stringify(body),
  };

  try {
    const response = await fetch(
      EXTERNAL_INSP_BASE_URL + "/webservices/apis/subject_wise_topics",
      requestOptions
    );
    const data = await response.json();
    if (data) {
      return data;
    }
  } catch (err) {
    console.log("Error in fetching topics data:", err);
  }
};
