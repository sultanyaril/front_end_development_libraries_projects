import React, { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuoteLeft } from "@fortawesome/free-solid-svg-icons";
import Button from "react-bootstrap/Button";
import { faSquareTumblr, faSquareTwitter } from "@fortawesome/free-brands-svg-icons";
import {getRandomColor, getRandomQuote} from "../shared/utils";

const QUOTES_LINK = "https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json"

const QuoteBox = ({ colorUpdater, color }) => {
    const [quote, setQuote] = React.useState(
        {
            text: "Happiness is not something readymade. It comes from your own actions.",
            author: "Dalai Lama"
        }
    );
    const[allQuotes, setAllQuotes] = React.useState([]);
    const [fade, setFade] = React.useState(true);

    useEffect(() => {
        console.log("Use Effect");
        const getAllQuotes = async () => {
            const quotesResponse = await fetch(QUOTES_LINK);
            const quotes = await quotesResponse.json();
            setAllQuotes(quotes.quotes);
            const quote = getRandomQuote(quotes.quotes);
            console.log(quote);
            setQuote(quote);
        }
        getAllQuotes().catch((err) => {console.log(err)});
    }, []);

    const updatePage = () => {
        updateQuote();
        colorUpdater(getRandomColor());
    }

    const updateQuote = (data) => {
        data = data ?? allQuotes;
        setFade(false); // Hide text before changing
        setTimeout(() => {
            setQuote(getRandomQuote(data));
            setFade(true); // Show text with fade-in
        }, 400); // Short delay to let fade-out happen first
    }

    const buttonStyle = {backgroundColor: color, borderColor: color}
    const hrefTwitter = "https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=" + quote.text + ' ' + quote.author;
    const hrefTumblr = "https://www.tumblr.com/widgets/share/tool?posttype=quote&tags=quotes,freecodecamp&caption=" + quote.author +
        "&content=" + quote.text + "&canonicalUrl=https%3A%2F%2Fwww.tumblr.com%2Fbuttons&shareSource=tumblr_share_button";

    return (
        <div id="quote-box">
            <p id="text" className={`fade-in ${fade ? "show" : ""}`}><FontAwesomeIcon icon={faQuoteLeft} size="lg"/> {quote.text}</p>
            <p id="author" className={`fade-in ${fade ? "show" : ""}`}>-{quote.author}</p>
            <div id="button-container">
                <div>
                    <a className="me-3" id="tweet-quote" href={hrefTwitter}
                       target="_blank"
                       rel="noopener noreferrer">
                        <Button style={buttonStyle}><FontAwesomeIcon icon={faSquareTwitter} size="lg"/></Button>
                    </a>
                    <a className="me-3" href={hrefTumblr}
                       target="_blank"
                       rel="noopener noreferrer">
                        <Button style={buttonStyle}><FontAwesomeIcon icon={faSquareTumblr} size="lg"/></Button>
                    </a>
                </div>
                <div>
                    <Button style={buttonStyle} id="new-quote" onClick={updatePage}>New quote</Button>
                </div>
            </div>
        </div>
    )

}

export default QuoteBox;