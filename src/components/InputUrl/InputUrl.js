import React from 'react';
import './InputUrl.css';


const InputUrl = ({onInputChange, onSubmit}) => {
    return (
        <div className='InputUrl'>
            <p style={{color:'#fff',fontSize:'1.5em'}}>
            <span style={{color:'orange',letterSpacing:'15px',marginLeft:'-40px'}}>DETECTING</span> faces in your pictures, enter a the image URL and GIVE IT A TRY!
            </p>
            <div  className='center'>
                <input id='image_input' style={{width:'70%', color:'black'}} type='text' onChange={onInputChange}/>
                <button onClick={() => {
                    onSubmit();
                    const image_input = document.getElementById('image_input').value;
                    document.getElementById('BORDER').style.display = 'flex';
                    if (image_input){
                        document.getElementById('image_holder').style.display = 'block';
                    }
                    document.getElementById('image_input').value = '';
                }} style={{width:'30%'}}>Detect</button>
            </div>
        </div>
        
    )
}


export default InputUrl;