import React, { Component } from 'react';
import { AsyncTypeahead } from 'react-bootstrap-typeahead';

import { searchUsers } from '../../api/resources'; // this component to be store it in internal state - no reason to expose this to a state

export class AddUser extends Component {
  static deafultProps() {
    return { onSubmit: () => {}, existingUsers: [] };
  }

  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      options: [],
      isActive: false,
      selected: [],
    };
    this.search = this.search.bind(this);
    this.onSelect = this.onSelect.bind(this);
    this.activate = this.activate.bind(this);
    this.deactivate = this.deactivate.bind(this);
    this.filterBy = this.filterBy.bind(this);
  }

  render() {
    const {
      isActive, isLoading, selected, options,
    } = this.state;
    return (
      isActive
        ? (
          <div className="lw-table-input">
            <AsyncTypeahead
              isLoading={ isLoading }
              onSearch={ this.search }
              selected={ selected }
              options={ options }
              labelKey="name"
              promptText="Start to input user name"
              onBlur={ this.deactivate }
              onChange={ this.onSelect }
              filterBy={ this.filterBy }
              selectHintOnEnter
              autoFocus
              bsSize="sm"
            />
          </div>
        )
        : (
          <div onClick={ this.activate }>
            Click to input user name
          </div>
        )
    );
  }

  activate() {
    this.setState({ isActive: true });
  }

  deactivate() {
    this.setState({ isActive: false });
  }

  onSelect([{ name }]) {
    this.props.onSubmit(name);
    this.deactivate();
  }

  async search(filter) {
    this.setState({ isLoading: true });

    try {
      const users = await searchUsers({ filter });
      this.setState({ options: users });
    } catch (error) {
      this.setState({ error });
    }

    this.setState({ isLoading: false });
  }

  filterBy(option) {
    return !this.props.existingUsers.includes(option.name);
  }
}
