import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

class Header extends Component {
  state = {
    name: {},
    loading: true,
  };

  async componentDidMount() {
    const userName = await getUser();
    this.setState({ name: userName.name, loading: false });
  }

  render() {
    const { name, loading } = this.state;
    if (loading) return (<Loading />);
    return (
      <header data-testid="header-component">
        {/* <div>{ loading && <Loading />}</div> pq não funciona? */}
        <p data-testid="header-user-name">{ name }</p>
        <Link to="/search" data-testid="link-to-search" />
        <Link to="/favorites" data-testid="link-to-favorites" />
        <Link to="/profile" data-testid="link-to-profile" />
      </header>
    );
  }
}

export default Header;
