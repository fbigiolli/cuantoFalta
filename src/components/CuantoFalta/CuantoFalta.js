import React, { useState , useEffect } from 'react';

import {fetchFromAPI} from '../utils';

// API Credentials
const CLIENT_ID = 'a2a9c582983b4d4685ba50ca65048398';
const CLIENT_SECRET = '45f9C578295D425eB4fEeefdAa14c0Ab'; 

const CuantoFalta = () => {
  const [linea, setLinea] = useState('');
  const [datosFiltrados, setDatosFiltrados] = useState([]);

  const handleSubmit = async (event) => {
      event.preventDefault();

      const lineaActual = event.target.elements.linea.value;

      // Hacer la solicitud a la API y esperar a que se complete
      const dataFetchedFromAPI = await fetchFromAPI(CLIENT_ID, CLIENT_SECRET);

      // Filtrar los datos usando el valor actual de linea
      const datosFiltradosActualizados = dataFetchedFromAPI.filter((colectivo) => {
        const regex = new RegExp(`^${lineaActual}[A-Z]`);
        return colectivo.route_short_name === lineaActual || regex.test(colectivo.route_short_name);
      });
      setDatosFiltrados(datosFiltradosActualizados);

      // Actualizar el estado con el valor actual
      setLinea(lineaActual);

      console.log(datosFiltradosActualizados);
  };


  return (
      <div>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="linea"
            placeholder="Ingrese un parámetro"
          />
          <button type="submit">Enviar</button>
        </form>
        <div>
          <h1>{ linea }</h1>
          <ul>
                  {datosFiltrados.map((colectivo, index) => (
                      <li key={index}>
                          <span>{colectivo.trip_headsign}</span>
                          <span>{colectivo.route_short_name}</span>
                      </li>
                  ))}
          </ul>
        </div>
      </div>
    );
}

export default CuantoFalta;