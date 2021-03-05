import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import NavBar from './Navbar';
import SlideNav from './SlideNav';
import Home from './Home';
import Users from './Users';
import Products from './Products';
import './styles/App.css';

function App() {
  return (
        <Router>
          <div>
              <NavBar />
              <SlideNav />
              <Switch>
                  <Route exact path="/">
                      <Home />
                  </Route>
                  <Route path="/Usuarios">
                      <Users />
                  </Route>
                  <Route path="/Produtos">
                      <Products />
                  </Route>
              </Switch>
          </div>
      </Router>
  );
}

export default App;
