import ServiceCard from "../components/ServiceCard";

export default function Services() {
  const services = [
    {
      title: "Haircut",
      description: "Professional haircut tailored to your style.",
      price: "$20",
      image: "/images/haircut_card.jpg", // 👈 add image path
    },
    {
      title: "Beard Trim",
      description: "Clean and sharp beard trim.",
      price: "$15",
      image: "/images/beardtrim_card.jpg",
    },
    {
      title: "Shave",
      description: "Smooth and clean traditional shave.",
      price: "$10",
      image: "/images/shaving_card.jpg",
    },
    {
      title: "Hair Wash",
      description: "Relaxing shampoo and conditioning wash.",
      price: "$8",
      image: "/images/hairwash_card.jpg",
    },
  ];

  return (
    <div className="services-page">
      <h2>Our Services</h2>
      <div className="services-list">
        {services.map((service, index) => (
          <ServiceCard
            key={index}
            title={service.title}
            description={service.description}
            price={service.price}
            image={service.image} // 👈 pass image
          />
        ))}
      </div>
    </div>
  );
}


// import ServiceCard from "../components/ServiceCard";

// export default function Services() {
//   const services = [
//     {
//       title: "Haircut",
//       description: "Professional haircut tailored to your style.",
//       price: "$20",
//     },
//     {
//       title: "Beard Trim",
//       description: "Clean and sharp beard trim.",
//       price: "$15",
//     },
//     {
//       title: "Shave",
//       description: "Smooth and clean traditional shave.",
//       price: "$10",
//     },
//     {
//       title: "Hair Wash",
//       description: "Relaxing shampoo and conditioning wash.",
//       price: "$8",
//     },
//   ];

//   return (
//     <div className="services-page">
//       <h2>Our Services</h2>
//       <div className="services-list">
//         {services.map((service, index) => (
//           <ServiceCard
//             key={index}
//             title={service.title}
//             description={service.description}
//             price={service.price}
//           />
//         ))}
//       </div>
//     </div>
//   );
// }
