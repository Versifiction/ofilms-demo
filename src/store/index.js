import { createStore, compose, applyMiddleware } from "redux";

import reducer from "./reducer";
import testMiddleware from "./middlewares/test-middleware";

const devTools = [];
if (window.devToolsExtension) {
  devTools.push(window.devToolsExtension());
}

const preventDuplicatesMW = applyMiddleware(testMiddleware);

const enhancers = compose(
  preventDuplicatesMW,
  ...devTools
);

const store = createStore(reducer, enhancers);

export default store;
