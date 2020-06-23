import React, { Component } from 'react';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm.js';
import FaceRecognition from './components/FaceRecognition/FaceRecognition.js';
import Rank from './components/Rank/Rank';
import SignIn from './components/SignIn/SignIn';
import Register from './components/Register/Register';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';

import './App.css';

const app = new Clarifai.App({
  apiKey: '8e92e9b6f6414841a8c6944d976e5cbd'
});


class App extends Component {

  constructor(){
    super();
    this.state = {
      input:' ',
      imageUrl:' ',
      box:{},
      route: 'signIn',
      isSignedIn: false
    }
  }

  onInputChange = (event) => {
    this.setState({input:event.target.value});
  }

  calculateFaceLocation = (data) => {

    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    console.log(width, height);
    console.log(data);

    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    

    return{
      leftCol: clarifaiFace.left_col * width,
      topRow:  clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)
    }
  }

  displayFaceBox = (box) => {
    this.setState( {box:box} );
  }

  onButtonSubmit = () =>{

    this.setState({imageUrl:this.state.input});

    app.models
    .predict( 
      Clarifai.FACE_DETECT_MODEL,
    //URL
      this.state.input)
      .then( response => this.displayFaceBox(this.calculateFaceLocation(response)))
      .catch(err => console.log(err));
  }

  onRouteChange = (route) => {
    if(route === 'signOut'){
      this.setState({isSignedIn:false})
    } else if( route === 'home'){
      this.setState({isSignedIn:true})

    }
    this.setState({route: route});
  }
  
  render(){

    const { isSignedIn, imageUrl,route,box } = this.state;

    return ( 
      <div className="App">
        <Particles className='particles' 
              params={{
            		particles: {
                  number:{
                    value:30,
                    density:{
                      enable: true,
                      value_area: 200,
                    }
                  }
            		}
            	}}     
        />

    <Navigation onRouteChange = { this.onRouteChange } isSignedIn = { isSignedIn} />
        { 
           route === 'home' 
           ? <div> 
           <Logo />
           <Rank />
           <ImageLinkForm 
           onInputChange={this.onInputChange}
           onButtonSubmit={this.onButtonSubmit}
           />
           <FaceRecognition box={box} imageUrl={imageUrl}/>
           </div>
           :( route === 'signIn'
            ? <SignIn onRouteChange = { this.onRouteChange } />
            : <Register onRouteChange = { this.onRouteChange } />
            
           )
          
        }
      
      </div>
    );
  }
}

export default App;
