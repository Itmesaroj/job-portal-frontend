import { configureStore } from "@reduxjs/toolkit";
import jobReducer from "./slice/JobSlices";
import userReducer from "./slice/userSlice"
import updateProfileReducer from "./slice/updateProfileSlice";
import applicationReducer from "./slice/applicationSlice";
const store = configureStore({
    reducer: {
        jobs: jobReducer,
        user:userReducer,
        updateProfile: updateProfileReducer,
        applications: applicationReducer,
    },
});

export default store;
