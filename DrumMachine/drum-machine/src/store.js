import { configureStore, createSlice } from '@reduxjs/toolkit';

// Create a slice of state with reducers
const stateSlice = createSlice({
    name: 'state',
    initialState: { power: true,
                    lastAction: " ",
                    volume: 50,
                    piano: false},
    reducers: {
        togglePower: (state) => {
            state.power = !state.power;
        },
        changeAction: (state, action) => {
            state.lastAction = action.payload;
        },
        changeVolume: (state, action) => {
            state.volume = action.payload;
        },
        togglePiano: (state) => {
            state.piano = !state.piano;
        },
    },
});

// Export actions
export const { togglePower, changeAction, changeVolume, togglePiano } = stateSlice.actions;

// Create the Redux store
const store = configureStore({
    reducer: {
        state: stateSlice.reducer,
    },
});

export default store;