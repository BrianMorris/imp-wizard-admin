import React, { useState } from 'react';
import { Form, Header, Segment } from "semantic-ui-react";
import { errorHandler } from '../../../service/errorHandler';
import { API } from "../../../service/api.js";

export const ImportfieldCreateForm = (props) => {
  const [name, setName]  = useState('');
  const [description, setDescription] = useState('');

  const handleNameChange = (e) => setName(e.target.value);
  const handleDescriptionChange = (e) => setDescription(e.target.value);
  const handleSubmit = () => {
    const importtype_id = props.importtype_id;
    API.Importfield.create({importtype_id, name, description})
      .then(
        result => props.onCreate(importtype_id),
        error => errorHandler(error)
      );

    setName('');
    setDescription('');
  }

  return (
    <Segment raised color='black'>
      <Form name='importfield' onClick={(e) => e.stopPropagation()} onSubmit={handleSubmit}>
        <Header size="tiny" textAlign='center'>Add Import Field</Header>
        <Form.Group width='16'>
          <Form.Input width='3' placeholder='Name' onChange={handleNameChange} value={name} />
          <Form.Input width='10' placeholder='Description' onChange={handleDescriptionChange}  value={description} />
          <Form.Button width='2'  disabled={!name && !description} primary> Submit</Form.Button>
        </Form.Group>
      </Form>
    </Segment>
  );
}