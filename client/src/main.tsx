import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import App from "./App";
import "./fonts.css";
import "./index.css";
import "./i18n"; // Importa a configuração de internacionalização
import { store } from "./store";

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <App />
  </Provider>
);
