import React, { useState, useEffect } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";
import {
  Badge,
  Alert,
  Form,
  FormGroup,
  Input,
  Button,
  Label,
  Col
} from "reactstrap";

function InfoSerie({ match }) {
  const [genres, setGenres] = useState([]);
  const [form, setForm] = useState({});
  const [data, setData] = useState({});
  const [success, setSuccess] = useState(false);
  const [erro, setErro] = useState(false);
  const [mode, setMode] = useState("INFO");

  useEffect(() => {
    axios.get("/api/series/" + match.params.id).then(res => {
      setData(res.data);
      setForm(res.data);
    });
  }, [match.params.id, mode]);

  useEffect(() => {
    axios.get("/api/genres").then(res => {
      setGenres(res.data.data);
    });
  }, []);

  const selectRadio = value => {
    setForm({
      ...form,
      status: value
    });
  };

  const masterHeader = {
    height: "50vh",
    minHeight: "500px",
    backgroundImage: `url('${data.background}')`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat"
  };

  const onChangeInput = field => event => {
    setForm({
      ...form,
      [field]: event.target.value
    });
  };

  const update = () => {
    axios.put("/api/series/" + match.params.id, form).then(res => {
      if (res.status === 200) {
        setSuccess(true);
        setMode("INFO");
      } else {
        setErro(true);
      }
    });
  };

  // if (success) {
  //   return <Redirect to="/series" />;
  // }

  return (
    <div>
      <header style={masterHeader}>
        <div className="h-100" style={{ background: "rgba(0, 0, 0, 0.5)" }}>
          <div className="h-100 container">
            <div className="row h-100 align-items-center">
              <div className="col-3">
                <img
                  className="img-fluid img-thumbnail"
                  src={data.poster}
                  alt={data.name}
                />
              </div>
              <div className="col-8">
                <h1 className="font-weight-light text-white">{data.name}</h1>
                <div className="lead text-white">
                  {data.status === "ASSISTIDO" && (
                    <Badge color="success"> Assistido </Badge>
                  )}
                  {data.status === "PARA_ASSISTIR" && (
                    <Badge color="warning"> Para assistir </Badge>
                  )}
                  Gênero: {data.genre}
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {mode === "INFO" && (
        <div className="container">
          <br />
          <Button
            onClick={() => setMode("EDIT")}
            color="primary"
            size="lg"
            block
          >
            Editar
          </Button>
          <br />
        </div>
      )}

      {mode === "EDIT" && (
        <div className="container">
          <h1>Editar Série</h1>
          <div>
            <Button onClick={() => setMode("INFO")} color="info">
              Cancelar edição
            </Button>
          </div>

          <Form>
            <FormGroup>
              <Label for="nome-serie">Serie</Label>
              <Input
                type="text"
                name="name"
                id="nome-serie"
                value={form.name}
                onChange={onChangeInput("name")}
                placeholder="Nome do gênero."
              />
            </FormGroup>
            <FormGroup>
              <Label for="comments-serie">Commentário</Label>
              <Input
                type="text"
                name="comments"
                id="comments-serie"
                value={form.comments}
                onChange={onChangeInput("comments")}
                placeholder="Comentário da Série"
              />
            </FormGroup>
            <FormGroup>
              <Label for="form-genres">Gênero</Label>
              <Input
                type="select"
                name="genre"
                id="form-genres"
                value={data.genre_id}
                onChange={onChangeInput("genre_id")}
              >
                {genres.map(genre => (
                  <option
                    key={genre.id}
                    value={genre.id}
                    // selected={genre.id === form.genre_id}
                  >
                    {genre.name}
                  </option>
                ))}
              </Input>
            </FormGroup>
            <FormGroup tag="fieldset" row>
              <legend className="col-form-label col-sm-2">Status</legend>
              <Col sm={10}>
                <FormGroup check>
                  <Label check>
                    <Input
                      checked={form.status === "ASSISTIDO" ? "checked" : ""}
                      type="radio"
                      name="status"
                      value="ASSISTIDO"
                      onChange={() => selectRadio("ASSISTIDO")}
                    />
                    Assistido
                  </Label>
                </FormGroup>
                <FormGroup check>
                  <Label check>
                    <Input
                      checked={form.status === "PARA_ASSISTIR" ? "checked" : ""}
                      type="radio"
                      name="status"
                      value="PARA_ASSISTIDO"
                      onChange={() => selectRadio("PARA_ASSISTIR")}
                    />
                    Não assistido
                  </Label>
                </FormGroup>
              </Col>
            </FormGroup>
            <Button onClick={update}> Alterar </Button>
          </Form>
          <br />
          {erro && <Alert color="danger">Erro ao atualizar a Série!</Alert>}
        </div>
      )}
    </div>
  );
}

export default InfoSerie;
