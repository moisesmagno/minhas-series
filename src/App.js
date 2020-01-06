import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Header from "./Header";
import Home from "./Home";
import Series from "./Series";
import NovaSerie from "./NovaSerie";
import InfoSerie from "./InfoSerie";
import Generos from "./Generos";
import NovoGenero from "./NovoGenero";
import EditarGenero from "./EditarGenero";

function App() {
  return (
    <Router>
      <div>
        <Header />
        <Switch>
          <Route path="/" exact component={Home} />

          <Route path="/series" exact component={Series} />
          <Route path="/series/novo" exact component={NovaSerie} />
          <Route path="/series/:id" exact component={InfoSerie} />

          <Route path="/generos" exact component={Generos} />
          <Route path="/generos/novo" exact component={NovoGenero} />
          <Route path="/generos/:id" exact component={EditarGenero} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
