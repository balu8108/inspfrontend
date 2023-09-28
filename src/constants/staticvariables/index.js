export const staticVariables = {
  screenShare: "Screen Share",
  videoShare: "Video Share",
  audioShare: "Audio Share",
};

export const liveSessionMemberViewType = {
  compact: "Compact",
  expanded: "Expanded",
};

export const QnATypes = {
  poll: "POLL",
  mcq: "MCQ",
  trueFalse: "TRUE_FALSE",
};

export const miroViewMode = {
  view: "view",
  edit: "edit",
};

export const authStorageKey = {
  secret_token: "secret_token",
  insp_user_profile: "insp_user_profile",
};

export const routeType = {
  public: "public",
  private: "protected",
};

export const userType = {
  teacher: "TEACHER",
  student: "STUDENT",
};

export const classStatus = {
  SCHEDULED: "SCHEDULED",
  ONGOING: "ONGOING",
  NOT_STARTED: "NOT_STARTED",
  FINISHED: "FINISHED",
  NOT_CONDUCTED: "NOT_CONDUCTED",
};

export const classStatusText = {
  teacher: {
    SCHEDULED: "Start",
    ONGOING: "Ongoing",
    NOT_STARTED: "Start",
    FINISHED: "View Recording",
    NOT_CONDUCTED: "Not Conducted",
  },
  student: {
    SCHEDULED: "Join Class",
    ONGOING: "Ongoing",
    NOT_STARTED: "Not Started",
    FINISHED: "View Recording",
    NOT_CONDUCTED: "Not Conducted",
  },
};

export const toolTipMsgs = {
  videoNotAvailable: "Video feature not available to students",
  screenShareNotAvailable: "Screen share feature not available to students",
  audioNotAvailable: "Mentor has disabled the audio for students",
};
