import React from 'react';
import './styles.css';
import bus from "../LandingPage/img/bus-loading.gif"

const LandingPage = () => {
    return (
        <div className='row textInAnimation'>
            <div className='col-md-6 col-11 mx-auto mt-5 mb-1 text-center'>
                <div className="image-container">
                    <img className='logoImg' src={bus} style={{ maxWidth: '100%', height: '100%' }} />
                </div>
                <h4>Necesito acceder a tu localizacion actual para poder mostrarte las distancias. Para eso, hace click en permitir en la ventana que muestra el navegador y esperá unos segundos.</h4>
            </div>
        </div>
    )
}

export default LandingPage;
