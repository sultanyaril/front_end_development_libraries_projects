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
                if (action in ['+', '-', '*', '/', '.']) {
                    state.string = state.string.split('=')[-1] + action;
                } else {
                    state.string = action.payload;
                }
            } else {
                state.string += action.payload;
            }
            state.lastAction = action.payload;
        },
        calculate: (state) => {
            if (state.finished) {
                return;
            }
            const result = evaluate(state.string.replace("x", "*"))
            state.string = state.string + "=" + result;
            state.lastAction = result;
            state.finished = true;
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