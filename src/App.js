
import React, {Component} from "react"; 
import ClipLoader from "react-spinners/ClipLoader";
import GiphyGifs from './data/giphyGifs'
import {getDadJoke} from './services/CanHazDadJokeAPI'
import { Row, Container } from 'react-bootstrap';
import {ReactComponent as DadJokesLogo} from './images/DadJokesLogo.svg'
import {ReactComponent as MiddleBG} from './images/DadJokesAppMiddle.svg'
import {ReactComponent as JokeBoxBG} from './images/DadJokesAppJokeBox.svg'
import DadJokeLogoPNG from './images/DadJokesLogo.png'

let styles = {
  appContainer: {
    backgroundColor: '#0071BC',
    height: '100vh',
    width: '100vw',
    alignItems: 'center',
    justifyContent: 'center',
    display: 'flex',
    flexDirection: 'column',
  },
  dadJokesLogo: {
    marginLeft: 50,
    marginRight: 50,
    marginTop: 20,
    width: '70vh'
  },
  bodyContainer: {
    backgroundColor: 'rgba(52, 52, 52, 0.0)',
    width: '70vh',
    height: '100vh',
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    position: 'absolute'
  },
  dadJokeContainer: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',

  },
  middleBG: {
    height: '100vh',
    alignSelf: 'center'
  },
  dadJokeTextRow: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
    display: 'flex'
  },
  dadJokeText: {
    textAlign: 'center',
    fontSize: '3vh',
    alignSelf: 'center',
    position: 'absolute',
    width: '60vh'
  },
  jokeBoxBG: {
    marginLeft: 50,
    marginRight: 50,
    flex: 2,
    display: 'flex',
    width: '65vh',
    alignSelf: 'center',
  },
  gifFrame: {
    flex:2,
  },
  giphyLink: {
    fontSize:15,
    marginBottom: 50,
  },
  getDadJokeButton: {
    fontSize:25,
    height: 40,
    width: "73.375vh",
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: '#F7931E',
    borderWidth: 0,
  },
  credits: {
    position: 'absolute',
    right: 15,
    fontSize: '1.5vw',
    textAlign: 'center',
    bottom: 0,
    color: '#E6E6E6'
  }
}

class App extends Component {
  constructor(props) {
      super(props);
      this.state = {
        jokeData: {},
        isLoading: false,
        giphyGifs: [],
        currentGifData: {}
      };

  }


  componentDidMount() {
    //Set Gif data from Gipht data object and then load in initial Dad Joke
    this.setState({giphyGifs: GiphyGifs.gifs}, () => this.getDadJoke())
  }

  getDadJoke() {
    //Clear current Dad joke before getting new dad joke
    this.clearDadJoke()
  }

  async processDadJokeRequest(){

    //Get dad Joke
    var dadJokeData = await getDadJoke()

    //Choose a random gif to show when displaying dad joke
    var randomGifInt = Math.floor(Math.random() * this.state.giphyGifs.length)
    var gifData = this.state.giphyGifs[randomGifInt]

    //Set joke data, that request is no longer loading, and the currert random gif
    this.setState({jokeData: dadJokeData.data, isLoading: false, currentGifData: gifData})

  }

  clearDadJoke(){
    //After clearing Dad Joke data, begin processsing of dad joke request
    this.setState({jokeData: {}, isLoading: true}, () => this.processDadJokeRequest())
  }

  render(){

    return (
      <Container style={styles.appContainer}>

        <MiddleBG style={styles.middleBG}/>

        <Container style={styles.bodyContainer} >

          <img src={DadJokeLogoPNG} style={styles.dadJokesLogo} alt="Logo" />

          {this.state.isLoading ? 

              <Container style={styles.dadJokeContainer}>
                <ClipLoader color={"#ffffff"} loading={true} size={25} />
              </Container>
            :
              <Container style={styles.dadJokeContainer}>
                <Row style={styles.dadJokeTextRow}>

                  <JokeBoxBG style={styles.jokeBoxBG}/>

                  <div style={styles.dadJokeText}>
                    {this.state.jokeData.joke}
                  </div>

                </Row>

                <Row style={styles.gifFrame}>
                  <iframe src={this.state.currentGifData.src} width="100%" height="100%" frameBorder="0"></iframe>
                </Row>

              </Container>
          }

          <button  style={styles.getDadJokeButton} onClick={() => this.getDadJoke()}>
            Next Joke
          </button>

           </Container>
          
          <Container style={styles.credits}>
            <Row>
            Visual Design by
            </Row>
            <Row>
            <a href="https://www.linkedin.com/in/kyle-smith-67393b80/">
              Kyle Smith
            </a>
            </Row>
            
          </Container>

      </Container>
    );
  }
}

export default App;