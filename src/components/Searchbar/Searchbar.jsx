import { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Container,
  Form,
  Button,
  ButtonLabel,
  Input,
} from './Searchbar.styled';

export class Searchbar extends Component {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
  };

  handlSubmit = e => {
    e.preventDefault();
    const form = e.currentTarget;
    this.props.onSubmit(form.elements.term.value);
    form.reset();
  };

  render() {
    return (
      <Container>
        <Form onSubmit={this.handlSubmit}>
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
  }
}
