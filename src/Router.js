import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';

import Accueil from './pages/Accueil';
import Films from './pages/Films';
import Series from './pages/Series';
import AllFilms from './components/AllFilms';
import BestRatedFilms from './components/BestRatedFilms';
import Connexion from './pages/Connexion';
import Inscription from './pages/Inscription';
import Erreur from './pages/Erreur';

class Router extends Component {
  render() {
    return (
      <Switch>
        <Route path='/' exact component={ Accueil } />
        <Route path='/films' exact component={ Films } />
        <Route path='/series' exact component={ Series } />
        <Route path='/films/all' exact component={ AllFilms } />
        <Route path='/films/populaires' exact component={ BestRatedFilms } />
        <Route path='/connexion' exact component={ Connexion } />
        <Route path='/inscription' exact component={ Inscription } />
        <Route component={ Erreur } />
      </Switch>
    )
  }
}

export default Router;