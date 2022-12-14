import { useNavigate } from 'react-router-dom';
import { DirectoryCategoriesProps } from '../directory/directory.component';
import {
  DirectoryItemContainer,
  Background,
  Body,
} from './directory-item.styles';

type DirectoryItemProps = { category: DirectoryCategoriesProps };

const DirectoryItem = ({
  category: { title, imageUrl },
}: DirectoryItemProps) => {
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
