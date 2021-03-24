import React from "react";
import {onPageLoad} from "meteor/server-render";
import {hydrate, render} from "react-dom";
import {Meteor} from "meteor/meteor";
import App from "../imports/both/App";
import initClient from '/imports/both/client';

Meteor.startup(() => {
    onPageLoad(async () => {
            const client = await initClient();
            const renderMethod = Meteor.isDevelopment ? render : hydrate;
            const host = window.location.hostname;

            renderMethod(<App client={client} host={host}/>, document.getElementById("app"))
        }
    );
})
