import React from 'react';
import { BrowserRouter as Router, Route ,Routes} from 'react-router-dom';
import Navbar from './components/navbar';
import "bootstrap/dist/css/bootstrap.min.css";
import CategoryList from './components/CategoryList';
import ProductsList from './components/ProductsList';

function App() {
  return (
    <Router>
      <div className="container">
        <Navbar />
        <br />
          <Routes>
        <Route path="/" element={<ProductsList />} />
        <Route path="/category" element={<CategoryList />} />
        <Route path="/create" element={<createProducts/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
