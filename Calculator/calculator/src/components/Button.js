import { Button as PrimeReactButton } from 'primereact/button';
import styles from './Button.module.css';

function Button({ label, onClick }) {
    return(
        <div className={ styles.Button }>
            <PrimeReactButton className={styles.PrimeReactButton}
                              label={label}
                              onClick={onClick} />
        </div>
    )
}

export default Button;