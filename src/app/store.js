import { configureStore } from "@reduxjs/toolkit";
import langReducer from "../features/language/langSlice";
import submitReducer from "../features/submit/submit";
import resultReducer from "../features/result/result";
import qcountReducer from "../features/quiz/qcount";
import questionReducer from "../features/quiz/questions";
import countReducer from "../features/quiz/count";
import nameSlice from "../features/quiz/user";
import userSlice from "../features/quiz/dbuser";

export default configureStore({
  reducer: {
    language: langReducer,
    submit: submitReducer,
    result: resultReducer,
    qcount: qcountReducer,
    questions: questionReducer,
    count: countReducer,
    user: nameSlice,
    dbuser: userSlice,
  },
});
