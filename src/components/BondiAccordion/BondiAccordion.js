import React from 'react';
import Accordion from 'react-bootstrap/Accordion';

import { distanceBetweenTwoPoints } from '../utils';

function BondiAccordion(props) {
  return (
    <Accordion flush>
      {props.shortNameBondis.map((shortName, index) => (
        <Accordion.Item eventKey={index.toString()} key={index}>
          <Accordion.Header>{shortName}</Accordion.Header>
          <Accordion.Body>
            {props.datosFiltrados
              .filter(colectivo => colectivo.route_short_name === shortName) // En el body del acordeon solo se muestran aquellos que coinciden con el route_short_name 
              .sort((a, b) => {
                // Se ordenan los colectivos para que aparezcan de menor a mayor segun la distancia a la posicion actual.
                const distanciaA = distanceBetweenTwoPoints(a.latitude, a.longitude, props.latitude, props.longitude);
                const distanciaB = distanceBetweenTwoPoints(b.latitude, b.longitude, props.latitude, props.longitude);
                return distanciaA - distanciaB;
              })
              // Finalmente, se muestran en el body del acordeon.
              .map((colectivo, index) => (
                <li key={index}>
                  <span>{colectivo.trip_headsign}</span>
                  <span>{colectivo.route_short_name}</span>
                  <span> a {distanceBetweenTwoPoints(colectivo.latitude, colectivo.longitude, props.latitude, props.longitude)} km</span>
                </li>
              ))
            }

          </Accordion.Body>
        </Accordion.Item>
      ))}
    </Accordion>

  );
}

export default BondiAccordion;
