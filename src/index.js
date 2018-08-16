import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { compose, createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import "./index.css";
import firebase from "firebase";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
import rootReducer from "./store/reducers/index";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(thunk))
);

const firebaseConfig = {
    apiKey: "AIzaSyAT4_fAmG0Htd-94dm7uY0lQ4MHS_0nqBA",
    authDomain: "solstice-food-delivery.firebaseapp.com",
    databaseURL: "https://solstice-food-delivery.firebaseio.com",
    projectId: "solstice-food-delivery",
    storageBucket: "solstice-food-delivery.appspot.com",
    messagingSenderId: "932257796215"
};

firebase.initializeApp(firebaseConfig);

const app = (
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
);

ReactDOM.render(app, document.getElementById("root"));
registerServiceWorker();
