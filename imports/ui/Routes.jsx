import React from "react";
import {Route} from "react-router-dom";
import Home from "./pages";

const Routes = ({host}) => {
    return (
        <>
            <Route path="/" exact>
                <Home host={host}/>
            </Route>
        </>
    );
};

export default Routes;
