/**
 * @description
 * 
 * This file contains the root reducer for the firebase / firestore store
 * 
 */

import { combineReducers } from "redux";
import { firebaseReducer } from "react-redux-firebase";
import { firestoreReducer } from "redux-firestore";

export const rootReducer = combineReducers({
    firebase: firebaseReducer,
    firestore: firestoreReducer
})