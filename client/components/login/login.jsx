import React, { Component } from 'react';
import { Form } from 'react-bootstrap';

import { ButtonFormGroup, InputFormGroup } from '../forms';

export class Login extends Component {
  static defaultProps() {
    return {
      onSubmit: () => {},
      onChange: () => {},
    };
  }

  constructor(props) {
    super(props);

    this.state = { login: '', password: '' };

    this.setLogin = this.handleEventToState.bind(this, 'login');
    this.setPassword = this.handleEventToState.bind(this, 'password');
    this.onSubmit = this.onSubmit.bind(this);
  }

  handleEventToState(prop, { target: { value } = {} }) {
    this.setState({ [prop]: value });
    this.props.onChange();
  }

  onSubmit() {
    const { login, password } = this.state;
    this.props.onSubmit({ login, password });
  }

  isFormValid() {
    return this.state.login && !this.props.error;
  }

  render() {
    const { error } = this.props;
    const validationState = error && 'error';

    return (
      <Form horizontal>
        <InputFormGroup
          controlId="formHorizontalEmail"
          text="Login"
          type="email"
          onChange={ this.setLogin }
          validationState={ validationState }
        />

        <InputFormGroup
          controlId="formHorizontalPassword"
          text="Password"
          type="password"
          onChange={ this.setPassword }
          validationState={ validationState }
          help={ error }
        />

        <ButtonFormGroup
          disabled={ !this.isFormValid() }
          onClick={ this.onSubmit }
          title="Sign in"
        />
      </Form>
    );
  }
}
