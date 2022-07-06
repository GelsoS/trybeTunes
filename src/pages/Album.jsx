import React from 'react';
import PropTypes from 'prop-types';
import getMusics from '../services/musicsAPI';
import { addSong, getFavoriteSongs } from '../services/favoriteSongsAPI';
import Header from './Header';
import './styles/musicas.css';
import Loading from './Loading';

class Album extends React.Component {
  constructor() {
    super();
    this.music = this.music.bind(this);
    this.MusicCard = this.MusicCard.bind(this);
    this.favoriteS = this.favoriteS.bind(this);
    this.getSongs = this.getSongs.bind(this);

    this.state = {
      musicas: '',
      musics: [],
      filtro: [],
      cheker: [],
      delay: false,
    };
  }

  componentDidMount() {
    this.music();
    this.getSongs();
  }

  async getSongs() {
    this.setState(
      {
        delay: false,
      },
    );
    const musicas = await getFavoriteSongs();
    this.setState((prev) => (
      {
        musicas: [...prev.musicas, ...musicas],
        cheker: [...musicas.map((a) => a.trackId)],
        delay: false,
      }), this.favoriteS);
    // console.log('musicas-->  ',this.state.musicas);
    // console.log('chekcers--> ',this.state.cheker);
  }

  async music() {
    const { match: { params: { id } } } = this.props;
    const [artista, ...resto] = await getMusics(id);

    this.setState(
      {
        filtro: artista,
        musics: resto,
      },
    );
  }

  async favoriteS(obj, id) {
    this.setState((prev) => (
      {
        cheker: [...prev.cheker, id],
        delay: true,
      }));
    await addSong(obj);
    this.setState(
      {
        delay: false,
      },
    );
  }

  MusicCard() {
    const { musics, filtro, cheker } = this.state;
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
                <label htmlFor="favorita">
                  Favorita
                  {' '}
                  <input
                    data-testid={ `checkbox-music-${p.trackId}` }
                    type="checkbox"
                    checked={ cheker.includes(p.trackId) }
                    onChange={ () => this.favoriteS(musics[i], p.trackId) }
                  />

                </label>
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
    const { delay } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        {delay ? <Loading /> : this.MusicCard()}
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
