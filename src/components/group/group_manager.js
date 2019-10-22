import React from "react";
import { List, Segment, Header } from 'semantic-ui-react';
import { API } from "../../service/api";
import { errorHandler } from '../../service/errorHandler';
import { GroupCreateForm } from './group_create_form';
import { GroupUpdateForm } from './group_update_form';
import { DeleteButton } from "../../helpers/delete_button";
import { UpdateButton } from "../../helpers/update_button";

export class GroupManager extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      groups: [],
      update_group_id: null,
    }
  }

  componentDidMount() {
    this.getGroups();
  }

  getGroups = () => {
    API.Group.get()
    .then(
      result => this.setState({ groups: result }),
      error => errorHandler(error)
    ); 
  }

  delete = (e, group_id) => {
    e.stopPropagation();
    API.Group.delete(group_id)
    .then(
      result => this.getGroups(),
      error => errorHandler(error)
    );
  }

  showUpdateForm = (e, update_group_id) => {
    this.setState({ update_group_id })
  }

  onUpdate = () => {
    // finished updating
    this.setState({
      update_group_id: null
    })
    this.getGroups();
  }

  onCreate = () => {
    this.getGroups();
  }
  
  render() {
    const groupCreateForm = (
      <GroupCreateForm 
        onCreate={this.onCreate}
      />
    );
    const groups = this.state.groups.map((group) => {
      if(group.id === this.state.update_group_id) {
        return (
          <GroupUpdateForm 
            key={group.id}
            onUpdate={this.onUpdate}
            group={group}
          />
        );
      }
      return (
       <List.Item key={group.id} id={group.id} onClick={this.expandImporttype}>
          <List.Content>
            <List.Header>{group.name}  <DeleteButton id={group.id} hasChildren={false} delete={this.delete} /> <UpdateButton id={group.id} hasChildren={false} update={this.showUpdateForm} /></List.Header>
          </List.Content>
          <List.Description>
            {group.description}
          </List.Description>
        </List.Item>
      );
    });

    return (
      <Segment>
        <Header textAlign='center'> 
          Manage Groups
        </Header>
        {groupCreateForm}
        <List divided relaxed>
          {groups}
        </List>

      </Segment>
    );
  }
}
