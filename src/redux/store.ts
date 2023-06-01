import { usersTableReducer } from "./slices/usersTable";
import { authReducer } from "./slices/auth";
import { Store } from "redux"
import { configureStore} from "@reduxjs/toolkit";


export const store:Store = configureStore({
  reducer: {
    users:usersTableReducer,
    auth:authReducer
  }
})

export type RootState = ReturnType<typeof store.getState>
