import { Fragment } from "react";
import { useHistory, useLocation } from "react-router-dom";

import QuoteItem from "./QuoteItem";
import classes from "./QuoteList.module.css";

// Receive (Quotes, true/false)
const sortQuotes = (quotes, ascending) => {
  return quotes.sort((quoteA, quoteB) => {
    if (ascending) {
      return quoteA.id > quoteB.id ? 1 : -1;
    } else {
      return quoteA.id < quoteB.id ? 1 : -1;
    }
  });
};

const QuoteList = (props) => {
  const history = useHistory(); // Make Changes to URL
  const location = useLocation(); // Get current Router data/details

  const queryParams = new URLSearchParams(location.search); // Get Params "?anyThing"

  const isSortingAscending = queryParams.get("sort") === "asc"; // True/False

  const sortedQuotes = sortQuotes(props.quotes, isSortingAscending);

  const changeSortingHandler = () => {
    // ${location.pathname} => "/quotes"

    // // Alternative way
    // history.push(
    //   `${location.pathname}?sort=${isSortingAscending ? "desc" : "asc"}`
    // );

    history.push({
      pathname: location.pathname,
      search: `?sort=${isSortingAscending ? "desc" : "asc"}`,
    });
  };

  return (
    <Fragment>
      <div className={classes.sorting}>
        <button onClick={changeSortingHandler}>
          Sort {isSortingAscending ? "Descending" : "Ascending"}
        </button>
      </div>
      <ul className={classes.list}>
        {sortedQuotes.map((quote) => (
          <QuoteItem
            key={quote.id}
            id={quote.id}
            author={quote.author}
            text={quote.text}
          />
        ))}
      </ul>
    </Fragment>
  );
};

export default QuoteList;
