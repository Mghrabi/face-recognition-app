import React from 'react';
import './Rank.css'


const Rank = ({entries, name}) => {
    const Name = name.split(' ')[0];

    return (
        <div className='Ranking'>
            <p style={{padding:'0',width:'50px'}}><span>{Name}</span></p>
            <p id='entries' style={{fontSize:'1.5em'}}>score:{entries}</p>
        </div>
    )
}


export default Rank;