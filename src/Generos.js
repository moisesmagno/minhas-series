import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Alert, Button, ButtonGroup } from "reactstrap";

function Generos() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get("api/genres").then(res => {
      setData(res.data.data);
    });
  }, []);

  const deleteGenres = id => {
    axios.delete("/api/genres/" + id).then(res => {
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
            <Button color="info" tag={Link} to={"/generos/" + record.id}>
              Editar
            </Button>
            <Button onClick={() => deleteGenres(record.id)} color="danger">
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
        <h1>Gêneros</h1>
        <Alert color="warning">Você não possui nenhum Gênero registrado!</Alert>
      </div>
    );
  }

  return (
    <div className="container">
      <div>
        <h1>Generos</h1>
        <Button outline color="primary" tag={Link} to="/generos/novo">
          Novo Gênero
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

export default Generos;
