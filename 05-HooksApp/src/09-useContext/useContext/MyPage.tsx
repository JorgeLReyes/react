import { ChangeEvent, ReactNode, useState } from "react";
import Footer from "./Footer";
import Main from "./Main";
import Header from "./Header";
import { ThemeProvider } from "./context/ThemeContext";

const initialLanguage = "es";

export interface Translations {
  headerTitle: string;
  headerSubtitle: string;
  headerLight: string;
  headerDark: string;
  buttonLogin: string;
  buttonLogout: string;
  mainWelcome: string;
  mainHello: string;
  mainContent: string;
  footerTitle: string;
}

const translations: { [key: string]: Translations } = {
  es: {
    headerTitle: "Mi aplicación Context API",
    headerSubtitle: "Mi cabecera",
    headerLight: "Claro",
    headerDark: "Oscuro",
    buttonLogin: "Iniciar Sesión",
    buttonLogout: "Cerrar Sesión",
    mainWelcome: "Bienvenid@ invitad@",
    mainHello: "Hola Usuari@",
    mainContent: "Mi contenido principal",
    footerTitle: "Mi pié de página",
  },
  en: {
    headerTitle: "My application with Context API",
    headerSubtitle: "My header",
    headerLight: "Light",
    headerDark: "Dark",
    buttonLogin: "Login",
    buttonLogout: "Logout",
    mainWelcome: "Welcome Guest",
    mainHello: "Hello User",
    mainContent: "My main content",
    footerTitle: "My footer",
  },
};

const MyPage = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState(initialLanguage);
  const [texts, setTexts] = useState<Translations>(translations[language]);
  const [auth, setAuth] = useState(false);

  const handleLanguage = (e: ChangeEvent<HTMLSelectElement>) => {
    setLanguage(e.target.value);
    setTexts(translations[e.target.value]);
  };

  const handleAuth = () => setAuth(!auth);

  return (
    <div className="my-page">
      {children}
      <ThemeProvider>
        <Header
          auth={auth}
          language={language}
          texts={texts}
          handleLanguage={handleLanguage}
          handleAuth={handleAuth}
        />
        <Main texts={texts} auth={auth} />
        <Footer texts={texts} />
      </ThemeProvider>
    </div>
  );
};

export default MyPage;

//  return (
//     <div className="my-page">
//       <ThemeProvider>
//         <ThemeContext.Consumer>
//           {(context) => (
//             <>
//               <Header
//                 auth={auth}
//                 language={language}
//                 theme={context.theme!}
//                 texts={texts}
//                 handleTheme={context.handleTheme!}
//                 handleLanguage={handleLanguage}
//                 handleAuth={handleAuth}
//               />
//               <Main theme={context.theme!} texts={texts} auth={auth} />
//               <Footer theme={context.theme!} texts={texts} />
//             </>
//           )}
//         </ThemeContext.Consumer>
//       </ThemeProvider>
//     </div>
//   );
// };
