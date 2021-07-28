import { useParams } from "react-router-dom";

const Offer = ({ data }) => {
  const { id } = useParams();

  const offer = data.offers.find((elem) => elem._id === id);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-around",
        backgroundColor: "#EBEDEE",
        padding: "40px 100px 300px 100px",
      }}
    >
      <img src={offer.product_image.url} alt="" />
      <div className="itemInfos">
        <div
          style={{ fontSize: "18px", fontWeight: "bold", marginBottom: "15px" }}
        >
          {offer.product_price.toFixed(2)} €
        </div>
        <div className="offer-details">
          <div className="details-titles">
            <div>MARQUE</div>
            <div>TAILLE</div>
            <div>ETAT</div>
            <div>COULEUR</div>
            <div>EMPLACEMENT</div>
          </div>
          <div className="details-col-2">
            <div>
              {offer.product_details.map((detail) => {
                return detail.MARQUE && <div>{detail.MARQUE}</div>;
              })}
            </div>
            <div>
              {offer.product_details.map((detail) => {
                return detail.TAILLE && <div>{detail.TAILLE}</div>;
              })}
            </div>
            <div>
              {offer.product_details.map((detail) => {
                return detail.ÉTAT && <div>{detail.ÉTAT}</div>;
              })}
            </div>
            <div>
              {offer.product_details.map((detail) => {
                return detail.COULEUR && <div>{detail.COULEUR}</div>;
              })}
            </div>
            <div>
              {offer.product_details.map((detail) => {
                return detail.EMPLACEMENT && <div>{detail.EMPLACEMENT}</div>;
              })}
            </div>
          </div>
        </div>
        <div className="offer-line-2">
          <div style={{ fontWeight: "bold" }}>{offer.product_name}</div>
          <div style={{ color: "gray", margin: "15px 0", maxWidth: "300px" }}>
            {offer.product_description}
          </div>
          <div>{offer.owner.account.username}</div>
        </div>
        <div className="CTA-blue acheter">Acheter</div>
      </div>
    </div>
  );
};

export default Offer;
