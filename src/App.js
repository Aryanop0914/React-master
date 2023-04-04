import { Routes,Route} from "react-router-dom";
import Login from './Components/Login';
import Signup from './Components/Signup';
import Home from './Pages/Home';
import About from './Components/About';
import Contact from './Components/Contact';
import Info from './Components/Info';
import Forowners from "./Pages/Forowners";
import Form2 from "./Components/Form2";
import Roommng from "./Components/Roommng";
import Delete from "./Components/Delete";
import Customer from "./Pages/Customer";
import Emailcu from "./Components/Emailcu";

function App() {
  
  return (
    <>
    <div className="App">
        <Routes>
          <Route path="/" element={ <Home/> } />  
          <Route path="/forowners" element={<Forowners/> } />
          <Route path="/about" element={<About/> } />
          <Route path="/contact" element={ <Contact/> } />
          <Route path="/Info" element={ <Info/> } />
          <Route path="/signup" element={ <Signup/> } />
          <Route path="/login" element={ <Login/> } />
          <Route path="/form2" element={ <Form2/> } />
          <Route path="/infoupdate" element={ <Roommng/> } />
          <Route path="/deleteinfo" element={ <Delete/> } />
          <Route path="/hotels" element={ <Customer/> } />
          <Route path="/customerinfo" element={ <Emailcu/> } />
          </Routes>
          </div>
      
    </>
  );
}

export default App;
