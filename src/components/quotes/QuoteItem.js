import { Link } from "react-router-dom";
import classes from "./QuoteItem.module.css";

// <Link> When click, send to={`/quotes/${props.id}`}
// {props.id} => is passed by "QuoteList.js"
const QuoteItem = (props) => {
  return (
    <li className={classes.item}>
      <figure>
        <blockquote>
          <p>{props.text}</p>
        </blockquote>
        <figcaption>{props.author}</figcaption>
      </figure>
      <Link className="btn" to={`/quotes/${props.id}`}>
        View Fullscreen
      </Link>
    </li>
  );
};

export default QuoteItem;
