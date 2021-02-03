/**
 * @description
 * 
 * This file includes configuration and setup for react-redux-firebase. It exports both the rrfConfig,
 * which is used by the root-level provider in the App component, as well as the firebase store.
 * 
 */

import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import "firebase/firestore";
import "firebase/analytics";
import { createStore } from "redux";
import { fbConfig, rrfConfig } from "./config";
import { rootReducer } from "./reducer";

// initialize firebase
firebase.initializeApp({ ...fbConfig, ...rrfConfig})

// initialize firestore
firebase.firestore()

// enable analytics
firebase.analytics();

// initial state for this store
const initialState = {}

export const store = createStore(rootReducer, initialState)