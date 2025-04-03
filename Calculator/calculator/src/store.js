import { configureStore, createSlice } from '@reduxjs/toolkit';
import { evaluate } from 'mathjs'

// Create a slice of state with reducers
const stateSlice = createSlice({
    name: 'state',
    initialState: {
        string: "",
        lastAction: "0",
        finished: true
    },
    reducers: {
        addOperation: (state, action) => {
            if ( state.finished ) {
                state.finished = false;
                console.log(action);
                if (['+', '-', 'x', '/', '.'].includes(action.payload)) {
                    const split_string = state.string.split('=')
                    state.string = split_string[split_string.length-1] + action.payload;
                } else {
                    state.string = action.payload;
                }
            } else {
                if (state.string === '0' && action.payload==='0') {
                    return
                } else if (state.string === '0') {
                    state.string = action.payload;
                } else if (['+', '-', 'x', '/', '.'].includes(action.payload)
                    && ['+', '-', 'x', '/', '.'].includes(state.string[state.string.length-1])) {
                     state.string = state.string.substring(0, state.string.length-1) + action.payload;
                } else {
                    state.string += action.payload;
                }
            }
            state.lastAction = action.payload;
        },
        calculate: (state) => {
            if (state.finished) {
                return;
            }
            try {
                let result = evaluate(state.string.replace("x", "*"))
                const factor = Math.pow(10, Math.min(12, (result.toString().split('.')[1] || '').length));
                result = Math.ceil(result * factor) / factor;
                state.string = state.string + "=" + result;
                state.lastAction = result;
                state.finished = true;
            } finally {
                return;
            }
        },
        reset: (state) => {
            state.string = "";
            state.lastAction = "0";
            state.finished = true;
        }
    },
});

// Export actions
export const { addOperation, calculate, reset } = stateSlice.actions;

// Create the Redux store
const store = configureStore({
    reducer: {
        state: stateSlice.reducer,
    },
});

export default store;