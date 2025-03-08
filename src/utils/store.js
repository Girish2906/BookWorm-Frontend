import {configureStore} from '@reduxjs/toolkit'; 
import userReducer from './userSlice'; 
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // Uses localStorage

const persistConfig = {
key: "root", 
storage, 
};
const persistedUserReducer = persistReducer(persistConfig, userReducer);
const appStore = configureStore({
    reducer: {
        user: persistedUserReducer
    }
}) ; 

export const persistor = persistStore(appStore) ; 

export default appStore ; 