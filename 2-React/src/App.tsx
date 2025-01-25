import PropTypes from "prop-types";
import { Counter } from "./components/counter";

interface Props {
  title: string;
  subtitle?: string;
}

const App = ({ title }: Props) => {
  return (
    <>
      <h1>{title}</h1>
      <Counter />
      {/* <h2>{subtitle}</h2> */}
    </>
  );
};

App.propTypes = {
  title: PropTypes.string.isRequired,
};

// App.defaultProps = {
//   subtitle: "Subtitle",
// };

export { App as default };
