import React from 'react';
import './Button.css';


const Button = ({routing}) => {
    return (
        <div style={{fontSize:'1.4em'}} onClick={() => routing('register')} className='Button'><a className='Button'>GET STARTED!</a></div>
    )
}

export default Button;