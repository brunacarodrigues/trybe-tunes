import React, { Component } from 'react';
import Header from '../components/Header';

class Search extends Component {
  state = {
    buttonDisabled: true,
  };

  buttonValidation = (event) => {
    const minChars = 2;
    const buttonValid = event.target.value.length >= minChars;
    this.setState({ buttonDisabled: !buttonValid });
  };

  render() {
    const { buttonDisabled } = this.state;

    return (
      <div data-testid="page-search">
        <Header />
        <div className="search-container">
          <label htmlFor="name-artist">
            <input
              type="text"
              name="artist"
              placeholder="nome do artista"
              data-testid="search-artist-input"
              onChange={ this.buttonValidation }
            />
            <button
              type="button"
              data-testid="search-artist-button"
              disabled={ buttonDisabled }
            >
              Pesquisar
            </button>
          </label>
        </div>
      </div>
    );
  }
}

export default Search;
