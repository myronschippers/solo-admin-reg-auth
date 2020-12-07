import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';

// CUSTOM COMPONENTS
import RegisterForm from '../RegisterForm/RegisterForm';

class RegisterPage extends Component {
  state = {
    username: '',
    password: '',
  };

  componentDidMount() {
    console.log('TEMP KEY:', this.props.match.params.tempKey);
    this.props.dispatch({
      type: 'GET_TEMP_USER',
      payload: {
        tempId: this.props.match.params.tempKey,
      },
    });
  }

  render() {
    return (
      <div className="container">
        {this.props.store.errors.registrationMessage !== 'NOT AVAILABLE' ? (
          <RegisterForm tempKey={this.props.match.params.tempKey} />
        ) : (
          <p>Please contact system Admin.</p>
        )}
      </div>
    );
  }
}

export default connect(mapStoreToProps)(RegisterPage);
