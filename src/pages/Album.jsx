import React from 'react';
import PropTypes from 'prop-types';
import getMusics from '../services/musicsAPI';
import Header from './Header';
import './styles/musicas.css';

class Album extends React.Component {
  constructor() {
    super();
    this.music = this.music.bind(this);
    this.MusicCard = this.MusicCard.bind(this);

    this.state = {
      musics: [],
      filtro: [],
    };
  }

  componentDidMount() {
    this.music();
  }

  async music() {
    const { match: { params: { id } } } = this.props;
    const [artista, ...resto] = await getMusics(id);

    this.setState(
      {
        filtro: artista,
        musics: resto, // musicas.filter((a) => a.wrapperType === 'track'),
      },
    );
  }

  MusicCard() {
    const { musics, filtro } = this.state;

    if (musics.length > 0) {
      return (
        <div>
          <div className="album">
            <img src={ filtro.artworkUrl100 } alt={ filtro.artistName } />
            <p data-testid="artist-name">{filtro.artistName}</p>
            <p data-testid="album-name">{filtro.collectionName}</p>
          </div>
          <div className="musicas">
            { musics.map((p, i) => (
              <div key={ i } className="audio">
                <p>{p.trackName}</p>
                <audio
                  data-testid="audio-component"
                  src={ p.previewUrl }
                  controls
                >
                  <track kind="captions" />
                </audio>
              </div>
            ))}
          </div>
        </div>
      );
    }
  }

  render() {
    return (
      <div data-testid="page-album">
        <Header />
        {this.MusicCard()}
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};
export default Album;
