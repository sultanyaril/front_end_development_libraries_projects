import styles from './Screen.module.css';
import { useSelector } from 'react-redux';

function Screen() {
    const state = useSelector((state) => state.state);

    return (
        <div className={ styles.Screen }>
            <div className={ styles.current_calculation }>{ state.string }</div>
            <div className={ styles.last_action }>{ state.lastAction }</div>
        </div>
    )
}

export default Screen;