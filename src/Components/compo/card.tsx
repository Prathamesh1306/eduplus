import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Card.css';

interface CardProps {
  image: string;
  image2: string;
  title: string;
  description: string;
}

const Card: React.FC<CardProps> = ({ image, image2, title, description , }) => {
  const navigate = useNavigate();

  // Function to handle navigation based on the card title
  const handleNavigation = () => {
    let path = '';
    switch (title) {
      case 'Verifier List':
        path = '/admin-home/admin-recruiter-list';
        break;
      case 'Freezed student':
        path = '/admin-home/verified-students';
        break;
      case 'Deployed Students':
        path = '/admin-home/admin-deployedstudent';
        break;
      default:
        break;
    }
    if (path) navigate(path);
  };

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
        <button className="view-button" onClick={handleNavigation}>
          View
        </button>
      </div>
    </div>
  );
};

export default Card;
