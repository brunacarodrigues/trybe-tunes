import React, { Component } from 'react';
import Header from '../components/Header';

class Profile extends Component {
  render() {
    return (
      <>
        <div data-testid="page-profile">Profile</div>
        <Header />
      </>
    );
  }
}

export default Profile;
