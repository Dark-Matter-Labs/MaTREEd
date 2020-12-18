import { HashRouter, Route } from "react-router-dom";
import Viewer from "./Viewer";

export default function App() {
  return (
    <HashRouter basename="/">
      <Route exact path="/" component={Viewer} />
    </HashRouter>
  );
}
