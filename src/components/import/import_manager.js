import React from "react";
import { Header, Segment, List } from "semantic-ui-react";
import { API } from '../../service/api';
import { errorHandler } from '../../service/errorHandler';
import { ImporttypeItem } from './importtype/importtype_item';
import { ImportfieldCreateForm } from './importfield/importfield_create_form';
import { ImportfieldUpdateForm } from './importfield/importfield_update_form';
import { ImporttypeCreateForm }  from './importtype/importtype_create_form';
import { ImporttypeUpdateForm }  from './importtype/importtype_update_form';
import { DeleteButton } from "../../helpers/delete_button";
import { UpdateButton } from "../../helpers/update_button";


export class ImportManager extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      typeName: '',
      typeDescription: '',
      fieldName: '',
      fieldDescription: '',
      importtypes: [],
      importfields: [],
      activeImporttype_id: null,
      update_importtype_id: null,
      update_importfield_id: null,
    }
  }

  handleClick = (e) => {
    e.stopPropagation();
  }

  onChange = (e) => {
    const {name, value} = e.target;
    this.setState({
      [name]: value,
    })
  }

  onDropdownChange = (e, data) => {
    const {name, value} = data;
    this.setState({
      [name]: value,
    })
  }

  componentDidMount() {
    this.getImporttypes();
  }

  getImporttypes() {
    API.Importtype.get()
      .then(
        result => {
            let importDropdownOptions = result.map((field, index) => {
              field.text = field.name;
              field.key = field.id;
              field.value = field.id
              return field;
            });
            
            this.setState({importtypes: importDropdownOptions});
        },
        error => errorHandler(error)
      );
  }
      
  expandImporttype = (e, data) => {
    const importtype_id = data.id;
    if(importtype_id === this.state.activeImporttype_id) {
      this.setState({activeImporttype_id:null});
    }
    else {
      this.getImporttypeImportfields(importtype_id);
    }
  }

  getImporttypeImportfields(importtype_id) {
    API.Importfield.get(importtype_id).then(
      result => {
        this.setState({
          importfields: result,
          activeImporttype_id: importtype_id,
        })
      },
      error => {
        errorHandler(error);
      }
    )
  }
  
  handleCheckboxToggle(importtype_id, active) {
    API.Importtype.update(importtype_id, {active: !active}).then(
      result => {
        this.getImporttypes();
      },
      error => {
        errorHandler(error);
      }
    )
  }

  showImporttypeUpdateForm = (e, importtype_id) => {
    this.setState({update_importtype_id: importtype_id});
  }

  showImportfieldUpdateForm = (e, importfield_id) => {
    this.setState({update_importfield_id: importfield_id});
  }

  onUpdateImporttype = () => {
    this.setState({update_importtype_id: null});
    this.getImporttypes();
  }

  onUpdateImportfield = (importtype_id) => {
    this.setState({update_importfield_id: null});
    this.getImporttypeImportfields(importtype_id);
  }

  onCreateImportfield = (importtype_id) => {
    this.getImporttypeImportfields(importtype_id);
  }

  onCreateImporttype = () => {
    this.getImporttypes();
  }

  deleteImportfield = (e, importfield_id) => {
     API.Importfield.delete(importfield_id)
      .then(
        result => this.getImporttypeImportfields(this.state.activeImporttype_id),
        error => errorHandler(error)
      );

  }
  
  deleteImporttype = (e, importtype_id) => {
    API.Importtype.delete(importtype_id)
      .then(
        result => this.getImporttypes(),
        error => errorHandler(error)
      );
  }

  render() {
    
    const importfieldCreateForm = (
      <ImportfieldCreateForm 
        onCreate={this.onCreateImportfield}
        importtype_id = {this.state.activeImporttype_id}
      />
    );

    const importtypeCreateForm = (
      <ImporttypeCreateForm 
        onCreate={this.onCreateImporttype}
      />
    );


    const importfields = this.state.importfields.map((importfield) => {
      if(this.state.update_importfield_id === importfield.id) {
        return(
          <ImportfieldUpdateForm 
          key={importfield.id}
          onUpdate={this.onUpdateImportfield}
          importfield={importfield}
          />
        )
      } else {
        return(
          <List.Item as='li' key={importfield.id} id={importfield.id} onClick={this.expandImporttype}>
            <List.Content>
              <List.Header>
                {importfield.name}
                <DeleteButton overrideClass="importfieldFloat" id={importfield.id} hasChildren={false} delete={this.deleteImportfield} /> 
                <UpdateButton id={importfield.id} hasChildren={false} update={this.showImportfieldUpdateForm} /> 
              </List.Header>
              <List.Description>{importfield.description}</List.Description>
            </List.Content>
          </List.Item>
        )
      }
    });

    const importtypes = this.state.importtypes.map((importtype) => {
      if(this.state.update_importtype_id === importtype.id) {
        return (
          <ImporttypeUpdateForm 
          key={importtype.id}
          onUpdate={this.onUpdateImporttype}
          importtype={importtype}
          />
        );
      } else {
        return(
          <ImporttypeItem 
            key={importtype.id}
            importtype={importtype} 
            activeImporttype_id={this.state.activeImporttype_id}
            expandImporttype={this.expandImporttype}
            handleClick={this.handleClick}
            delete={this.deleteImporttype}
            update={this.showImporttypeUpdateForm}
            handleCheckboxToggle={(importtype_id, active) => this.handleCheckboxToggle(importtype_id, active)}
          >
            {this.state.activeImporttype_id === importtype.id && importfieldCreateForm}
            <List.List as='ul' relaxed='true'>
              {this.state.activeImporttype_id === importtype.id && importfields}
            </List.List>
          </ImporttypeItem>
        );
      }
    })

    return(
      <Segment onClick={(e) => {
        this.handleClick(e);
        }}>
        <Header textAlign='center'>Manage Imports</Header>
            {importtypeCreateForm}
          <List divided>
            {importtypes}
          </List>
      </Segment>
    );
  }
}
