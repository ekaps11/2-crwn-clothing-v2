import { useNavigate } from 'react-router-dom';
import {
  DirectoryItemContainer,
  Background,
  Body,
} from './directory-item.styles';

const DirectoryItem = ({ category: { title, imageUrl } }) => {
  const navigate = useNavigate();

  const navigationHandler = () => navigate(`shop/${title.toLowerCase()}`);
  return (
    <DirectoryItemContainer onClick={navigationHandler}>
      <Background image={imageUrl} />

      <Body>
        <h2>{title}</h2>
        <p>Shop Now</p>
      </Body>
    </DirectoryItemContainer>
  );
};

export default DirectoryItem;
