import PropTypes from 'prop-types';
import React, { Component } from 'react';
import './Login.css';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import logo from '../trivia.png';
import Input from '../components/Input';
import Button from '../components/Button';
import {
  savePlayerInfos,
  fetchQuestions,
  setScore,
  resetQuestions } from '../redux/actions';

class Login extends Component {
  constructor() {
    super();

    this.handleChange = this.handleChange.bind(this);
    this.handleButton = this.handleButton.bind(this);
    this.handleClick = this.handleClick.bind(this);

    this.state = {
      name: '',
      gravatarEmail: '',
      score: 0,
      assertions: 0,
    };
  }

  componentDidMount() {
    const { setScoreToZero, resetAllQuestions } = this.props;
    setScoreToZero();
    resetAllQuestions();
  }

  handleButton() {
    const { name, gravatarEmail } = this.state;
    if (name.length === 0 || gravatarEmail.length === 0) return true;
    return false;
  }

  handleChange({ target: { name, value } }) {
    this.setState({ [name]: value });
  }

  saveKeyPlayer() {
    localStorage.setItem('state', JSON.stringify({ player: { ...this.state } }));
  }

  async handleClick() {
    const { history, dispatchPlayerInfo, receiveQuestions } = this.props;
    const { name, gravatarEmail } = this.state;
    dispatchPlayerInfo({ name, gravatarEmail });
    this.saveKeyPlayer();
    receiveQuestions();
    history.push('/trivia');
  }

  render() {
    const { name, gravatarEmail } = this.state;
    return (
      <div className="containerLogin">
        <div className="boxLogin">
          <img src={ logo } className="App-logo" alt="logo" />
          <Input
            label=""
            type="text"
            name="name"
            value={ name }
            onChange={ this.handleChange }
            placeholder="Digite seu nome"
            datatestid="input-player-name"
            className="InputName"
          />
          <Input
            label=""
            type="email"
            name="gravatarEmail"
            value={ gravatarEmail }
            onChange={ this.handleChange }
            placeholder="Digite seu e-mail"
            datatestid="input-gravatar-email"
            className="InputEmail"
          />
          <Button
            buttonText="Jogar"
            disabled={ this.handleButton() }
            datatestid="btn-play"
            onClick={ this.handleClick }
            className="btnLogin"
          />
          <Link to="/settings" className="linkBtn">
            <Button
              buttonText="Configura????es"
              datatestid="btn-settings"
              className="btnConfg"
            />
          </Link>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  dispatchPlayerInfo: PropTypes.func.isRequired,
  history: PropTypes.objectOf(PropTypes.any).isRequired,
  receiveQuestions: PropTypes.func.isRequired,
  resetAllQuestions: PropTypes.func.isRequired,
  setScoreToZero: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  dispatchPlayerInfo: (login) => dispatch(savePlayerInfos(login)),
  receiveQuestions: () => dispatch(fetchQuestions()),
  setScoreToZero: () => dispatch(setScore()),
  resetAllQuestions: () => dispatch(resetQuestions()),
});

export default connect(null, mapDispatchToProps)(Login);
