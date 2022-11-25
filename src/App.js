
import {Route, Routes} from "react-router-dom"
import Home from './Components/Home/Home';
import "./style/index.scss"

function App() {
  return (
    <div className="container">
     <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/login' element={''} />
      <Route path='/register' element={''} />
     </Routes>
    </div>
  );
}

export default App;
