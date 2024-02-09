import React from 'react'
import './App.css';
import {BrowserRouter , Routes , Route} from 'react-router-dom';
import Home from './Home';
import Main from './Main';


const App = () => {
  return (
   <div>
    <BrowserRouter> 
    <Routes>
      <Route path='/' element={<Home />}/>
      <Route path='/main' element={<Main />}/>
    </Routes>
    </BrowserRouter>
   </div>
  )
}

export default App;
