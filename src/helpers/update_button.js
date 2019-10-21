import React from 'react';
import { Popup, Icon } from 'semantic-ui-react';

export const UpdateButton = (props) => {
  const content = 'Update';
  return(
    <Popup 
      className='popup' 
      inverted 
      content={content} 
      trigger={
        <Icon 
          onClick={(e) => {
            e.stopPropagation(); 
            props.update(e, props.id);
          }}
          className='floatButton' 
          name='edit' 
        />
      }
    />
  );
}