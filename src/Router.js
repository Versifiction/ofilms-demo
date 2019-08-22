import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';

import Accueil from './pages/Accueil';
import Films from './pages/Films';
import Series from './pages/Series';
import AfficheFilms from './components/films/AfficheFilms';
import DetailFilm from './components/films/DetailFilm';
import BestRatedFilms from './components/films/BestRatedFilms';
import TendancesFilms from './components/films/TendancesFilms';
import DetailSerie from './components/series/DetailSerie';
import BestRatedSeries from './components/series/BestRatedSeries';
import TendancesSeries from './components/series/TendancesSeries';
import Keyword from './components/keywords';
import DetailCompany from './components/company/DetailCompany';
import DetailPerson from './components/persons/DetailPerson';
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
        <Route path='/films/affiche' exact component={ AfficheFilms } />
        <Route path='/film/:id' exact component={ DetailFilm } />
        <Route path='/films/populaires' exact component={ BestRatedFilms } />
        <Route path='/films/tendances' exact component={ TendancesFilms } />
        <Route path='/serie/:id' exact component={ DetailSerie } />
        <Route path='/series/populaires' exact component={ BestRatedSeries } />
        <Route path='/series/tendances' exact component={ TendancesSeries } />
        <Route path='/person/:id' exact component={ DetailPerson } />
        <Route path='/keyword/:id' exact component={ Keyword } />
        <Route path='/company/:id' exact component={ DetailCompany } />
        <Route path='/connexion' exact component={ Connexion } />
        <Route path='/inscription' exact component={ Inscription } />
        <Route component={ Erreur } />
      </Switch>
    )
  }
}

export default Router;