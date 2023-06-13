import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './Components/Login';
import Quiz from './Components/Quiz';
import Result from './Components/Result';
import Layout from './Components/Layout';
import Authenticate from './Components/Authenticate';
import Registration from './Components/Registration';
import AdminPage from './Components/AdminPage';

function App() {
  return (
    
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Login/>}/>
      <Route path='/register' element={<Registration/>}/>
      <Route path='' element={<Authenticate/>}>
      <Route path='/' element={<Layout/>}>
      <Route path='/quiz' element={<Quiz/>}/> 
      <Route path='/result' element={<Result/>}/>
      <Route path='/admin' element={<AdminPage/>}/>
      </Route>
      </Route>
    </Routes>
    </BrowserRouter>
    
    
  );
}

export default App;