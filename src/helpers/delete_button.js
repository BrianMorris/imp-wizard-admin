import React from 'react';
import { Popup, Icon } from 'semantic-ui-react';

export const DeleteButton = (props) => {
  const className = props.overrideClass || 'floatButton';
  const disabled = !!props.hasChildren; 
  const content = disabled ? 'Cannot delete with chidren' : 'Delete';
  return(
    <Popup 
      className='popup' 
      inverted 
      content={content} 
      trigger={
        <Icon 
          onClick={(e) => {
            e.stopPropagation(); 
            props.delete(e, props.id);}} 
          disabled={disabled} 
          className={className}
          name='delete' 
          color='red'
        />
      }
    />
  );
}