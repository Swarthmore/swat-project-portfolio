import * as React from "react";
import { Switch, Route } from "react-router-dom";
import CoreLayout from "../layouts/CoreLayout";
import HomeRoute from "./Home";
import NotFoundRoute from "./NotFound";
import ProjectsRoute from "./Projects";
import AddProjectRoute from "./AddProject";
import ManageRoute from "./Manage";
import EditProjectRoute from "./EditProject";
import AuthIsLoaded from "../containers/AuthIsLoaded";

export default function createRoutes() {
    return (
        <CoreLayout>
            <AuthIsLoaded>
                <Switch>
                    <Route exact path={HomeRoute.path} component={HomeRoute.component} />
                    {[
                        AddProjectRoute,
                        EditProjectRoute,
                        ProjectsRoute,
                        ManageRoute
                    ].map((settings: any, i) => <Route key={i} {...settings} />)}
                    <Route component={NotFoundRoute.component} />
                </Switch>
            </AuthIsLoaded>
        </CoreLayout>
    );

}
