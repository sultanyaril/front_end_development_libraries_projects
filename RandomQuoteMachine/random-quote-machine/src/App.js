import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import QuoteBox from "./components/QuoteBox";
import {getRandomColor} from "./shared/utils";

const App = () => {
  const [color, setColor] = React.useState(getRandomColor());

  const app_style = {
    backgroundColor: color,
    color: color
  }

  return (
      <div id="app" style={app_style}>
        <QuoteBox colorUpdater={setColor} color={color} />
        <div id="signature">by sultanyaril</div>
      </div>
  );

}

export default App;