import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { createUser } from '../services/userAPI';
import Loading from '../components/Loading';

class Login extends Component {
  state = {
    buttonDisabled: true,
    loading: false,
  };

  buttonValidation = (event) => {
    const minChars = 3;
    const buttonValid = event.target.value.length >= minChars;
    this.setState({ buttonDisabled: !buttonValid });
  };

  validUser = async () => {
    this.setState({ buttonDisabled: true, loading: true });
    const inputName = document.getElementById('login-name').value;
    await createUser({ name: inputName });
    this.setState({ buttonDisabled: false, loading: false });
    const { history } = this.props;
    history.push('/search');
  };

  submitClickButton = (event) => {
    event.preventDefault();
    this.validUser();
  };

  render() {
    const { buttonDisabled, loading } = this.state;
    return (
      <div data-testid="page-login">
        <div className="loading-container">
          { loading && <Loading /> }
        </div>

        <form className="login-form" onSubmit={ this.submitClickButton }>
          <label htmlFor="login-name">
            <input
              type="text"
              name="name"
              id="login-name"
              data-testid="login-name-input"
              placeholder="Insira seu nome"
              onChange={ this.buttonValidation }
            />
          </label>
          <button
            type="button"
            data-testid="login-submit-button"
            disabled={ buttonDisabled }
            onClick={ this.validUser }
          >
            Entrar
          </button>
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Login;
