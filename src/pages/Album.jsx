import React from 'react';
import PropTypes from 'prop-types';
import getMusics from '../services/musicsAPI';
import { addSong } from '../services/favoriteSongsAPI';
import Header from './Header';
import './styles/musicas.css';
import Loading from './Loading';

class Album extends React.Component {
  constructor() {
    super();
    this.music = this.music.bind(this);
    this.MusicCard = this.MusicCard.bind(this);
    this.favoriteS = this.favoriteS.bind(this);

    this.state = {
      musics: [],
      filtro: [],
      cheker: [],
      delay: false,
    };
  }

  componentDidMount() {
    this.music();
  }

  // componentDidUpdate(prevProps, prevState){

  // }

  condicao = async (obj, id) => {
    const { cheker } = this.state;
    if (cheker.some((e) => e.trackId !== id)) {
      this.setState(
        {
          delay: true,
        },
      );
      await addSong(obj);
      this.setState(
        {
          delay: false,
        },
      );
    }
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

  favoriteS(obj, id) {
    // const { cheker } = this.state;

    this.setState((prev) => (
      {
        cheker: [...prev.cheker, id],
      }), () => this.condicao(obj, id));

    // console.log(id);
    // this.setState((prev) => (
    //   {
    //     cheker: [...prev.cheker, id],
    //     delay: true,
    //   }), async () => {
    //   await addSong(obj);
    //   this.setState((
    //     {
    //       delay: false }));
    // });
    // console.log(obj);
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
