
import React, {Component} from "react"; 
import logo from './logo.svg';
import './App.css';
import ClipLoader from "react-spinners/ClipLoader";
import GiphyGifs from './data/giphyGifs'

let styles = {
  headerText: {
    fontSize: 30,
    color: 'black',
    marginLeft: 25,
  },
  dadJokeText: {
    fontSize: 40,
    marginHorizontal: 20,
  },
  giphyLink: {
    fontSize:15,
    marginBottom: 50,
  },
  getDadJokeButton: {
    marginTop: 225,
    fontSize:50,
    height: 75,
    borderRadius: 25/2,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f2f4f8'
  },

  dadJokeContainer: {
    height: 200
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
    // this.getDadJoke()
    this.setState({giphyGifs: GiphyGifs.gifs})
  }

  getDadJoke() {

    this.clearDadJoke()

  }

  processDadJokeRequest(){
    fetch('http://localhost:8000/getdadjoke') //Initiate GET request
    .then(
      //Parse recieved to JSON
      res => res.json()
    ) 
    .then((data) => {
      
      var randomGifInt = Math.floor(Math.random() * this.state.giphyGifs.length)
      var gifData = this.state.giphyGifs[randomGifInt]
      console.log(gifData)
      //set JSON data 
      this.setState({jokeData: data, isLoading: false, currentGifData: gifData})
    })
    .catch(
      // console.log('ERROR')
    )
  }

  clearDadJoke(){
    this.setState({jokeData: {}, isLoading: true}, () => this.processDadJokeRequest())
  }

  render(){

    return (
      <div className="App">

        <header className='App-header'> 

          <h1 style={styles.headerText}>Dad Joke Generator</h1>

        </header>

        <body className="App-body" >

        
          {this.state.isLoading ? 

              <ClipLoader color={"#ffffff"} loading={true} size={25} />
            :
              <div style={styles.dadJokeContainer}>
                <p style={styles.dadJokeText}> 
                  {this.state.jokeData.joke} 
                </p>

                <iframe src={this.state.currentGifData.src} width="100%" height="100%" frameBorder="0"></iframe>

                {this.state.currentGifData.href &&
                  <a style={styles.giphyLink} href={this.state.currentGifData.href}>
                    via GIPHY
                  </a>
                }

              </div>
          }

          

          <button  style={styles.getDadJokeButton} onClick={() => this.getDadJoke()}>
            Get Dad Joke
          </button>

          

        </body>

      </div>
    );
  }
}

export default App;


// fetch('http://jsonplaceholder.typicode.com/users')
//         .then(res => res.json())
//         .then((data) => {
//           this.setState({ contacts: data })
//         })
//         .catch(console.log)