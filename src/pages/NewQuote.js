import { useHistory } from "react-router-dom"; // To redirect, navigate Route to another location
import QuoteForm from "../components/quotes/QuoteForm";

const NewQuote = () => {
  const history = useHistory();

  const addQuoteHandler = (quoteData) => {
    console.log(quoteData);

    history.push("/quotes"); // Redirecting Route
    // .push => erases history and creates a new Route with changes (No go back button)
    // .replace => replace history Route with changes (Can use go back button)
  };

  return <QuoteForm onAddQuote={addQuoteHandler} />;
};

export default NewQuote;
