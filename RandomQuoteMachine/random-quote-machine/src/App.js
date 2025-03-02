import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSquareTumblr, faSquareTwitter } from "@fortawesome/free-brands-svg-icons"
import Button from "react-bootstrap/Button";


const QUOTES_LINK = "https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json"

const quotebox_style = {
  width: "40%",
  minHeight: "40%",
  backgroundColor: "white",
  padding: 20,
  borderRadius: 5
}

const buttons_div_style = {
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
}

function getRandomColor(){
  return "hsl(" + 360 * Math.random() + ',' +
      '90%,' +
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

  const updateQuote = (data=allQuotes) => {
    const rand_quote_id = Math.floor(Math.random() * (data.length));
    setState({
      text: data[rand_quote_id] ? data[rand_quote_id].quote : "",
      author: data[rand_quote_id] ? data[rand_quote_id].author : ""
    })
  }


  return (
      <div id="quote-box" style={quotebox_style}>
        <p id="text">"{state.text}</p>
        <p id="author">-{state.author}</p>
        <div style={buttons_div_style}>
          <div>
            <a id="tweet-quote" href={"https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=" + state.text + ' ' + state.author} target="_blank">
              <Button variant="secondary"><FontAwesomeIcon icon={faSquareTwitter} /></Button>
            </a>
            <a href={"https://www.tumblr.com/widgets/share/tool?posttype=quote&tags=quotes,freecodecamp&caption=" + state.author +
                "&content=" + state.text + "&canonicalUrl=https%3A%2F%2Fwww.tumblr.com%2Fbuttons&shareSource=tumblr_share_button"} target="_blank">
              <Button variant="secondary"><FontAwesomeIcon icon={faSquareTumblr} /></Button>
            </a>
          </div>
          <div>
            <Button id="new-quote" variant="primary" onClick={updatePage}>New quote</Button>
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
    color: state.color,
    width: "100%",
    minHeight: "100vh",
    margin: 0,
    padding: 0,
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  };

  console.log(app_style);
  return (
      <div style={app_style}>
        <QuoteBox colorUpdater = {updateColor}/>
      </div>
  )

}

export default App;