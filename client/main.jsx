import React from "react";
import {onPageLoad} from "meteor/server-render";
import {hydrate, render} from "react-dom";
import {Meteor} from "meteor/meteor";
import App from "../imports/both/App";
import initClient from '/imports/both/client';

Meteor.startup(() => {
    onPageLoad( (sink) => {
            const client = initClient(sink);
            const renderMethod = Meteor.isDevelopment ? render : hydrate;
            renderMethod(<App client={client}/>, document.getElementById("app"))
        }
    );
})
