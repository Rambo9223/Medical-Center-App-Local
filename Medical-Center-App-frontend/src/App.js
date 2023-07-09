import './App.css';// app css
import "bootstrap/dist/css/bootstrap.min.css";// bootstrap css
import NavBar from './Components/Pages/NavBar';// our nav bar component
import { BrowserRouter,} from "react-router-dom";// browser router to give 
// routes functionality

function App() {
  return (
    <BrowserRouter>
    <div className="App">  
    <NavBar/>
    </div>
    </BrowserRouter>
  );
}

export default App;

