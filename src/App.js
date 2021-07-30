import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import Header from "./components/Header.js";
import Home from "./containers/Home.js";
import Offer from "./containers/Offer.js";
import Signup from "./containers/Signup.js";
import Login from "./containers/Login.js";

function App() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://vinted-react-by-adeline.herokuapp.com/offers"
        );
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, []);

  return isLoading ? (
    <span>En cours de chargement...</span>
  ) : (
    <Router>
      <Header />
      <Switch>
        <Route path="/" exact component={Home}>
          <Home data={data} />
        </Route>
        <Route path="/offer/:id" component={Offer}>
          <Offer data={data} />
        </Route>
        <Route path="/user/signup" component={Signup} />
        <Route path="/user/login" component={Login} />
      </Switch>
    </Router>
  );
}

export default App;
