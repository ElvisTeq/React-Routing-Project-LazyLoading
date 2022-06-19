import QuoteList from "../components/quotes/QuoteList"; // To display JSX data

const DUMMY_QUOTES = [
  { id: "q1", author: "Elvis", text: "Learning React is cool" },
  { id: "q2", author: "Kaheno", text: "Will Learn React" },
];

// Passing quote data
const AllQuotes = () => {
  return <QuoteList quotes={DUMMY_QUOTES} />;
};

export default AllQuotes;
