import logo from './logo.svg';
import './App.css';

import Header from './components/header'
import Home from './containers/home'
import Detail from './containers/detail'
import Form from './containers/form'
import Admin from './containers/admin'
import Edit from './containers/edit'

import {Routes, Route} from 'react-router-dom'
import { Navigate } from "react-router";

function App() {
  return (
    <div className="App">
      <Header />
      <main>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/detail/:id" element={<Detail />} />
        <Route exact path="/form" element={<Form />} />
        <Route exact path="/admin" element={<Admin />} />
        <Route exact path="/edit/:id" element={<Edit />} />
        
        <Route exact path="*" element={<Navigate to="/" />} />
      </Routes>
      </main>
    </div>
  );
}

export default App;
