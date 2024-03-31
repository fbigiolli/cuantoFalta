import React, { useState, useEffect } from 'react';

// utils import
import { fetchFromAPI , extractArrayWithAllRoutesShortNames } from '../utils';

// bootstrap imports
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';

// components import
import LandingPage from '../LandingPage/LandingPage';
import BondiAccordion from '../BondiAccordion/BondiAccordion';
import About from '../About/About';
import LocationAlert from '../LocationAlert/LocationAlert';

// styles import
import './styles.css';

//images import
import loadedBus from '../CuantoFalta/images/loadedBus.jpg'

// API Credentials
const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;
const CLIENT_SECRET = process.env.REACT_APP_CLIENT_SECRET;

const CuantoFalta = () => {
  const [datosFiltrados, setDatosFiltrados] = useState([]);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [loading, setLoading] = useState(true);
  const [locationObtained, setLocationObtained] = useState(false);

  //Hook que se encarga de obtener la localizacion del usuario al abrir la app.
  useEffect(() => {
    const getLocation = async () => {

      if (navigator.geolocation) {
        const success = (position) => {
          setLatitude(position.coords.latitude);
          setLongitude(position.coords.longitude);
          setLoading(false);
          setLocationObtained(true);
        };

        const error = (error) => {
          console.error('Error getting geolocation:', error);
          setLoading(false);
        };

        const options = {
          enableHighAccuracy: true,
          timeout: Infinity,
          maximumAge: 0,
        };

        navigator.geolocation.getCurrentPosition(success, error, options);
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

    console.log(datosFiltradosActualizados);
  };

  // Se muestra esto hasta que se obtenga la localizacion actual del usuario.
  if (loading) {
    return (
      <LandingPage/>
    )
  }

  // Una vez que se conoce la localizacion, se muestra la app normalmente.
  return (
    <div className='container'>
      
      <div className='row loadedPageAnimation'>
        <div className='col-md-6 col-11 mx-auto'>
          <LocationAlert locationObtained={locationObtained}/>
        </div>
      </div>

      <div className='row mt-5 loadedPageAnimation'>
        <div className='col-md-6 col-11 mx-auto mt-5 mb-1 text-center'>
          <img className='logoImg' alt='busImg' src={loadedBus} style={{ maxWidth: '100%', height: '100%' }} />
        </div>
      </div>

      <div className='row'>
        <div className='loadedPageAnimation col-md-6 col-11 mx-auto mt-5 text-center'>
          <h1 >Bienvenido!</h1>
          <h4>Escribi abajo el numero de la linea que queres buscar y apreta el boton para saber cuanto falta.</h4>
        </div>
      </div>

      <div className='loadedPageAnimation row mt-5'>
        <div className='col-md-6 col-11 mx-auto'>
          <Form onSubmit={handleSubmit}>
            <InputGroup className="mb-3">
              <Form.Control
                size='lg'
                placeholder="Por ejemplo, 60"
                aria-label="El numero de la linea que queres buscar, por ejemplo, 60."
                aria-describedby="basic-addon2"
                name='linea'
              />
              <Button variant="btn btn-dark" id="button-addon2" type='submit'>
                Cuanto Falta?
              </Button>
            </InputGroup>
          </Form>
        </div>
      </div>

      <div className='row'>
        <div className='col-md-6 col-11 mx-auto'>
          <BondiAccordion latitude={latitude} longitude={longitude} datosFiltrados={datosFiltrados} shortNameBondis={extractArrayWithAllRoutesShortNames(datosFiltrados)} />
        </div>
      </div>

      <div className='row'>
        <div className='col-md-6 col-11 mx-auto'>
          <div className='text-start mt-5'>
            <About />
          </div>
        </div>
      </div>

    </div>
  );

}

export default CuantoFalta;