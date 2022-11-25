import './App.css';
import {Route, Routes} from "react-router-dom"
import Home from './Components/Home/Home';

function App() {
  return (
    <div className="App">
     <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/login' element={''} />
      <Route path='/register' element={''} />
     </Routes>
    </div>
  );
}

export default App;
