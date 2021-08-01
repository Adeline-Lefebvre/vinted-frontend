import "../App.css";
import Item from "./Item.js";

const Content = ({ data }) => {
  return (
    <div className="content">
      {data.offers.map((offer) => {
        return <Item offer={offer} key={offer._id} />;
      })}
    </div>
  );
};

export default Content;
