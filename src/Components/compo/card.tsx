import React from 'react';
import './Card.css';

interface CardProps {
  image: string;
  image2: string;
  title: string;
  description: string;
}

const Card: React.FC<CardProps> = ({ image, image2, title, description }) => {
  return (
    <div className="card">
      <div className="admin-card-image">
        <img src={image} alt={title} />
      </div>
      <div className="admin-card-content">
        <div className="admin-student-avatars">
          <img src={image2} alt="Student avatar" />
        </div>
        <h2>{title}</h2>
        <p>{description}</p>
        <button className="view-button">View</button>
      </div>
    </div>
  );
};

export default Card;
