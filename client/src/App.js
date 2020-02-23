import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import LocalizedStrings from 'react-localization';
import Sports from './components/sports';
import Events from './components/events';
import Outcomes from './components/outcomes';
import './App.css';
import translations from './translations';
import { AppProvider } from './appContext'

const myTranslations = new LocalizedStrings(translations);

export default function App() {
  const [language, setLanguage] = React.useState('en');
  myTranslations.setLanguage(language);

  function handleLanguageChange(e) {
    e.preventDefault();
    let lang = e.target.value;
    setLanguage(lang);
  }

  return (
    <div>
      <div>
        Change Language: <select onChange={handleLanguageChange}>
          <option value="en">En- English</option>
          <option value="pt">Pt- Portuguese</option>
        </select>
      </div>
      <AppProvider value={myTranslations}>
        <Router>
          <Switch>
            <Route path="/" exact>
              <Redirect from="/*" to="/sports" />
            </Route>
            <Route path="/sports" exact component={Sports}></Route>
            <Route path="/sports/:sportId" exact component={Events}></Route>
            <Route path="/sports/:sportId/events/:eventId" exact component={Outcomes}></Route>
          </Switch>
        </Router >
      </AppProvider>
    </div >
  );
}





