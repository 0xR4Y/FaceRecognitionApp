import React from 'react';
import Tilt from 'react-tilt'
import brain from './brain.png'
import './Logo.css'

const Logo = () => {
    
    return(
        <Tilt className="Tilt br2 shadow-2" options={{ max : 55 }} style={{ height: 100, width: 100 }} >
            <div className="Tilt-inner">
                <img src={brain} alt='logobrain' style={{paddingTop: '5px'}}/>
            </div>
        </Tilt>
       
    );

}


export default Logo;