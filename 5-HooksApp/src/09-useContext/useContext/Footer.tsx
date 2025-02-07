import { useContext } from "react";
import { Translations } from "./MyPage";
import ThemeContext from "./context/ThemeContext";

const Footer = ({ texts }: { texts: Translations }) => {
  const { theme } = useContext(ThemeContext);
  return (
    <footer className={theme}>
      <p>{texts.footerTitle}</p>
    </footer>
  );
};

export default Footer;
