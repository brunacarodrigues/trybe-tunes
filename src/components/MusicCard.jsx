import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Loading from './Loading';
import { addSong, getFavoriteSongs } from '../services/favoriteSongsAPI';

class MusicCard extends Component {
  state = {
    loading: false,
    isFavorite: false,
  };

  async componentDidMount() {
    const { trackId } = this.props;
    const favoriteSongs = await getFavoriteSongs();
    favoriteSongs.forEach((song) => {
      if (+song.trackId === trackId) {
        this.setState({ isFavorite: true });
      }
    });
  }

  listFavorites = async ({ target }) => {
    this.setState({
      loading: true,
      isFavorite: true,
    });
    const { checked } = target;
    if (checked) {
      await addSong(this.props);
    }
    this.setState({
      loading: false,
    });
  };

  render() {
    const { loading, isFavorite } = this.state;
    const { trackName, previewUrl, trackId } = this.props;

    return (
      <div>
        <p>{ trackName }</p>
        <div>
          <audio data-testid="audio-component" src={ previewUrl } controls>
            <track kind="captions" />
            O seu navegador não suporta o elemento
            {' '}
            {' '}
            <code>audio</code>
            .
          </audio>
          <label htmlFor="{ trackId }">
            Favorita
            <input
              type="checkbox"
              id={ trackId }
              name="favorite"
              data-testid={ `checkbox-music-${trackId}` }
              onChange={ this.listFavorites }
              checked={ isFavorite }
            />
          </label>
        </div>
        { loading && <Loading /> }
      </div>
    );
  }
}

MusicCard.propTypes = {
  trackName: PropTypes.string.isRequired,
  previewUrl: PropTypes.string.isRequired,
  trackId: PropTypes.number.isRequired,
};

export default MusicCard;
