import React, { useEffect } from "react";
// import { assets } from "./../../assets/assets";
import "./AnimatedShowcase.css";
import { assets } from "../../assets/assets";

const AnimatedShowcase = () => {
  useEffect(() => {
    const items = document.querySelectorAll(".alt-item");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("show");
          }
        });
      },
      { threshold: 0.3 }
    );

    items.forEach((i) => observer.observe(i));
    return () => observer.disconnect();
  }, []);

  return (
    <section className="alt-section">
      <div className="container">

        <h2 className="alt-title">Everything You Need to Manage Invoices</h2>

        <AltItem
          img={assets.landing1}
          title="Powerful Invoice Generator"
          points={[
            "Create invoices using professional templates",
            "Add client, product and tax details easily",
            "Automatic totals and tax calculation",
          ]}
        />

        <AltItem
          img={assets.landing2}
          title="Clean Dashboard"
          reverse
          points={[
            "View all invoices in one place",
            "Quick access to saved invoices",
            "Track invoice status easily",
          ]}
        />

        <AltItem
          img={assets.landing3}
          title="Multiple Templates"
          points={[
            "Choose templates based on your business",
            "Add logo and brand colors",
            "Optimized for print & PDF",
          ]}
        />

        <AltItem
          img={assets.landing4}
          title="Preview & Download"
          reverse
          points={[
            "Preview before downloading",
            "One-click PDF export",
            "Edit or duplicate invoices quickly",
          ]}
        />

      </div>
    </section>
  );
};

const AltItem = ({ img, title, points, reverse }) => (
  <div className={`alt-item ${reverse ? "reverse" : ""}`}>
    <div className="alt-image">
      <img src={img} alt={title} />
    </div>

    <div className="alt-content">
      <h3>{title}</h3>
      <ul>
        {points.map((p, i) => (
          <li key={i}>{p}</li>
        ))}
      </ul>
    </div>
  </div>
);

export default AnimatedShowcase;