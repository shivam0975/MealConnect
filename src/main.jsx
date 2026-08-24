import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import App from "./App.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import { DonationsProvider } from "./context/DonationsContext.jsx";
import "./index.css";
import reportWebVitals from "./reportWebVitals";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      {/* Donations depend on who is signed in, so auth wraps them. */}
      <AuthProvider>
        <DonationsProvider>
          <App />
        </DonationsProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);

reportWebVitals();
