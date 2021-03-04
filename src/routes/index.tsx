import * as React from "react";
import { Switch, Route } from "react-router-dom";
import CoreLayout from "../layouts/CoreLayout";
import HomeRoute from "./Home";
import NotFoundRoute from "./NotFound";
import ProjectsRoute from "./Projects";
import AddProjectRoute from "./AddProject";
import ProjectRoute from "./Project";

export default function createRoutes() {

    return (
        <CoreLayout>
            <Switch>
                <Route exact path={HomeRoute.path} component={() => <HomeRoute.component />} />
                {[
                    AddProjectRoute,
                    ProjectsRoute,
                    ProjectRoute
                ].map((settings: any, i) => (
                    <Route key={`Route-${i}`} {...settings} />
                ))}
                <Route component={NotFoundRoute.component} />
            </Switch>
        </CoreLayout>
    );

}
