import React from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Loading from './Loading';
import './styles/musicas.css';

class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      botao: true,
      input: '',
      mostrar: true,
      loading: false,
      result: false,
    };
  }

  componentDidMount() {
    this.form();
  }

  input = (param) => {
    this.setState(
      {
        input: param,
      },
      this.activeB,
    );
  }

  activeB = () => {
    const { input } = this.state;
    if (input.length > 1) {
      return this.setState(
        {
          botao: false,
        },
      );
    }
    return this.setState(
      {
        botao: true,
      },
    );
  }

  limpar = async () => {
    const { input } = this.state;
    this.setState(
      {
        mostrar: false,
        loading: true,
      },
    );
    const musicas = await searchAlbumsAPI(input);
    this.setState(
      {
        mostrar: true,
        loading: false,
        result: true,
        musicas,
      },
    );
  }

 form = () => {
   const { mostrar, botao, input } = this.state;
   if (mostrar) {
     return (
       <form>
         <input
           type="text"
           data-testid="search-artist-input"
           onChange={ (m) => this.input(m.target.value) }
           placeholder="Nome do artista"
         />
         <button
           data-testid="search-artist-button"
           type="submit"
           disabled={ botao }
           value={ input }
           onClick={ this.limpar }
         >
           Pesquisar

         </button>
       </form>
     );
   }
 }

 array = () => {
   const { musicas } = this.state;
   return (
     <div className="musicas">
       { musicas.map((m, i) => (
         <div
           className="musica"
           key={ i }
         >
           <p>{i}</p>
           <img src={ m.artworkUrl100 } alt={ m.artistName } />
           <p><b>{m.collectionName}</b></p>
           <p>{m.artistName}</p>
           <p>{m.releaseDate}</p>
           <Link
             className="id"
             data-testid={ `link-to-album-${m.collectionId}` }
             to={ `/album/${m.collectionId}` }
           >
             Musicas
           </Link>
         </div>))}
     </div>);
 }

 resultado = () => {
   const { input, musicas } = this.state;

   return (

     <div>
       <p>
         Resultado de álbuns de:
         {' '}
         {input}
       </p>
       { musicas.length === 0
         ? 'Nenhum álbum foi encontrado'
         : this.array()}
     </div>
   );
 }

 render() {
   const { mostrar, loading, result } = this.state;
   return (
     <div data-testid="page-search">
       <Header />
       { mostrar && this.form()}
       { loading && <Loading />}
       { result && this.resultado()}
     </div>
   );
 }
}
export default Search;
