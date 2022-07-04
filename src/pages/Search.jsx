import React from 'react';
import Header from './Header';

class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      botao: true,
      input: '',
    };
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

  render() {
    const { botao } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        <p>Component Search</p>
        <form>
          <input
            type="text"
            data-testid="search-artist-input"
            onChange={ (m) => this.input(m.target.value) }
          />
          <button
            data-testid="search-artist-button"
            type="button"
            disabled={ botao }
          >
            Pesquisar

          </button>
        </form>
      </div>
    );
  }
}
export default Search;
