/**
 * @description
 * 
 * This is the component for the Landing Page. It should display the
 * LoginCard if the user is not authenticated.
 * 
 */

import * as React from "react";
import { Container } from "@material-ui/core";
import LoginCard from "../LoginCard/LoginCard";
import { useSelector } from "react-redux";
import { isLoaded, isEmpty } from "react-redux-firebase";
import { RootState } from "../../reducer";

export default function LandingPage() {

    const auth = useSelector((state: RootState) => state.firebase.auth)

    return (
        <Container>
            {!isLoaded(auth) 
                ? <span>Loading...</span>
                    : isEmpty(auth) 
                        ? <LoginCard /> : <></>
            }
        </Container>
    )

}