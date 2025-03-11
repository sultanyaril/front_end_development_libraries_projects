import styles from './Previewer.module.css'
import { useSelector } from 'react-redux';
import { marked } from "https://cdn.jsdelivr.net/npm/marked/lib/marked.esm.js";

const Previewer = () => {
    const rawMarkdown = useSelector((state) => state.markdown.value);

    return (
        <div className={ styles.Previewer }>
            <div dangerouslySetInnerHTML={{__html: marked(rawMarkdown)}}
                 className={"markdown-body " + styles.processedMarkdown}
                 id="preview"/>
        </div>
    )
}

export default Previewer;