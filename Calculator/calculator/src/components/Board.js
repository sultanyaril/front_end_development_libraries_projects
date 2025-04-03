import styles from "./Board.module.css";
import { Button } from "primereact/button";
import { addOperation, calculate, reset } from "../store";
import { useDispatch } from "react-redux";

const layout = [
    "/", "x",
    "7", "8", "9", "-",
    "4", "5", "6", "+",
    "1", "2", "3"
]

function Board() {
    const dispatch = useDispatch();

    return (
        <div className={ styles.Board } >
            <Button label={"AC"} severity="danger" className={styles.deleteButton} onClick = {()=>{ dispatch(reset()) }} />
            {
                layout.map((item) =>
                    <Button label={item}
                            severity={(['/', 'x', '-', '+'].includes(item))?"warning":"secondary"}
                            onClick={()=>dispatch(addOperation(item))} />)
            }
            <Button label={"0"} severity="secondary" className={styles.zeroButton} onClick={()=>dispatch(addOperation("0"))} />
            <Button label={"."} severity="secondary" onClick={()=>dispatch(addOperation("."))}/>
            <Button label={"="} className={styles.equalButton} onClick={()=>dispatch(calculate())} />
        </div>
    )
}

export default Board;