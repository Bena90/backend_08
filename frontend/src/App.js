import 'bootstrap/dist/css/bootstrap.min.css';
import './App.scss';
import ContextProvider from './context/context';
import HomePage from './pages/HomePage';
import { Route, Routes, BrowserRouter } from 'react-router-dom'
import NotFoundPage from './pages/NotFoundPage';
import UpdatePage from './pages/UpdatePage';

function App() {
  return (
    <ContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/'>
            <Route index element = {<HomePage/>}/>
            <Route path='update/:iD' element={<UpdatePage/>}/>
            <Route path="*" element={<NotFoundPage/>}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </ContextProvider>
  );
}

export default App;
