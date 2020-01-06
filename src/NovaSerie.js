import React, { useState } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";
import { Alert, Button, Form, FormGroup, Label, Input } from "reactstrap";

function NovaSerie() {
  const [name, setName] = useState("");
  const [success, setSuccess] = useState(false);
  const [erro, setErro] = useState(false);

  const onCancheInput = event => {
    setName(event.target.value);
  };

  const save = () => {
    axios
      .post("/api/series", {
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
    return <Redirect to="/series" />;
  }

  return (
    <div className="container">
      <h1>Nova Sére</h1>

      <Form>
        <FormGroup>
          <Label for="nome-serie">Série</Label>
          <Input
            type="text"
            name="name"
            id="nome-serie"
            value={name}
            onChange={onCancheInput}
            placeholder="Nome da série."
          />
        </FormGroup>
        <Button onClick={save}>Salvar</Button>
      </Form>
      {erro && <Alert color="danger">Erro ao cadastrar a Série!</Alert>}
    </div>
  );
}

export default NovaSerie;
