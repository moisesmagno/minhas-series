import React, { useState, useEffect } from "react";
import axios from "axios";

function Generos() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get("api/genres").then(res => {
      setData(res.data.data);
    });
  }, []);

  const rendereizaLinha = record => {
    return (
      <tr key={record.id}>
        <th scope="row">{record.id}</th>
        <td>{record.name}</td>
        <td>
          <button>+</button>
        </td>
      </tr>
    );
  };

  return (
    <div>
      <h1>Generos</h1>

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

      <pre>{JSON.stringify(data)}</pre>
    </div>
  );
}

export default Generos;
