import { ChangeEvent, useContext } from "react";
import { Translations } from "./MyPage";
import ThemeContext from "./context/ThemeContext";

interface Props {
  language: string;
  texts: Translations;
  auth: boolean;
  handleLanguage: (e: ChangeEvent<HTMLSelectElement>) => void;
  handleAuth: () => void;
}

const Header = ({
  auth,
  language,
  texts,
  handleAuth,
  handleLanguage,
}: Props) => {
  const { theme, handleTheme } = useContext(ThemeContext);

  return (
    <header className={theme}>
      <h2>{texts.headerTitle}</h2>
      <h3>{texts.headerSubtitle}</h3>
      <select name="language" value={language} onChange={handleLanguage}>
        <option value="es">ES</option>
        <option value="en">EN</option>
      </select>
      <label>
        <input
          type="radio"
          name="theme"
          value="light"
          onChange={handleTheme}
          checked={theme === "light"}
        />
        {texts.headerLight}
      </label>
      <label>
        <input
          type="radio"
          name="theme"
          value="dark"
          onChange={handleTheme}
          checked={theme === "dark"}
        />
        {texts.headerDark}
      </label>
      <button onClick={handleAuth}>
        {auth ? texts.buttonLogout : texts.buttonLogin}
      </button>
    </header>
  );
};

export default Header;
