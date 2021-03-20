import {Meteor} from "meteor/meteor";
import {BrowserRouter, StaticRouter} from "react-router-dom";

export default Meteor.isServer ? StaticRouter : BrowserRouter;
