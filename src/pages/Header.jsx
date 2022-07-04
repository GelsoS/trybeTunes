import React from 'react';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

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
        <p data-testid="header-user-name">{user}</p>

      </header>
    );
  }
}
export default Header;
