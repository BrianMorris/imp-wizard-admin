import React, { useState } from 'react';
import { Form, Header, Segment } from "semantic-ui-react";
import { errorHandler } from '../../../service/errorHandler';
import { API } from "../../../service/api.js";

export const ImporttypeCreateForm = (props) => {
  const [name, setName]  = useState('');
  const [description, setDescription] = useState('');

  const handleNameChange = (e) => setName(e.target.value);
  const handleDescriptionChange = (e) => setDescription(e.target.value);
  const handleSubmit = () => {
    API.Importtype.create({name, description})
    .then(
      result => props.onCreate(),
      error => errorHandler(error)
    );

    setName('');
    setDescription('');
  }

  return (
    <Segment raised color='black'>
      <Form name='importfield' onClick={(e) => e.stopPropagation()} onSubmit={handleSubmit}>
        <Header size="tiny" textAlign='center'>Add Import Type</Header>
        <Form.Group width='16'>
          <Form.Input width='4' placeholder='Name' onChange={handleNameChange} value={name} />
          <Form.Input width='10' placeholder='Description' onChange={handleDescriptionChange}  value={description} />
          <Form.Button disabled={!name && !description} primary> Submit</Form.Button>
        </Form.Group>
      </Form>
    </Segment>
  );
}