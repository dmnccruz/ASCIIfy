import React from 'react';
import 'semantic-ui-css/semantic.min.css'
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Shop from './pages/Shop';
import Landing from './pages/Landing';
import Bag from './pages/Bag';
import Likes from './pages/Likes';
import Footer from './components/Footer';

function App() {
  return (
    <Router>
      <Route exact path='/' component={Landing} />
      <div className="main-container">
        <Route exact path='/shop/:id' component={Shop} />
        <Route exact path='/bag' component={Bag} />
        <Route exact path='/likes' component={Likes} />
        <Footer/> 
      </div>
    </Router>
  );
}

export default App;
