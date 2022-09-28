import { Route, BrowserRouter, Routes } from "react-router-dom";
import Home from "./components/Home";
import Task1 from "./labs/Task1";

function App() {

  // const [user, setUser] = useState(null)

  // // - User count (used for making user specific tokens)
  // let count = 0

  return (
    <BrowserRouter>
      <Routes>
        <Route path={'/'} element={<Home/>} />
        <Route path={'/1'} element={<Task1/>} />
      </Routes>
    </BrowserRouter>  
  );
}

export default App;
