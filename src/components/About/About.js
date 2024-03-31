import React from "react";
import Accordion from 'react-bootstrap/Accordion';

function About() {
    return(
        <Accordion flush>
        <Accordion.Item eventKey="0">
          <Accordion.Header>Como funciona?</Accordion.Header>
          <Accordion.Body>
            <p>En primer lugar, Cuanto Falta? obtiene tu localización actual. Después, hace una request a una API del gobierno de la ciudad para obtener la localización de todos los colectivos que se encuentran circulando al momento del pedido. Luego filtra la lista de colectivos para quedarse con los de la línea que querés averiguar, y finalmente calcula la distancia entre tu ubicación y el colectivo usando el método Haversine Distance.</p>
            <p>Este método calcula la distancia entre dos puntos de un globo en base a la longitud y latitud de ambos. En consecuencia de eso, la distancia que se muestra no contempla el recorrido que tiene que hacer el colectivo para llegar hasta tu ubicación, si no que es la distancia literal entre vos y el colectivo. Es como si el colectivo fuera volando hasta donde estás.</p>
          </Accordion.Body>
        </Accordion.Item>
        </Accordion>
    )
}

export default About;