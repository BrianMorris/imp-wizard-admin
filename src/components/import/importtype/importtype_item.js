import React from 'react';
import { Popup, Checkbox, List } from "semantic-ui-react";
import { DeleteButton } from "../../../helpers/delete_button";
import { UpdateButton } from "../../../helpers/update_button";

export const ImporttypeItem = (props) => {
  return(
    <List.Item id={props.importtype.id} onClick={props.expandImporttype}>
      <List.Icon name={props.activeImporttype_id === props.importtype.id ? 'angle down' : 'angle right'} />
      <List.Content >
        <List.Header className='listHeader'>
        {props.importtype.name}
        <DeleteButton id={props.importtype.id} hasChildren={props.importtype.has_children} delete={props.delete} /> 
        <UpdateButton id={props.importtype.id} hasChildren={false} update={props.update} />
        <Popup 
          className='popup' 
          inverted 
          content='activate' 
          trigger={
            <Checkbox 
              onChange={() => props.handleCheckboxToggle(props.importtype.id, props.importtype.active)} 
              onClick={props.handleClick} 
              className='right floated' 
              toggle 
              checked={!!props.importtype.active} 
            />
          } 
        />
        </List.Header>
      </List.Content>
        <List.Description>{props.importtype.description}</List.Description>
        {props.children} 
    </List.Item>
  ); 
}