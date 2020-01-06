import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Alert, Button, ButtonGroup } from "reactstrap";

function Series() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get("api/series").then(res => {
      setData(res.data.data);
    });
  }, []);

  const deleteSerie = id => {
    axios.delete("/api/series/" + id).then(res => {
      const filterGenres = data.filter(item => item.id !== id);
      setData(filterGenres);
    });
  };

  const rendereizaLinha = record => {
    return (
      <tr key={record.id}>
        <th scope="row">{record.id}</th>
        <td>{record.name}</td>
        <td>
          <ButtonGroup>
            <Button color="info" tag={Link} to={"/series/" + record.id}>
              Info
            </Button>
            <Button onClick={() => deleteSerie(record.id)} color="danger">
              Excluir
            </Button>
          </ButtonGroup>
        </td>
      </tr>
    );
  };

  if (data.length === 0) {
    return (
      <div className="container">
        <h1>Séries</h1>
        <Button outline color="primary" tag={Link} to="/series/novo">
          Nova Série
        </Button>
        <br />
        <br />
        <Alert color="warning">Você não possui nenhuma série registrada!</Alert>
      </div>
    );
  }

  return (
    <div className="container">
      <div>
        <h1>Séries</h1>
        <Button outline color="primary" tag={Link} to="/series/novo">
          Nova Série
        </Button>
        <br />
        <br />
      </div>
      <table className="table table-dark">
        <thead>
          <tr>
            <th scope="col">Id</th>
            <th scope="col">Nome</th>
            <th scope="col">Açóes</th>
          </tr>
        </thead>
        <tbody>{data.map(rendereizaLinha)}</tbody>
      </table>
    </div>
  );
}

export default Series;
