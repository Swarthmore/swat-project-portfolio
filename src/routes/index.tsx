import * as React from "react";
import { Switch, Route } from "react-router-dom";
import CoreLayout from "../layouts/CoreLayout";
import HomeRoute from "./Home";
import NotFoundRoute from "./NotFound";
import ProjectsRoute from "./Projects";
import AddProjectRoute from "./AddProject";

export default function createRoutes() {

    return (
        <CoreLayout>
            <Switch>
                <Route exact path={HomeRoute.path} component={() => <HomeRoute.component />} />
                {[
                    AddProjectRoute,
                    ProjectsRoute
                ].map((settings: any, i) => (
                    <Route key={`Route-${i}`} {...settings} />
                ))}
                <Route component={NotFoundRoute.component} />
            </Switch>
        </CoreLayout>
    );

}
