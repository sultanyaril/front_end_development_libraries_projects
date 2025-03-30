import styles from "./App.module.css";
import NumberPanel from "./components/NumberPanel";
import EqualButton from "./components/EqualButton";
import Screen from "./components/Screen";
import OperationButton from "./components/OperationButton";
import DeleteButton from "./components/DeleteButton";


function App() {
    return (
    <div className={ styles.App }>
      <Screen />
      <DeleteButton />
      <OperationButton operation={"/"} />
      <OperationButton operation={"x"} />
      <NumberPanel />
      <OperationButton operation={"-"} />
      <OperationButton operation={"+"} />
      <EqualButton />
    </div>
  );
}

export default App;
