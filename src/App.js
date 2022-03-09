import React, { useState, useEffect } from 'react';

import { Box, Typography } from '@mui/material';
import Login from './components/Login';
import ThemeButton from './components/ThemeButton';
import Dashboard from './components/Dashboard/Dashboard';
import LanguageButton from './components/LanguageButton';

//Setting themes properties
const lightTheme = {
  condition: true,
  color: 'black',
  backgroundColor: 'white',
  inputColor: 'primary',
  icons: {
    width: '30px',
    height: '30px',
    border: '0.5px solid #ACACAC',
    borderRadius: '6px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    '&:hover': {
      cursor: 'pointer'
    }
  },
  backgroundHover: '#e1e1e1',
  cardBorderColor: '#808080'

}
const darkTheme = {
  condition: false,
  color: 'white',
  backgroundColor: '#0A1929',
  inputColor: 'secondary',
  icons: {
    width: '30px',
    height: '30px',
    border: '0.5px solid #FFFF',
    borderRadius: '6px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    '&:hover': {
      cursor: 'pointer'
    }
  },
  backgroundHover: 'black',
  cardBorderColor: 'white'
}

//Setting languge
const pt_BR = {
  login: {
    loginTitle: 'Entrar',
    loginText: 'Bem vindo ao teste para front end da WiiD!',
    userInputText: 'Usuário',
    passwordInputText: 'Senha',
    invalidUserText: 'Usuário inválido',
    invalidPasswordText: 'Senha inválida',
    loginButtonText: 'Entrar'
  },
  dashboard: {
    logoutButtonText: 'Sair',
    assignButton: 'Atribuir',
    archiveButton: 'Arquivar',
    scheduleButton: 'Agendar',
    searchInput: 'Pesquisar'
  }
};

const en = {
  login: {
    loginTitle: 'Login',
    loginText: "Welcome to WiiD's front end test!",
    userInputText: 'User',
    passwordInputText: 'Password',
    invalidUserText: 'Invalid user',
    invalidPasswordText: 'Invalid password',
  },
  dashboard: {
    logoutButtonText: 'Logout',
    assignButton: 'Assign',
    archiveButton: 'Archive',
    scheduleButton: 'Schedule',
  }
}

function App() {
  //Setting a theme state
  const [theme, setTheme] = useState(lightTheme)

  //Setting a language state
  const [lang, setLang] = useState(pt_BR);

  //Setting state for the data that will come from api
  const [menu, setMenu] = useState([]);

  useEffect(() => {
    //Getting data from menus API 
    fetch('http://my-json-server.typicode.com/workinideas/vagafrontendteste/menus')
      .then(res => res.json())
      .then(mn => setMenu(mn))
  }, [setMenu]);

  useEffect(() => {
    //Body background color set to theme color
    document.body.style.background = theme.backgroundColor;
  })

  //Login Info
  const database = [
    {
      username: 'Admin',
      password: 'Admin'
    }
  ];
  //Login condition
  const [isSubmitted, setIsSubmitted] = useState(false);


  return (
    <Box sx={{ height: '100vh', position: 'relative' }}>
      <ThemeButton
        theme={theme}
        setTheme={setTheme}
        darkTheme={darkTheme}
        lightTheme={lightTheme} />
      <LanguageButton
        lang={lang}
        setLang={setLang}
        pt_BR={pt_BR}
        en={en}
        theme={theme}
      />
      {isSubmitted ?
        <Dashboard
          theme={theme}
          menu={menu}
          setIsSubmitted={setIsSubmitted}
          lang={lang.dashboard} />
        :
        <Login theme={theme}
          users={database}
          setIsSubmitted={setIsSubmitted} lang={lang.login} />
      }

    </Box>
  );
}

export default App;
