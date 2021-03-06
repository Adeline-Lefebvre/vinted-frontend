import "./index.css";
import { useState } from "react";
import axios from "axios";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { Link } from "react-router-dom";

const CheckoutForm = ({ product_name, product_price }) => {
  const stripe = useStripe();
  const elements = useElements();

  let total = Number(product_price) + 1.2;
  total = total.toFixed(2);

  const [completed, setCompleted] = useState(false);

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      const cardElement = elements.getElement(CardElement);
      const stripeResponse = await stripe.createToken(cardElement, {
        // créer un cookie avec l'id pour pouvoir le récup
        name: "L'id de l'acheteur",
      });
      console.log(stripeResponse);
      const stripeToken = stripeResponse.token.id;
      const response = await axios.post(
        "https://vinted-react-by-adeline.herokuapp.com/payment",
        {
          stripeToken: stripeToken,
          amount: total,
          title: product_name,
        }
      );
      console.log(response.data);
      setCompleted(true);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="checkoutform">
      {!completed ? (
        <div>
          <div className="checkoutform-title">Résumé de la commande</div>
          <div className="checkoutform-fees">
            <div className="checkoutform-fee">
              <div>Commande</div>
              <div>{product_price} €</div>
            </div>
            <div className="checkoutform-fee">
              <div>Frais protection acheteurs</div>
              <div>0.40 €</div>
            </div>
            <div className="checkoutform-fee">
              <div>Frais de port</div>
              <div>0.80 €</div>
            </div>
          </div>

          <div>
            <div className="checkoutform-total">
              <div>Total</div>
              <div>{total} €</div>
            </div>
            <div className="checkoutform-last-step">
              Il ne vous reste plus qu'une étape pour vous offrir
              <span> {product_name}</span>. Vous allez payer
              <span> {total}</span> € (frais de protection et frais de port
              inclus).
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            <CardElement className="cardelement" />
            <input type="submit" className="CTA-pay" value="Payer" />
          </form>
        </div>
      ) : (
        <div>
          <div className="payment-succeed">✨ Paiement effectué ! ✨</div>
          <Link to="/" className="link-homepage">
            Retourner à la page d'accueil
          </Link>
        </div>
      )}
    </div>
  );
};

export default CheckoutForm;
