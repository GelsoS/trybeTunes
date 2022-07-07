import React from 'react';
import { getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import Header from './Header';
import './styles/musicas.css';
import Loading from './Loading';

class Album extends React.Component {
  constructor() {
    super();
    this.MusicCard = this.MusicCard.bind(this);
    this.favoriteS = this.favoriteS.bind(this);
    this.getSongs = this.getSongs.bind(this);

    this.state = {
      musicas: '',
      cheker: [],
      delay: false,
    };
  }

  componentDidMount() {
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
      }));
  }

  async favoriteS(obj, id, checked) {
    if (checked === false) {
      this.setState(
        {
          delay: true,
        },
      );
      await removeSong(obj);
      this.setState((prev) => (
        {
          delay: false,
          cheker: [...prev.cheker.filter((a) => a !== id)],
          musicas: [...prev.musicas.filter((a) => a.trackId !== id)],
        }
      ));
    }
  }

  MusicCard() {
    const { musicas, cheker } = this.state;
    if (musicas.length > 0) {
      return (

        <div className="musicas">
          { musicas.map((p, i) => (
            <div key={ p.trackId } className="audio">
              <label htmlFor="Favorita">
                Favorita
                {' '}
                <input
                  id="Favorita"
                  data-testid={ `checkbox-music-${p.trackId}` }
                  type="checkbox"
                  checked={ cheker.includes(p.trackId) }
                  onChange={ (a) => this.favoriteS(musicas[i],
                    p.trackId, a.target.checked) }
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

export default Album;
