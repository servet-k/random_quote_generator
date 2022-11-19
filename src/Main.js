import { useEffect, useState } from "react";
const Main = () => {
  const [quote, setQuote] = useState({});
  const [data, setData] = useState([{}]);
  const url = "https://type.fit/api/quotes";

  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((last) =>
        setData(
          last.map((item) => {
            return { text: item.text, author: item.author };
          })
        )
      )
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    let temp = data[0];

    setQuote(temp);
  }, [data]);

  const getNewQuote = () => {
    const randomNum = Math.floor(Math.random() * (data.length - 1));
    setQuote(data[randomNum]);
  };

  let href =
    "https://twitter.com/intent/tweet?text=" + quote.text + "//" + quote.author;
  return (
    <div className="quote-container">
      <div id="quote-box">
        <p id="text">{quote.text}</p>
        <p id="author">{quote.author}</p>
        <button id="new-quote" onClick={getNewQuote}>
          New Quote
        </button>
        <a href={href} target="_top" id="tweet-quote">
          Share on twitter
        </a>
      </div>
    </div>
  );
};

export default Main;
