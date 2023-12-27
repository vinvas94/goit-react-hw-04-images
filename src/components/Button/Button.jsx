import { LoadButton } from './Button.styled';

export const Button = ({ onClick }) => {
  return (
    <LoadButton type="button" onClick={() => onClick()}>
      Load more
    </LoadButton>
  );
};
