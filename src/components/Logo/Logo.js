import React from 'react';
import Tilt from 'react-tilt';
import './Logo.css';
// import person from './person.png';
import face from './face.png';
import face_recog from './face-recognition.png';
import blue_face from './facial-recognition.png';



const Logo = () => {
    return (
        <Tilt className="Tilt fix tofix" options={{ max : 120 }} style={{ height: 120, width: 120 }} >
        <div className="Tilt-inner"><img className='row' src={blue_face} alt='here'/></div>
        </Tilt>
    )
}

export default Logo;