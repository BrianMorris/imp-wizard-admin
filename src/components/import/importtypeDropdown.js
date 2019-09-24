import React from "react";
import { Form, Dropdown } from "semantic-ui-react";
import API from '../../service/api';

class ImporttypeDropdown extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      importDropdownOptions: [],
      importtype: null,
    };
  }

  onDropdownChange = (e, data) => {
    const {name, value} = data;
    this.setState({
      [name]: value,
      changed: true
    })
  }

  componentDidMount() {
    API.Import.getImporttypes(API.Status.ACTIVE).then(
      result => {
          // TODO: make the importtype field default value link to a group by adding a group column
          let importDropdownOptions = result.map((field, index) => {
          field.text = field.name;
          field.key = field.id;
          field.active = null;
          field.value = field.id
          return field;
        });
        
        this.setState({
          importDropdownOptions: importDropdownOptions
        });
      },
      error => {
        console.log('yo err', error);
      }
    );
  }

  render() {
    return(
        <Form.Field>
          <Dropdown 
            onChange={this.onDropdownChange} 
            placeholder='Select an Import type' 
            name='importtype'
            fluid 
            selection 
            search
            value={this.state.importtype}
            options={this.state.importDropdownOptions}
          />
        </Form.Field>
    );
  }
}

export default ImporttypeDropdown;