import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';

class NewUserForm extends Component {
  state = {
    first_name: '',
    last_name: '',
    email: '',
    role_id: '',
  };

  componentDidMount() {
    this.props.dispatch({
      type: 'GET_ROLES',
    });
  }

  submitNewUser = (event) => {
    event.preventDefault();
    this.props.dispatch({
      type: 'POST_TEMP_USER',
      payload: { user: this.state },
    });
    this.setState({
      first_name: '',
      last_name: '',
      email: '',
      role_id: '',
    });
  };

  handleInputChangeFor = (propertyName) => (event) => {
    this.setState({
      [propertyName]: event.target.value,
    });
  };

  render() {
    return (
      <div>
        <h3>Add New User</h3>
        <form onSubmit={this.submitNewUser}>
          <label htmlFor="first_name">
            First Name:
            <input
              type="text"
              name="first_name"
              required
              value={this.state.first_name}
              onChange={this.handleInputChangeFor('first_name')}
            />
          </label>

          <label htmlFor="last_name">
            Last Name:
            <input
              type="text"
              name="last_name"
              required
              value={this.state.last_name}
              onChange={this.handleInputChangeFor('last_name')}
            />
          </label>

          <label htmlFor="email">
            Email:
            <input
              type="email"
              name="email"
              required
              value={this.state.email}
              onChange={this.handleInputChangeFor('email')}
            />
          </label>

          <label htmlFor="role">
            User's Role:
            <select
              name="role"
              required
              value={this.state.role_id}
              onChange={this.handleInputChangeFor('role_id')}
            >
              <option value="">Select a Role</option>
              {this.props.store.roles.map((item, index) => {
                return (
                  <option key={index} value={item.id}>
                    {item.label}
                  </option>
                );
              })}
            </select>
          </label>

          <div>
            <button className="btn">Save</button>
          </div>
        </form>

        <p>{JSON.stringify(this.state)}</p>
      </div>
    );
  }
}

export default connect(mapStoreToProps)(NewUserForm);
