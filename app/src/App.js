import React from 'react';
import PhoneBookListContainer from './components/PhoneBookListContainer';
import AppBar from './components/AppBar'

const App = () => {
  return (
    <React.Fragment>
      <AppBar/>
      <PhoneBookListContainer/>
    </React.Fragment>
  )
};

export default App;
