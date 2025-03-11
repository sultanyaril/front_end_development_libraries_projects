import styles from './Window.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFreeCodeCamp } from '@fortawesome/free-brands-svg-icons'
import { faMaximize } from '@fortawesome/free-solid-svg-icons'


const Window = ({header, content, width}) => {

    const windowStyle = {
        width: width
    }

    return (
        <div className={ styles.WindowWrapper }>
                <div className={styles.Window }
                     style={ windowStyle }>
                <div className={ styles.header }>
                    <div className={ styles.headerName }><FontAwesomeIcon icon={ faFreeCodeCamp }/> {header}</div>
                    <div className={ styles.expandButton }><FontAwesomeIcon icon={ faMaximize } /></div>
                </div>
                <div className={ styles.content }>
                    { content }
                </div>
            </div>
        </div>
    )
}

export default Window;