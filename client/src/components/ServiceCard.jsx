
import "./Services.css";

export default function ServiceCard({ title, description, price, image }) {
  return (
    <div className="service-card">
      {image && <img src={image} alt={title} className="service-image" />}
      <h3>{title}</h3>
      <p>{description}</p>
      <p className="price">{price}</p>
    </div>
  );
}
