import "./App.css";
import { useState } from "react";
import Login from "./components/Login";
import Home from "./components/Home";
import "antd/dist/antd.css";

function App() {
  const [token, setToken] = useState("");
  return (
    <div className="App">
      {!token ? <Login setToken={setToken} /> : <Home token={token} />}
    </div>
  );
}

export default App;
