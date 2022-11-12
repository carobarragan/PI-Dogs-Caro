import { Route, Switch } from "react-router-dom";
import "./App.css";
import LandingPage from "./component/LandingPage/index";
import Home from "./component/Home/index";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import getDog, { getTemperament } from "./actions";
import Formulario from "../src/component/Formulario";
import Detail from "./component/Detail";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDog());
    dispatch(getTemperament());
  }, [dispatch]);

  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={LandingPage} />
        <Route path="/home/" component={Home} />
        <Route path="/Detail/:id" component={Detail} />
        <Route path="/cread" component={Formulario} />
      </Switch>
    </div>
  );
}

export default App;
