import React, { Component, PureComponent } from 'react';
import { FormGroup, Form, FormControl, Col, Button, ControlLabel, HelpBlock } from 'react-bootstrap';

import { login as callLogin } from '../api/resources';

const InputFormGroup = ({ controlId, text, type = 'text', onChange, help, validationState }) => (
  <FormGroup
    controlId={ controlId }
    validationState={ validationState }
  >
    <Col
      componentClass={ ControlLabel }
      sm={ 2 }
    >
      { text }
    </Col>
    <Col sm={ 10 }>
      <FormControl
        type={ type }
        placeholder={ text }
        onChange={ onChange }
      />
      <FormControl.Feedback/>
      { help && <HelpBlock>{ help }</HelpBlock> }
    </Col>
  </FormGroup>
);

const ButtonFormGroup = ({ disabled, onClick, title }) => (
  <FormGroup>
    <Col
      smOffset={ 2 }
      sm={ 10 }
    >
      <Button
        disabled={ disabled }
        onClick={ onClick }
      >
        { title }
      </Button>
    </Col>
  </FormGroup>
);

export class Login extends Component {
  constructor(props) {
    super(props);

    this.state = { login: '', password: '', error: null };

    this.setLogin = this.handleEventToState.bind(this, 'login');
    this.setPassword = this.handleEventToState.bind(this, 'password');
    this.doLogin = this.doLogin.bind(this);
  }

  handleEventToState(prop, { target: { value } = {} }) {
    this.setState({ [prop]: value, error: null });
  }

  async doLogin() {
    const { login, password } = this.state;

    if (!login) {
      return;
    }

    try {
      await callLogin(login, password);

      this.props.history.replace('/worklog');
    } catch (error) {
      this.setState({ error: error.toString() });
    }
  }

  isFormValid() {
    return this.state.login && !this.state.error;
  }

  render() {
    const { error } = this.state;
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
          onClick={ this.doLogin }
          title="Sign in"
        />
      </Form>
    );
  }
}
