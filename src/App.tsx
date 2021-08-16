import React, { useState } from "react";
import useTimer from "./useTimer";

import styles from "./button.module.css";

import "./App.css";

function App() {
  const [completed, setCompleted] = useState(0);

  const onComplete = () => {
    setCompleted((completed) => completed + 1);
  };

  const timer = useTimer({ length: 10 * 1000 * 60, onComplete });

  const Button: React.FC<any> = (props) => <button className={styles.button} {...props}></button>;
  return (
    <div className="App">
      <header className="App-header">
        <h2>Timers completed: {completed}</h2>
        <h2>{timer.value}</h2>
        <div>
          <Button onClick={timer.start}>Start</Button>
          <Button onClick={timer.stop}>Stop</Button>
        </div>
        <div>
          <Button onClick={timer.skip}>Skip</Button>
          <Button onClick={timer.reset}>Reset</Button>
        </div>
      </header>
    </div>
  );
}

export default App;
