import { Route, BrowserRouter, Routes } from "react-router-dom";
import Home from "./components/Home";
import Task1 from "./labs/Task1";
import Task2 from "./labs/Task2";
import Task3 from "./labs/Task3";

function App() {

  // const [user, setUser] = useState(null)

  // // - User count (used for making user specific tokens)
  // let count = 0

  return (
    <BrowserRouter>
      <Routes>
        <Route path={'/'} element={<Home/>} />
        <Route path={'/1'} element={<Task1/>} />
        <Route path={'/2'} element={<Task2/>} />
        <Route path={'/3'} element={<Task3/>} />
      </Routes>
    </BrowserRouter>  
  );
}

export default App;
