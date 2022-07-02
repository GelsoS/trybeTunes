import React from 'react';
import PropTypes from 'prop-types';
import { createUser } from '../services/userAPI';
import Loading from './Loading';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      input: '',
      habilitado: true,
      loading: false,
    };
  }

  nome =(ev) => {
    this.setState(
      {
        input: ev.target.value,
      },
      this.habilitar,
    );
  }

  habilitar = () => {
    const { input } = this.state;
    if (input.length > 2) {
      return this.setState(
        {
          habilitado: false,
        },
      );
    }
    return this.setState(
      {
        habilitado: true,
      },
    );
  }

  log = async () => {
    const { input } = this.state;
    const { history: { push } } = this.props;
    this.setState({
      loading: true,
    });
    await createUser({ name: input });
    return push('/search');
  }

  render() {
    const { habilitado, loading } = this.state;
    return (
      <div
        data-testid="page-login"
      >

        <form>
          {loading ? <Loading /> : ''}
          <label htmlFor="login">
            Nome:
            <input
              name="input"
              type="text"
              data-testid="login-name-input"
              placeholder="Nome"
              onChange={ (e) => this.nome(e) }
            />
          </label>

          <button
            disabled={ habilitado }
            type="button"
            data-testid="login-submit-button"
            onClick={ this.log }
          >
            Entrar
          </button>

        </form>
      </div>
    );
  }
}
Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};
export default Login;
