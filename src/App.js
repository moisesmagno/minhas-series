import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Header from "./Header";
import Generos from "./Generos";
import NovoGenero from "./NovoGenero";
import EditarGenero from "./EditarGenero";

const Home = () => <h1> Home </h1>;

function App() {
  return (
    <Router>
      <div>
        <Header />
        <Route path="/" exact component={Home} />
        <Route path="/generos" exact component={Generos} />
        <Route path="/generos/novo" exact component={NovoGenero} />
        <Route path="/generos/:id" exact component={EditarGenero} />
      </div>
    </Router>
  );
}

export default App;
