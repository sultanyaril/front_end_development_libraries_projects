import styles from "./Editor.module.css"
import { useSelector, useDispatch } from 'react-redux';
import { change } from "../store";

const Editor = () => {

    const rawMarkdown = useSelector((state) => state.markdown.value);
    const dispatch = useDispatch();

    return (
        <div className={ styles.Editor }>
            <textarea onChange={ (e) => dispatch(change(e.target.value)) }
                      value={ rawMarkdown }
                      id="editor">
                { rawMarkdown }
            </textarea>
        </div>
    )
}

export default Editor;