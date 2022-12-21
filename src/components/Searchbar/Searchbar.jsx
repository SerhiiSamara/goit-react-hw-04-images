import PropTypes from 'prop-types';
import {
  Container,
  Form,
  Button,
  ButtonLabel,
  Input,
} from './Searchbar.styled';

export const Searchbar = ({ onSubmit }) => {
  const handlSubmit = e => {
    e.preventDefault();
    const form = e.currentTarget;
    onSubmit(form.elements.term.value);
    form.reset();
  };

  return (
    <Container>
      <Form onSubmit={handlSubmit}>
        <Button>
          <ButtonLabel>Search</ButtonLabel>
        </Button>

        <Input
          type="text"
          name="term"
          autocomplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </Form>
    </Container>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
