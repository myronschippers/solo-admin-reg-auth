import React from 'react';
import NewUserForm from '../NewUserForm/NewUserForm';

// This is one of our simplest components
// It doesn't have local state, so it can be a function component.
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is, so it doesn't need 'connect()'

const InfoPage = () => (
  <div className="container">
    <h2>Info of Users</h2>

    {/* form content */}
    <NewUserForm />

    {/* list all users */}
    <p>List of Users</p>
  </div>
);

// If you needed to add local state or other things,
// you can make it a class component like:

/*
class InfoPage extends React.Component {

  render() {
    return (
      <div>
        <p>Info Page</p>
      </div>
    )
  }
}
*/
export default InfoPage;
