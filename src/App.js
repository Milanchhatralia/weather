import React from 'react';

import './sass/main.scss';
import Weather from './components/Weather';
import Search from './components/Search';

function App() {
  const [place, setPlace] = React.useState(localStorage.getItem("weather-place"));
  
  return (
    <div className="App wrapper">
      <Search setPlace={setPlace} />
      <Weather place={place}/>
    </div>
  );
}

export default App;
