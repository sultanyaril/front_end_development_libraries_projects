import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSquareTumblr, faSquareTwitter } from "@fortawesome/free-brands-svg-icons"
import {faQuoteLeft} from "@fortawesome/free-solid-svg-icons";
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from "react-bootstrap/Button";


const QUOTES_LINK = "https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json"


function getRandomColor(){
  return "hsl(" + 360 * Math.random() + ',' +
      '50%,' +
      '65%)'
}

const QuoteBox = (props) => {
  const [state, setState] = React.useState(
      {
        text: "Happiness is not something readymade. It comes from your own actions.",
        author: "Dalai Lama"
      }
  );

  const[allQuotes, setAllQuotes] = React.useState([]);
  const [fade, setFade] = React.useState(false);

  React.useEffect(() => {
    fetch(QUOTES_LINK)
        .then((response) => response.json())
        .then((data) => {
          setAllQuotes(data.quotes);
          updateQuote(data.quotes);
        })
        .catch((error) => console.error("Error fetching quotes:", error));
  }, []);

  const updatePage = () => {
    updateQuote();
    props.colorUpdater();
  }

  const updateQuote = (data = allQuotes) => {
    setFade(false); // Hide text before changing
    setTimeout(() => {
      const rand_quote_id = Math.floor(Math.random() * data.length);
      setState({
        text: data[rand_quote_id]?.quote || "",
        author: data[rand_quote_id]?.author || "",
      });
      setFade(true); // Show text with fade-in
    }, 400); // Short delay to let fade-out happen first
  };


  const buttonStyle = {backgroundColor: props.color, borderColor: props.color}

  return (
      <div id="quote-box">
        <p id="text" className={`fade-in ${fade ? "show" : ""}`}><FontAwesomeIcon icon={faQuoteLeft} size="lg"/> {state.text}</p>
        <p id="author" className={`fade-in ${fade ? "show" : ""}`}>-{state.author}</p>
        <div id="button-container">
          <div>
            <a className="me-3" id="tweet-quote" href={"https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=" + state.text + ' ' + state.author}
               target="_blank"
               rel="noopener noreferrer">
              <Button style={buttonStyle}><FontAwesomeIcon icon={faSquareTwitter} /></Button>
            </a>
            <a className="me-3" href={"https://www.tumblr.com/widgets/share/tool?posttype=quote&tags=quotes,freecodecamp&caption=" + state.author +
                "&content=" + state.text + "&canonicalUrl=https%3A%2F%2Fwww.tumblr.com%2Fbuttons&shareSource=tumblr_share_button"}
               target="_blank"
               rel="noopener noreferrer">
              <Button style={buttonStyle}><FontAwesomeIcon icon={faSquareTumblr} /></Button>
            </a>
          </div>
          <div>
            <Button style={buttonStyle} id="new-quote" onClick={updatePage}>New quote</Button>
          </div>
        </div>
      </div>
  )

}


const App = () => {
  const [state, setState] = React.useState({
    color: getRandomColor()
  })

  const updateColor = () => {
    setState({
      color: getRandomColor()
    })
  }



  const app_style = {
    backgroundColor: state.color,
    color: state.color
  }
  return (
      <div id="app" style={app_style}>
        <QuoteBox colorUpdater={updateColor} color={state.color} />
        <div id="signature">by sultanyaril</div>
      </div>
  );

}

export default App;