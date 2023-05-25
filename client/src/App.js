import "./App.css";
import "./styles/loaders.css";
import AllRoute from "./routes/Route";
import { useSelector } from "react-redux";
import Navbar from "./components/Navbar";

function App() {
  const { isAuth } = useSelector((state) => state.auth);
  return (
    <div className="App">
      {isAuth && <Navbar />}
      <AllRoute />
    </div>
  );
}

export default App;
