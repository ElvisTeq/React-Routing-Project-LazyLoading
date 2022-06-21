import { Fragment } from "react";
import { useParams, Route, Link, useRouteMatch } from "react-router-dom";
import Comments from "../components/comments/Comments";
import HighlightedQuote from "../components/quotes/HighlightedQuote";

const DUMMY_QUOTES = [
  { id: "q1", author: "Elvis", text: "Learning React is cool" },
  { id: "q2", author: "Kaheno", text: "Will Learn React" },
];

const QuoteDetail = () => {
  const match = useRouteMatch(); // Get Overall URL Data
  const params = useParams(); // Get Current URL Data

  console.log(match);

  const quote = DUMMY_QUOTES.find((quote) => quote.id === params.quoteId); // Find quote by id

  if (!quote) {
    return <p>No quote found</p>;
  }

  // ${match.path} => "/quotes/:quoteId"
  // ${match.url} => "/quotes/ParamValue"
  return (
    <Fragment>
      <HighlightedQuote text={quote.text} author={quote.author} />
      <Route path={`${match.path}`} exact>
        <div className="centered">
          <Link className="btn--flat" to={`${match.url}/comments`}>
            Load Comments
          </Link>
        </div>
      </Route>
      <Route path={`${match.path}/comments`}>
        <Comments />
      </Route>
    </Fragment>
  );
};

export default QuoteDetail;
