import styles from "./App.module.css";
import Screen from "./components/Screen";
import Board from "./components/Board";
import Signature from "./components/Signature";

function App() {


    return (
        <div className={ styles.App }>
            <Screen />
            <Board />
            <Signature />
        </div>
    );
}

export default App;
