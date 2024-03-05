import axios from "axios";
import React, { useEffect, useState } from "react";
import "./cardmodal.css";
import { FaArrowDown } from "react-icons/fa6";
import { FaArrowUp } from "react-icons/fa";

const CardModal = () => {
  const [dados, setDados] = useState([]);
  const [activeCard, setActiveCard] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:3000/salas")
      .then((resp) => {
        setDados(resp.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleModal = (id) => {
    setActiveCard(activeCard === id ? null : id);
  };

  return (
    <div className="cards-container">
      <div className="cards">
        {dados.map((dado) => (
          <div key={dado.id} className={`infos ${activeCard === dado.id ? 'modal-open' : ''}`}>
            <img src={dado.image} alt="img" />
            <h1>{dado.name}</h1>
            <p>{dado.description}</p>
            <div className="horarios">
              {dado.hours.map((hora, index) => (
                <div key={index} className="horario">
                  <p>{hora.time}</p>
                </div>
              ))}
            </div>
            <button className="button_arrow" onClick={() => handleModal(dado.id)}>
              {activeCard === dado.id ? <FaArrowUp className="arrow_up" /> : <FaArrowDown className="arrow_down" />}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CardModal;