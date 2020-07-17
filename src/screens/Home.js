import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import swal from 'sweetalert';
import InputMask from "react-input-mask";

import './../Home.scss';

const PartList = ({ items, setPart }) => {
  const changeValue = (value, index) => {
    let setItem = [...items];
    let item = { ...setItem[index] };
    item.text = value;
    setItem[index] = item;
    setPart(setItem);
  }
  return (
    items.map((item, index) => (
      <div key={item.id} className="form-row">
        <label key={item.id}>
          Clausula {item.id}:
          <textarea name={index} key={item.id} onChange={(event) => changeValue(event.target.value, index)} placeholder="Parte" value={item.text} />
        </label>
      </div>
    ))
  );
}

const Home = () => {
  const [title, setTitle] = useState('');
  const [init, setInit] = useState('');
  const [finish, setFinish] = useState('');
  const [clausePart, setPart] = useState([]);
  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    console.log('clausePart', clausePart);

    (title.length > 0 && init.length > 0 && finish.length > 0 && clausePart.length > 0) ?
      clausePart[0].text.length > 0 && setDisabled(false) : setDisabled(true)
    console.log('disabled', disabled);
  })

  const handleSubmit = (e) => {
    const newItem = {
      id: clausePart.length + 1,
      text: ''
    };
    setPart(clausePart.concat(newItem));
  }

  const convert = () => {
    axios.post('http://localhost:3001/list', {
      "title": title,
      "init": init,
      "finish": finish,
      "parts": clausePart
    })
      .then(function (response) {
        if (response.status === 201) {
          swal("", "Contrato cadastrado com sucesso!", "success");
          setTitle('')
          setInit('')
          setFinish('')
          setPart([]);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  return (
    <main className="page-content">
      <div className="container">

        <div className="column">
          <div className="form card">
            <div className="description-content">
              <h2>Preencha os dados do contrato:</h2>
              <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.</p>
            </div>
            <form className="form-content">
              <div className="form-row">
                <label>
                  Título:
                  <input onChange={(event) => setTitle(event.target.value)} placeholder="Contrato" value={title} />
                </label>
              </div>
              <div className="form-row">
                <label>
                  Data de inicio:
                  <InputMask placeholder="00/00/0000" mask="99/99/9999" name="init" onChange={(event) => setInit(event.target.value)} value={init} />
                </label>
                <label>
                  Vencimento:
                  <InputMask placeholder="00/00/0000" mask="99/99/9999" name="finish" onChange={(event) => setFinish(event.target.value)} value={finish} />
                </label>
              </div>
              <PartList items={clausePart} setPart={setPart} />
            </form>
            <div className="add-part">
              <button onClick={() => handleSubmit()} className="cadaster-btn">
                + Adicionar parte
              </button>
            </div>
            <div className="btn-wrapper">
              <button disabled={disabled} onClick={() => convert()} className="cadaster-btn">
                cadastrar
              </button>
            </div>
          </div>
        </div>

        <div className="column contract-wrapper">
          <div className="contract card">
            <h1>{title}</h1>
            <div className="row">
              <div className="row">
                <p><b>Data de inicio:</b></p>
                <p>{init}</p>
              </div>
              <div className="row">
                <p><b>Vencimento:</b></p>
                <p>{finish}</p>
              </div>
            </div>
            <div className="content">
              {clausePart.map(item => (
                <div key={item.id}>
                  <h2>Clausula {item.id}:</h2>
                  <p>{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </main>
  );
}

export default withRouter(Home);
