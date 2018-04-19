import React from "react";
import ReactDOM from "react-dom";
// import App from './App';
import StandAlone from "./StandAlone";
import registerServiceWorker from "./registerServiceWorker";

ReactDOM.render(<StandAlone />, document.getElementById("root"));
registerServiceWorker();
