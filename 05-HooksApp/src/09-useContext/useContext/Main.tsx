import { useContext } from "react";
import { Translations } from "./MyPage";
import ThemeContext from "./context/ThemeContext";

const Main = ({ texts, auth }: { texts: Translations; auth: boolean }) => {
  const { theme } = useContext(ThemeContext);

  return (
    <main className={theme}>
      {auth ? <p>{texts.mainHello}</p> : <p>{texts.mainWelcome}</p>}
      <h2>{texts.mainContent}</h2>
    </main>
  );
};

export default Main;
