import React, { useEffect, useState } from 'react';
import './../App.scss';
import './../List.scss';

import { withRouter } from 'react-router-dom';
import axios from 'axios';
import jsPDF from 'jspdf';
import swal from 'sweetalert';

const List = () => {
  const [search, setSearch] = useState('')
  const [list, setList] = useState([])

  const searchEngine = (event) => {
    setSearch(event);
    axios.get(`http://localhost:3001/list${event.length > 3 ? '?title=' + event : ''}`)
      .then(function (response) {
        console.log('response', response.data);
        setList(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  const downloadPDF = (data) => {
    const dataToPDF = [
      {
        "title": data.title,
        "init": data.init,
        "finish": data.finish,
        "parts": data.parts,
      },
    ];
    const doc = new jsPDF();
    dataToPDF.forEach(function (item, i) {
      doc.setFontSize(40);
      doc.text(item.title, 10, 25);
      doc.setFontSize(20);
      doc.text(`Inicio: ${item.init} - Fim: ${item.finish}`, 10, 40);
      doc.setFontSize(15);
      item.parts.map((item) => {
        const strArr = doc.splitTextToSize(`PARTE ${item.id}: ${item.text}`, 150);
        doc.text(strArr, 10, item.id * 50)
      });
    });
    doc.save('Test.pdf');
  }

  const deletItem = (item) => {
    swal({
      title: "Remover contrato",
      text: "Uma vez excluído, você não poderá recuperar esse arquivo!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
      .then((willDelete) => {
        if (willDelete) {
          axios.delete(`http://localhost:3001/list/${item.id}`)
          swal("Seu arquivo foi excluído!", {
            icon: "success",
          });
        }
      });
  }

  useEffect(() => {
    axios.get(`http://localhost:3001/list`)
      .then(function (response) {
        setList(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  return (
    <React.Fragment>
      <div className="search-content">
        <div className="search-wrapper">
          <input
            className="search"
            value={search}
            onChange={(event) => searchEngine(event.target.value)}
            placeholder="Pesquisar contrato" />
          <span className="fa fa-search"></span>
        </div>
      </div>

      <ul className="header-table">
        <li className="col-3">Título</li>
        <li className="col-1">Data de início</li>
        <li className="col-1">Data de término</li>
        <li className="col-1">Opções</li>
      </ul>

      <ul className="contract-list">
        {list.map(item => (
          <ul className="contract-item">
            <li className="item col-3">
              <h2>{item.title}</h2>
            </li>
            <li className="item col-1">
              <p>{item.init}</p>
            </li>
            <li className="item col-1">
              <p>{item.finish}</p>
            </li>
            <li className="item col-1">
              <button className="download" onClick={() => downloadPDF(item)}>Baixar</button>
              <button className="edit">Editar</button>
              <button className="delete" onClick={() => deletItem(item)} >Excluir</button>
            </li>
          </ul>
        ))}
      </ul>
    </React.Fragment>
  );
};

export default withRouter(List);
