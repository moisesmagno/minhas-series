import React, { useState } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";
import { Alert, Button, Form, FormGroup, Label, Input } from "reactstrap";

function NovoGenero() {
  const [name, setName] = useState("");
  const [success, setSuccess] = useState(false);
  const [erro, setErro] = useState(false);

  const onCancheInput = event => {
    setName(event.target.value);
  };

  const save = () => {
    axios
      .post("/api/genres", {
        name
      })
      .then(res => {
        if (res.status === 200) {
          setSuccess(true);
        } else {
          setErro(false);
        }
      });
  };

  if (success) {
    return <Redirect to="/generos" />;
  }

  return (
    <div className="container">
      <h1>Novo gênero</h1>

      <Form>
        <FormGroup>
          <Label for="nome-genero">Gênero</Label>
          <Input
            type="text"
            name="name"
            id="nome-genero"
            value={name}
            onChange={onCancheInput}
            placeholder="Nome do gênero."
          />
        </FormGroup>
        <Button onClick={save}>Salvar</Button>
      </Form>
      {erro && <Alert color="danger">Erro ao atualizar o Gênero!</Alert>}
    </div>
  );
}

export default NovoGenero;
