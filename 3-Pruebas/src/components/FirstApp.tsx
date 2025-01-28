import PropTypes from "prop-types";

interface Props {
  title: string;
  subTitle: string;
  name: string;
}

const FirstApp = ({ title, subTitle, name }: Props) => {
  return (
    <div>
      <h1 data-testid="test-title">{title}</h1>
      <h2>{subTitle}</h2>
      <h2>{subTitle}</h2>
      <p>Hola, {name}!</p>
    </div>
  );
};

// FirstApp.defaultProps = {
//   title: "Hello World",
//   subTitle: "Welcome to my app",
//   // name: "Ingrid",
// };

FirstApp.propTypes = {
  title: PropTypes.string.isRequired,
  subTitle: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

export default FirstApp;
