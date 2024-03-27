import React, { useState , useEffect } from 'react';

// utils import
import {fetchFromAPI , distanceBetweenTwoPoints} from '../utils';

// components import
import LandingPage from '../LandingPage/LandingPage';

// API Credentials
const CLIENT_ID = 'a2a9c582983b4d4685ba50ca65048398';
const CLIENT_SECRET = '45f9C578295D425eB4fEeefdAa14c0Ab'; 

const CuantoFalta = () => {
  const [linea, setLinea] = useState('');
  const [datosFiltrados, setDatosFiltrados] = useState([]);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [loading, setLoading] = useState(true);

  // Hook que se encarga de obtener la localizacion del usuario al abrir la app.
  useEffect(() => {
    const getLocation = async () => {
      
      if (navigator.geolocation) {
        const success = (position) => {
          setLatitude(position.coords.latitude);
          setLongitude(position.coords.longitude);
          setLoading(false);
        };

        const error = (error) => {
          console.error('Error getting geolocation:', error);
          setLoading(false);
        };

        const options = {enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0,};

        navigator.geolocation.getCurrentPosition(success,error,options);
      } else {
        console.error('Geolocation is not supported by this browser.');
        setLoading(false); 
      }
    };

    getLocation();
  }, []);

  // Se encarga de fetchear luego del input del usuario.
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

  // Se muestra esto hasta que se obtenga la localizacion actual del usuario.
  if(loading){
    return(
      <LandingPage/>
    )
  }

  // Una vez que se conoce la localizacion, se muestra la app normalmente.
  return (
      <div>
        <form onSubmit={handleSubmit} className='mt-4'>
          <input
            type="text"
            name="linea"
            placeholder="Ingrese un parámetro"
          />
          <button className='btn btn-primary' type="submit">Enviar</button>
        </form>
        <div>
          <h1>{ linea }</h1>
          <ul>
                  {datosFiltrados.map((colectivo, index) => (
                      <li key={index}>
                          <span>{colectivo.trip_headsign} </span>
                          <span>{colectivo.route_short_name}</span>
                          <span> a {distanceBetweenTwoPoints(colectivo.latitude,colectivo.longitude,latitude,longitude)} km</span>
                      </li>
                  ))}
          </ul>
        </div>
      </div>
    );
}

export default CuantoFalta;