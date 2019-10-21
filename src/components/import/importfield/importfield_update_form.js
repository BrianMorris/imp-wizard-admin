import React, { useState } from 'react';
import { Form, Header, Segment } from "semantic-ui-react";
import { errorHandler } from '../../../service/errorHandler';
import { API } from "../../../service/api.js";

export const ImportfieldUpdateForm = (props) => {
  const [name, setName]  = useState(props.importfield.name);
  const [description, setDescription] = useState(props.importfield.description || '');

  const handleNameChange = (e) => setName(e.target.value);
  const handleDescriptionChange = (e) => setDescription(e.target.value);
  const handleSubmit = () => {
    const importfield_id = props.importfield.id;
    const importtype_id = props.importfield.importtype_id;
    API.Importfield.update({importfield_id, name, description})
      .then(
        result => props.onUpdate(importtype_id),
        error => errorHandler(error)
      );

    setName('');
    setDescription('');
  }

  return (
    <Segment raised color='black'>
      <Form name='importfield' onClick={(e) => e.stopPropagation()} onSubmit={handleSubmit}>
        <Header size="tiny" textAlign='center'>Update Import Field</Header>
        <Form.Group width='16'>
          <Form.Input width='3' placeholder='Name' onChange={handleNameChange} value={name} />
          <Form.Input width='10' placeholder='Description' onChange={handleDescriptionChange}  value={description} />
          <Form.Button width='2'  disabled={!name && !description} primary> Submit</Form.Button>
        </Form.Group>
      </Form>
    </Segment>
  );
}