import React from "react";
import { templates } from "../assets/assets";
import "./TemplateGrid.css";

const TemplateGrid = ({ onTemplateClick }) => {
  return (
    <div className="template-grid">
      {templates.map(({ id, label, image }) => (
        <div
          className="template-card"
          key={id}
          onClick={() => onTemplateClick(id)}
        >
          <img src={image} alt={label} loading="lazy" />
          <span>{label}</span>
        </div>
      ))}
    </div>
  );
};

export default TemplateGrid;