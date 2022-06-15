import { Header } from "./Layout/Header";
import { BrowserRouter } from "react-router-dom";
import "./App.css";
import { RoutesComponents } from "./Routes";

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Header />
        <RoutesComponents />
      </div>
    </BrowserRouter>
  );
}

export default App;
