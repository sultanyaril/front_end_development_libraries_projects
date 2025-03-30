import Button from './Button';
import { useDispatch } from 'react-redux';
import { calculate } from "../store";

function EqualButton() {
    const dispatch = useDispatch();

    return (
        <div className="EqualButton">
            <Button label={"="} onClick={ ()=>{dispatch(calculate()) }} />
        </div>
    )
}

export default EqualButton;