import React, { Component } from 'react';

export class GroupInput extends Component {
  static defaultProps() {
    return {
      onSubmit() {},
    };
  }

  constructor(props) {
    super(props);

    this.state = { value: '' };
    this.onChange = this.onChange.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
  }

  render() {
    return (
      <input
        className="lw-table-input"
        placeholder="Enter new groups'name"
        value={ this.state.value }
        onChange={ this.onChange }
        onKeyDown={ this.onKeyDown }
      />
    );
  }

  onChange({ target: { value } }) {
    this.setState({ value });
  }

  onKeyDown({ key }) {
    if (key === 'Enter') {
      this.props.onSubmit(this.state.value);
      this.setState({ value: '' });
    }
  }
}
