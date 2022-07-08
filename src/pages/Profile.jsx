import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Header from './Header';
import Loading from './Loading';
import './styles/header.css';

class Profile extends React.Component {
  constructor() {
    super();
    this.perfil = this.perfil.bind(this);
    this.state = {
      loading: false,
      nome: '',
      email: '',
      image: '',
      description: '',
    };
  }

  componentDidMount() {
    this.perfil();
  }

  async perfil() {
    this.setState(
      {
        loading: true,
      },
    );
    const user = await getUser();
    this.setState(
      {
        loading: false,
        nome: user.name,
        email: user.email,
        image: user.image,
        description: user.description,
      },
    );
  }

  render() {
    const { loading, nome, email, image, description } = this.state;
    return (
      <div data-testid="page-profile">
        <Header />
        {loading && <Loading /> }
        <div className="perfil">
          <img src={ image } alt="foto" data-testid="profile-image" />
          <Link to="/profile/edit" className="link">Editar perfil</Link>

          <p>{nome}</p>
          <p>{email}</p>
          <p>{description}</p>
        </div>
      </div>
    );
  }
}
export default Profile;
