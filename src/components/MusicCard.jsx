import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Loading from './Loading';

class MusicCard extends Component {
  state = {
    loading: false,
  };

  render() {
    const { loading } = this.state;
    const { trackName, previewUrl } = this.props;

    return (
      <div>
        { loading && <Loading /> }
        <div>
          <p>{ trackName }</p>
          <audio data-testid="audio-component" src={ previewUrl } controls>
            <track kind="captions" />
            O seu navegador não suporta o elemento
            {' '}
            {' '}
            <code>audio</code>
            .
          </audio>
        </div>
      </div>
    );
  }
}

MusicCard.propTypes = {
  trackName: PropTypes.string.isRequired,
  previewUrl: PropTypes.string.isRequired,
};

export default MusicCard;
