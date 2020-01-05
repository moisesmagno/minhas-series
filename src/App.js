import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Header from "./Header";
import Generos from "./Generos";

const Home = () => <h1> Home </h1>;

function App() {
  return (
    <Router>
      <div>
        <Header />
        <Route path="/" exact component={Home} />
        <Route path="/generos" component={Generos} />
      </div>
    </Router>
  );
}

export default App;
