import React from 'react';
import PropTypes from 'prop-types';
import { getUser, updateUser } from '../services/userAPI';
import Header from './Header';
import Loading from './Loading';
import './styles/header.css';

class ProfileEdit extends React.Component {
  constructor() {
    super();
    this.editar = this.editar.bind(this);
    this.habilitar = this.habilitar.bind(this);
    this.salvar = this.salvar.bind(this);
    this.state = {
      load: false,
      botao: true,
      name: '',
      email: '',
      description: '',
      image: '',
    };
  }

  componentDidMount() {
    this.editar();
  }

  async editar() {
    this.setState(
      {
        load: true,
      },
    );
    const user = await getUser();
    this.setState(
      {
        load: false,
        name: user.name,
        email: user.email,
        description: user.description,
        image: user.image,
      },
    );
  }

  input(event) {
    this.setState(
      {
        [event.target.name]: event.target.value,
      }, this.habilitar,
    );
  }

  async salvar() {
    const { name, email, image, description } = this.state;
    const dados = { name, email, image, description };
    const { history: { push } } = this.props;
    this.setState(
      {
        load: true,
      },
    );
    await updateUser(dados);
    return push('/profile');
    // this.setState(
    //   {
    //     load: false,
    //  <Redirect to="/profile" />;
    // );
  }

  habilitar() {
    const { name, email, description, image } = this.state;
    if (name.length > 0
      && email.length > 0
      && description.length > 0
      && image.length > 0) {
      this.setState(
        {
          botao: false,
        },
      );
    } else {
      this.setState(
        {
          botao: true,
        },
      );
    }
  }

  render() {
    const { load, name, email, description, botao, image } = this.state;
    return (
      <div data-testid="page-profile-edit">
        <Header />
        {load ? <Loading />
          : (
            <form className="edit">
              <h3>Editar perfil</h3>
              <input
                value={ name }
                name="name"
                type="text"
                data-testid="edit-input-name"
                placeholder="nome"
                onChange={ (a) => this.input(a) }
              />
              <input
                value={ email }
                name="email"
                type="email"
                data-testid="edit-input-email"
                placeholder="Email"
                onChange={ (a) => this.input(a) }
              />
              <textarea
                value={ description }
                cols="18"
                rows="10"
                name="description"
                type="text"
                data-testid="edit-input-description"
                onChange={ (a) => this.input(a) }
                placeholder="descricao"
              />
              <input
                value={ image }
                name="image"
                type="text"
                placeholder="Url da imagem"
                data-testid="edit-input-image"
                onChange={ (a) => this.input(a) }

              />
              <button
                data-testid="edit-button-save"
                type="button"
                disabled={ botao }
                onClick={ this.salvar }
              >
                Salvar

              </button>
            </form>
          )}
      </div>
    );
  }
}
ProfileEdit.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};
export default ProfileEdit;
