import React, { useState, useEffect } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";
import { Alert, Form, FormGroup, Input, Button, Label } from "reactstrap";

function EditarGenero({ match }) {
  const [name, setName] = useState("");
  const [success, setSuccess] = useState(false);
  const [erro, setErro] = useState(false);

  useEffect(() => {
    axios.get("/api/genres/" + match.params.id).then(res => {
      setName(res.data.name);
    });
  }, [match.params.id]);

  const onChangeInput = event => {
    setName(event.target.value);
  };

  const update = () => {
    axios
      .put("/api/genres/" + match.params.id, {
        name
      })
      .then(res => {
        if (res.status === 200) {
          setSuccess(true);
        } else {
          setErro(true);
        }
      });
  };

  if (success) {
    return <Redirect to="/generos" />;
  }

  return (
    <div className="container">
      <h1>Editar Gênero</h1>
      <Form>
        <FormGroup>
          <Label for="nome-genero">Gênero</Label>
          <Input
            type="text"
            name="name"
            id="nome-genero"
            value={name}
            onChange={onChangeInput}
            placeholder="Nome do gênero."
          />
        </FormGroup>
        <Button onClick={update}> Alterar </Button>
      </Form>
      <br />
      {erro && <Alert color="danger">Erro ao atualizar o Gênero!</Alert>}
    </div>
  );
}

export default EditarGenero;
