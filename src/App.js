import './App.css';
import Home from './screens/Home';
import { Routes, Route, Link } from "react-router-dom";
import Wishlist from './screens/Wishlist';
import Navigationbar from './components/Navigationbar';

function App() {
  return (
    <div className='App'>
      <Navigationbar />
      <Routes>
        <Route path="/" element={ <Home /> } />
        <Route path="/wishlist" element={ <Wishlist /> } />
      </Routes>
    </div>
  );
}

export default App;
