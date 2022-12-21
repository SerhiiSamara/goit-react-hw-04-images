import PropTypes from 'prop-types';
import { Button } from './Button.styled';

export const LoadMore = ({ clickHandler }) => {
  return <Button onClick={clickHandler}>Load more</Button>;
};

LoadMore.propTypes = {
  clickHandler: PropTypes.func.isRequired,
};
