import React,{Component} from 'react';
import './App.css';
import Navigation from '../components/Navigation/Navigation.js';
import Text from '../components/Text/Text.js';
import Logo from '../components/Logo/Logo.js';
import InputUrl from '../components/InputUrl/InputUrl.js';
import Button from '../components/Button/Button.js';
import Rank from '../components/Rank/Rank.js';
import SignIn from '../components/SignIn/SignIn.js';
import Register from '../components/Register/Register.js';
import ImageDisplay from '../components/ImageDisplay/ImageDisplay.js';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';
import 'tachyons';
import Typewriter from 'typewriter-effect';
 



const particlesOption = {
  particles: {
    number:{
      value:50,
      density: {
        enable:true,
        value_area:800
      }
    }
  }
}



const app = new Clarifai.App({
 apiKey: 'cc8e720423124d79a91ad5c561a1385a'
});

class App extends Component {

  constructor(){
    super()
    this.state = {
      input:'',
      imageUrl:'',
      box:{},
      situation:'home',

      user: {
        id:'',
        name:'',
        email:'',
        password:'',
        entries:'',
        joined:''
      }
    }
  }


  

  onInputChange = (event) => {
    this.setState({input:event.target.value})
    // console.log(event.target.value)
  }


  calculatingBoxPosition = (data) => {
    const image = document.querySelector('#image_holder');
    // console.log(image, parseInt(image.style.width)
    const width = parseInt(image.style.width);
    const height = parseInt(image.style.height);
    console.log(width, height);


    return {
      topRow:data.top_row * height,
      bottomRow:height - data.bottom_row * height,
      leftCol:width * data.left_col,
      rightCol:width - width * data.right_col
    }
  }


  gettingUserInfo = (user) => {
      this.setState({
        user:{
          id:user.id,
          name:user.name,
          email:user.email,
          entries:user.entries,
          joined:user.joined
        }
      })
      console.log(this.state);
  }

  forHome = () => {
    this.setState({
      imageUrl:'',
      input:''
    })
  }

  onSubmit = () => {

    this.setState({imageUrl:this.state.input})

    app.models.predict(
      Clarifai.FACE_DETECT_MODEL,
      this.state.input
      )
      .then((response) => {
        if (response) {
          fetch('http://localhost:3001/image', {
            method:'put',
            headers:{'Content-Type':'application/json'}, 
            body:JSON.stringify({
              id:this.state.user.id
            })
            })
            .then(response => response.json())
            .then(count => {
              this.setState(Object.assign(this.state.user, {entries:count}))
            })
            .catch(console.log)
        }
        const data = response.outputs[0].data.regions[0].region_info.bounding_box;
        // console.log(data)

        this.setState({box: this.calculatingBoxPosition(data)})
        console.log(this.state.box);
        window.scrollTo(0,document.body.scrollHeight);
      })
      .catch(error => {
        console.log(error);
      })
  }

  
  routing = (NEW) => {
    this.setState({situation:NEW})
  }


  
  render(){
    
    return (
      <div className="App">
        <Particles className='particles' 
          parms={particlesOption}
        />
        
        {this.state.situation === 'home'?
        <div>
          <Text forHome={this.forHome}/>
          {/* <Typewriter
              onInit={(typewriter) => {
              typewriter.typeString('my name is ahmed...')
              .pauseFor(1500)
                .typeString('(sorry)')
                .deleteChars(16)
                .typeString(' maghrabi :)')
                .pauseFor(1000)
                .callFunction(() => {
                  console.log('All strings were deleted');
                })
                .start();
            }}
/> */}
          <Button routing={this.routing}/>
        </div>
        :
        (this.state.situation === 'sign in'?
        <div>
          <Navigation situation={this.state.situation} routing={this.routing}/>
          <SignIn routing={this.routing} gettingUserInfo={this.gettingUserInfo}/>
        </div>
        :
        (this.state.situation === 'active'?
        <div>
          <Navigation situation={this.state.situation} routing={this.routing} forHome={this.forHome}/>
          <Logo/>
          <Rank entries={this.state.user.entries} name={this.state.user.name}/>
          <InputUrl onInputChange={this.onInputChange} onSubmit={this.onSubmit}/>
          <ImageDisplay image={this.state.imageUrl} box={this.state.box}/>
        </div>
        :
        <div>
          <Navigation situation={this.state.situation} routing={this.routing}/>
          <Register routing={this.routing} gettingUserInfo={this.gettingUserInfo}/>
        </div>
        
        )
        )
        }


      </div>
    );
  }
    

  }

  

export default App;
