import React from 'react';
import './ImageDisplay.css';

const ImageDisplay = ({image, box}) => {
    return (
        <div>
            <div id='image_holder' style={{width:'350px',height:'350px', margin:'40px auto 0 auto', position: 'relative'}}>
                <img id='travel' width='100%' height='auto'  src={image}/>
                <div id='BORDER' style={{position:'absolute', top: box.topRow, left: box.leftCol, right: box.rightCol, bottom: box.bottomRow}}></div>
            </div> 
        </div>
                   
        
    )
}

export default ImageDisplay;