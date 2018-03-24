import React from 'react';
import { FormGroup, Col, Button } from 'react-bootstrap';

export const ButtonFormGroup = ({ disabled, onClick, title }) => (
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
