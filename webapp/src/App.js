import { HashRouter, Route } from "react-router-dom";
import Viewer from "./Viewer";
import Simulator from "./Simulator";

export default function App() {
  return (
    <HashRouter basename="/">
      <Route exact path="/" component={Viewer} />
      <Route path="/simulator" component={Simulator} />
    </HashRouter>
  );
}
