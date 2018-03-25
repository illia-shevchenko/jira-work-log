import React, { Component } from 'react';

export class GroupInput extends Component {
  static defaultProps() {
    return {
      onSubmit() {},
    };
  }

  constructor(props) {
    super(props);

    this.state = { value: '', isActive: false };
    this.onChange = this.onChange.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
    this.activate = this.activate.bind(this);
    this.deactivate = this.deactivate.bind(this);
  }

  render() {
    const { value, isActive } = this.state;
    return (
      isActive
        ? (
          <input
            ref={ this.focus }
            className="lw-table-input"
            placeholder="Enter new groups'name"
            value={ value }
            onChange={ this.onChange }
            onKeyDown={ this.onKeyDown }
          />)
        : (
          <div
            onClick={ this.activate }
            className="lw-table-input__placeholder"
          >
            Click to add a group
          </div>
        )
    );
  }

  onChange({ target: { value } }) {
    this.setState({ value });
  }

  onKeyDown({ key }) {
    if (key === 'Enter') {
      this.props.onSubmit(this.state.value);
      this.deactivate();
    }
  }

  focus(input) {
    if (input) {
      input.focus();
    }
  }

  activate() {
    this.setState({ isActive: true });
  }

  deactivate() {
    this.setState({ isActive: false });
  }
}
