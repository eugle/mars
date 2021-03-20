import React from "react";
import {Route} from "react-router-dom";
import Home from "./pages";

const Routes = () => {
    return (
        <>
            <Route path="/" component={Home} exact/>
        </>
    );
};

export default Routes;
