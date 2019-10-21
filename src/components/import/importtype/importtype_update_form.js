import React, { useState } from 'react';
import { Form, Header, Segment } from "semantic-ui-react";
import { errorHandler } from '../../../service/errorHandler';
import { API } from "../../../service/api.js";

export const ImporttypeUpdateForm = (props) => {
  const [name, setName]  = useState(props.importtype.name);
  const [description, setDescription] = useState(props.importtype.description || '');

  const handleNameChange = (e) => setName(e.target.value);
  const handleDescriptionChange = (e) => setDescription(e.target.value);
  const handleSubmit = () => {
    const importtype_id = props.importtype.id;
    API.Importtype.update({importtype_id, name, description})
      .then(
        result => props.onUpdate(),
        error => errorHandler(error)
      );

    setName('');
    setDescription('');
  }

  return (
    <Segment raised color='black'>
      <Form name='importfield' onClick={(e) => e.stopPropagation()} onSubmit={handleSubmit}>
        <Header size="tiny" textAlign='center'>Update Import Type</Header>
        <Form.Group width='16'>
          <Form.Input width='4' placeholder='Name' onChange={handleNameChange} value={name} />
          <Form.Input width='10' placeholder='Description' onChange={handleDescriptionChange}  value={description} />
          <Form.Button disabled={!name && !description} primary> Submit</Form.Button>
        </Form.Group>
      </Form>
    </Segment>
  );
}