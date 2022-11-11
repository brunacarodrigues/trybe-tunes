import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Loading from '../components/Loading';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';

class Album extends Component {
  state = {
    loading: true,
    musics: [],
  };

  async componentDidMount() {
    this.requestMusics();
  }

  requestMusics = async () => {
    this.setState({ loading: true });
    const { match } = this.props;
    const { params } = match;
    const { id } = params;
    const musics = await getMusics(id);
    this.setState({
      loading: false,
      musics,
    });
  };

  allMusics = (musics) => {
    const resultMusics = musics.slice(1).map((music, index) => (
      <MusicCard
        key={ index }
        music={ music }
        trackId={ music.trackId }
        trackName={ music.trackName }
        previewUrl={ music.previewUrl }
      />));
    return resultMusics;
  };

  render() {
    const { loading, musics } = this.state;

    return (
      <>
        <div data-testid="page-album">Album</div>
        <Header />
        { loading ? <Loading /> : (
          <div>
            { musics.length === 0 ? <Loading /> : (
              <div>
                <p data-testid="artist-name">
                  Artista:
                  {' '}
                  { musics[0].artistName}
                </p>
                <p data-testid="album-name">
                  Album:
                  {' '}
                  { musics[0].collectionName}
                </p>
                {this.allMusics(musics)}
              </div>
            )}
          </div>
        ) }
      </>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  }).isRequired,
};

export default Album;
