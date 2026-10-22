import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

const root = document.getElementById("root");

if (!root) {
  throw new Error('Required app root element "#root" was not found.');
}

if (root.childElementCount === 0) {
  createRoot(root).render(<App />);
}
