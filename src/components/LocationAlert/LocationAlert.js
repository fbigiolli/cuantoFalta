import Alert from 'react-bootstrap/Alert';

function LocationAlert(props) {

  if (props.locationObtained === false) {
    return (
      <Alert variant="danger" dismissible className='mt-5'>
        <Alert.Heading>Error obteniendo localizacion</Alert.Heading>
        <p>
          Hubo un error al obtener tu localizacion. Esto puede pasar porque
          tu navegador/dispositivo no soporta geolocalizacion, o porque no 
          lo autorizaste. Se mostraran los colectivos sin las distancias.
        </p>
      </Alert>
    );
  }
}

export default LocationAlert;