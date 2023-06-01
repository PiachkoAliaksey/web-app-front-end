import React from "react";
import {Provider} from "react-redux";
import ReactDOM from "react-dom";
import{BrowserRouter} from 'react-router-dom'

import App from "./App";
import {store} from "./redux/store";


ReactDOM.render(<Provider store={store} ><BrowserRouter><App /></BrowserRouter></Provider>, document.getElementById("root") as HTMLElement);
