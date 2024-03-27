import React from 'react';
import './styles.css';
import bondi from "../LandingPage/img/bondi.jpeg"

const LandingPage = () => {
    return (
        <div className='row textInAnimation'>
            <div className='col-md-6 col-12 mx-md-auto mt-5 mb-1 text-center'>
                <img src={bondi}/>
                <h1>Hola!</h1>
                <h3>Necesito acceder a tu localizacion actual para poder mostrarte las distancias. Para eso, hace click en permitir en la ventana que muestra el navegador y esperá unos segundos.</h3>
            </div>
        </div>
    )
}

export default LandingPage;