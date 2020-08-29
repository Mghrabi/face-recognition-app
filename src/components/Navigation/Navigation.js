import React from 'react';
import './Navigation.css';

const Navigation = ({situation, routing, forHome}) => {
        if(situation ==='sign in' || situation ==='home'){
            return (
                <nav className=''>
                    <a onClick={() => routing('register')}>SIGN UP</a>
                </nav>
            )
        }
        else if(situation==='active'){
            return(
                <nav className=''>
                    <a onClick={() => {
                        routing('home');forHome();
                        } }>SIGN OUT</a>
                </nav>
            )
        }
        else if (situation==='register'){
            return (
                <nav className=''>
                    <a onClick={() => routing('sign in')}>SIGN IN</a>
                </nav>
            )
        }

    
}
        
    


export default Navigation;