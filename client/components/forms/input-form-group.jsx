import React from 'react';
import { ControlLabel, FormGroup, FormControl, Col, HelpBlock } from 'react-bootstrap';

export const InputFormGroup = ({ controlId, text, type = 'text', onChange, help, validationState }) => (
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
      <FormControl.Feedback />
      { help && (
        <HelpBlock>
          { help }
        </HelpBlock>) }
    </Col>
  </FormGroup>
);
