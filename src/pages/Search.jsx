import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Loading from '../components/Loading';

class Search extends Component {
  state = {
    buttonDisabled: true,
    characterInput: '',
    artistName: '',
    MessageTime: false,
    data: [],
  };

  buttonValidation = () => {
    const minChars = 2;
    const { characterInput } = this.state;
    const buttonValid = characterInput.length >= minChars;
    this.setState({ buttonDisabled: !buttonValid });
  };

  inputChange = ({ target }) => {
    this.setState({
      characterInput: target.value,
    }, this.buttonValidation);
  };

  requestArtist = async () => {
    this.setState({ MessageTime: true });
    const { characterInput } = this.state;
    const response = await searchAlbumsAPI(characterInput);
    this.setState({
      MessageTime: false,
      data: response,
    });
  };

  inputClear = () => {
    const { characterInput } = this.state;
    this.requestArtist();
    this.setState({
      artistName: characterInput,
      characterInput: '',
    });
  };

  render() {
    const { buttonDisabled, characterInput, data, MessageTime, artistName } = this.state;

    return (
      <div data-testid="page-search">
        <Header />
        { MessageTime ? <Loading /> : (
          <div className="search-container">
            <label htmlFor="name-artist">
              <input
                type="text"
                name="characterInput"
                value={ characterInput }
                placeholder="nome do artista"
                data-testid="search-artist-input"
                onChange={ this.inputChange }
              />
              <button
                type="button"
                data-testid="search-artist-button"
                disabled={ buttonDisabled }
                onClick={ this.inputClear }
              >
                Pesquisar
              </button>
            </label>
          </div>
        )}
        <p>
          Resultado de Álbuns de:
          {' '}
          { artistName }
        </p>
        { data.length === 0 ? <h3>Nenhum álbum foi encontrado</h3> : (
          <ul>
            {
              data.map((album) => (
                <li key={ album.collectionId }>
                  <Link
                    to={ `/album/${album.collectionId}` }
                    data-testid={ `link-to-album-${album.collectionId}` }
                  >
                    <p>{ album.collectionName }</p>
                  </Link>
                  <img src={ album.artworkUrl100 } alt={ album.artistName } />
                </li>
              ))
            }
          </ul>
        )}
      </div>
    );
  }
}

export default Search;
