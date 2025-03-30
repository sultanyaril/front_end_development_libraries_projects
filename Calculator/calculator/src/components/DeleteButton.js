import Button from './Button';
import { useDispatch } from 'react-redux';
import { reset } from "../store";

function DeleteButton() {
    const dispatch = useDispatch();

    return (
        <div className="DeleteButton">
            <Button label={"AC"} onClick={() => {dispatch(reset())}} />
        </div>
    )
}

export default DeleteButton;