import "./index.css";
import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";

const Login = ({ setUser, setWelcomeMessage }) => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [errorMessage, setErrorMessage] = useState("");

  const history = useHistory();

  const url = "https://vinted-react-by-adeline.herokuapp.com/user/login";
  const data = {
    email: email,
    password: password,
  };

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      const response = await axios.post(url, data);
      console.log(response);
      if (response.data.token) {
        setUser(response.data.token);
        setWelcomeMessage(response.data.message);

        history.push("/");
      }
    } catch (error) {
      console.log(error.message);
      console.log(error.response);
      if (error.response.status === 400) {
        setErrorMessage(error.response.data.message);
      }
    }
  };

  return (
    <div>
      <div className="title">Se connecter</div>
      <form className="form" onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          onChange={(event) => {
            setEmail(event.target.value);
          }}
        />
        <input
          type="password"
          placeholder="Mot de passe"
          onChange={(event) => {
            setPassword(event.target.value);
          }}
        />
        <p className="errorMessage">{errorMessage}</p>
        <button type="submit">Se connecter</button>
      </form>
      <Link to="/user/signup" className="link-subscribe">
        Pas encore de compte ? Inscris-toi !
      </Link>
    </div>
  );
};

export default Login;
