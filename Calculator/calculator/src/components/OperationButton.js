import Button from './Button';
import { useDispatch } from 'react-redux';
import { addOperation } from "../store";

function OperationButton({ operation }) {
    const dispatch = useDispatch();

    return (
        <div className="OperationButton">
            <Button label={ operation } onClick = { ()=>{ dispatch(addOperation(operation)) }} />
        </div>
    )
}

export default OperationButton;