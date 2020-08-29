import React from 'react';
import './Rank.css'


const Rank = ({entries, name}) => {
    return (
        <div className='Ranking'>
            <p style={{marginRight:'10px'}}><span>{name}</span> : YOUR SCORE IS...</p>
            <p id='entries' style={{fontSize:'1.5em'}}>{entries}</p>
        </div>
    )
}


export default Rank;