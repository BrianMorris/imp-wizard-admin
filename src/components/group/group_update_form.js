import React, { useState } from 'react';
import { Form, Header, Segment } from "semantic-ui-react";
import { errorHandler } from '../../service/errorHandler';
import { API } from "../../service/api.js";

export const GroupUpdateForm = (props) => {
  const [name, setName]  = useState(props.group.name);
  const [description, setDescription] = useState(props.group.description);

  const handleNameChange = (e) => setName(e.target.value);
  const handleDescriptionChange = (e) => setDescription(e.target.value);
  const handleSubmit = () => {
    const group_id = props.group.id;
    API.Group.update({group_id, name, description})
      .then(
        result => props.onUpdate(),
        error => errorHandler(error)
      );
    
    setName('');
    setDescription('');
  }

  return (
    <Segment raised color='black'>
      <Form name='group' onClick={(e) => e.stopPropagation()} onSubmit={handleSubmit}>
        <Header size="tiny" textAlign='center'>Update Group</Header>
        <Form.Group width='16'>
          <Form.Input width='4' placeholder='Name' onChange={handleNameChange} name='name' value={name} />
          <Form.Input width='10' placeholder='Description' onChange={handleDescriptionChange} name='description' value={description} />
          <Form.Button  disabled={!name && !description} primary> Submit</Form.Button>
        </Form.Group>
      </Form>
    </Segment>
  );
}