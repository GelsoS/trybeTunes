import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from './Loading';
import './styles/header.css';

class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      msg: false,
      user: '',
    };
  }

  componentDidMount() {
    this.setState(
      {
        msg: true,
      },
    );
    this.user();
  }

  user = async () => {
    const nome = await getUser();
    this.setState(
      {
        msg: false,
        user: nome.name,
      },
    );
  };

  render() {
    const { msg, user } = this.state;

    return (
      <header data-testid="header-component">
        {msg && <Loading /> }
        <p data-testid="header-user-name" className="headerNome">{user}</p>

        <nav>
          <ul className="ul">
            <li>
              <Link
                className="links"
                data-testid="link-to-search"
                to="/search"
              >
                Pesquisar

              </Link>
            </li>
            <li>
              <Link
                className="links"
                data-testid="link-to-favorites"
                to="/favorites"
              >
                Favoritos

              </Link>
            </li>
            <li>
              <Link
                className="links"
                data-testid="link-to-profile"
                to="/profile"
              >
                Perfil

              </Link>
            </li>
          </ul>
        </nav>
      </header>
    );
  }
}
export default Header;
