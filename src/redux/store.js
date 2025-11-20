import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import hrReducer from "./hrSlice";
import postReducer from "./postSlice";
import attendReducer from "./attendSlice";
import bookmarkReducer from "./bookmarkSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    hr: hrReducer,
    posts: postReducer,
    attend: attendReducer,
    bookmark: bookmarkReducer,
  },
});

export default store;
