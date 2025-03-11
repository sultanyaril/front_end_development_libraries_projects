import styles from './App.module.css';
import Window from "./components/Window";
import Previewer from "./components/Previewer";
import Editor from "./components/Editor";


function App() {
  return (
    <div className={ styles.App }>
        <Window header="Editor"
                content={<Editor />}
                width={500}/>
        <Window header="Previewer"
                content={<Previewer />}
                width={700}/>
    </div>
  );
}

export default App;
