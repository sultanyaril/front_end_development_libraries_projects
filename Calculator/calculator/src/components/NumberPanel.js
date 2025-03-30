import OperationButton from './OperationButton'

function NumberPanel() {
    return (
        <div className="NumberPanel">
            <OperationButton operation={"7"} />
            <OperationButton operation={"8"} />
            <OperationButton operation={"9"} />

            <OperationButton operation={"4"} />
            <OperationButton operation={"5"} />
            <OperationButton operation={"6"} />

            <OperationButton operation={"1"} />
            <OperationButton operation={"2"} />
            <OperationButton operation={"3"} />

            <OperationButton operation={"0"} />
            <OperationButton operation={"."} />







        </div>
    )
}

export default NumberPanel;