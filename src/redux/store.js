import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import hrReducer from "./hrSlice";
import postReducer from "./postSlice";
import attendReducer from "./attendSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    hr: hrReducer,
    posts: postReducer,
    attend: attendReducer,
  },
});

export default store;
