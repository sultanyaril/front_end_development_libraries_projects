import styles from './Board.module.css';
import SoundButton from './SoundButton';
import { InputSwitch } from 'primereact/inputswitch';
import { Slider } from 'primereact/slider';
import { useSelector, useDispatch } from 'react-redux';
import { togglePower, changeAction, changeVolume, togglePiano } from "../store";

const BASE_URL = "https://s3.amazonaws.com/freecodecamp/drums/";

const SOUNDS = [
    {
        name: 'Heater 1',
        soundUrl: `${BASE_URL}Heater-1.mp3`,
        altName: 'Chord 1',
        altSoundUrl: `${BASE_URL}Chord_1.mp3`,
        hotkey: "Q"
    },
    {
        name: 'Heater 2',
        soundUrl: `${BASE_URL}Heater-2.mp3`,
        altName: 'Chord 2',
        altSoundUrl: `${BASE_URL}Chord_2.mp3`,
        hotkey: "W"
    },
    {
        name: 'Heater 3',
        soundUrl: `${BASE_URL}Heater-3.mp3`,
        altName: 'Chord 3',
        altSoundUrl: `${BASE_URL}Chord_3.mp3`,
        hotkey: "E"
    },
    {
        name: 'Heater 4',
        soundUrl: `${BASE_URL}Heater-4_1.mp3`,
        altName: 'Give us a Light',
        altSoundUrl: `${BASE_URL}Give_us_a_light.mp3`,
        hotkey: "A"
    },
    {
        name: 'Clap',
        soundUrl: `${BASE_URL}Heater-6.mp3`,
        altName: 'Dry Ohh',
        altSoundUrl: `${BASE_URL}Dry_Ohh.mp3`,
        hotkey: "S"
    },
    {
        name: 'Open HH',
        soundUrl: `${BASE_URL}Dsc_Oh.mp3`,
        altName: 'Bld H1',
        altSoundUrl: `${BASE_URL}Bld_H1.mp3`,
        hotkey: "D"
    },
    {
        name: 'Kick n Hat',
        soundUrl: `${BASE_URL}Kick_n_Hat.mp3`,
        altName: 'Punchy Kick 1',
        altSoundUrl: `${BASE_URL}punchy_kick_1.mp3`,
        hotkey: "Z"
    },
    {
        name: 'Kick',
        soundUrl: `${BASE_URL}RP4_KICK_1.mp3`,
        altName: 'Side Stick 1',
        altSoundUrl: `${BASE_URL}side_stick_1.mp3`,
        hotkey: "X"
    },
    {
        name: 'Closed HH',
        soundUrl: `${BASE_URL}Cev_H2.mp3`,
        altName: 'Brk Snr',
        altSoundUrl: `${BASE_URL}Brk_Snr.mp3`,
        hotkey: "C"
    }
];


function groupIntoRows(items, itemsPerRow) {
    const rows = [];
    for (let i = 0; i < items.length; i += itemsPerRow) {
        rows.push(items.slice(i, i + itemsPerRow));
    }
    return rows;
}

function Board() {
    const groupedSounds = groupIntoRows(SOUNDS, 3);
    const state = useSelector((state) => state.state);
    const dispatch = useDispatch();

    return (
        <div className={styles.Board}>
            <div className={styles.buttons}>
                <table>
                    <tbody>
                        {groupedSounds.map((row, rowIndex) => (
                            <tr key={rowIndex}>
                                {row.map((sound, colIndex) => (
                                    <td key={colIndex}>
                                        <SoundButton sound={sound}/>
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className={styles.instruments}>
                <div className={ styles.instrumentContainer }>
                    <div className={ styles.instrumentTitle} >Power</div>
                    <InputSwitch checked={state.power}
                                 onChange={() => {
                                     dispatch(togglePower());
                                     dispatch(changeAction("Power" + (state.power ? " Off" : " On")))
                                 }} />
                </div>
                <div className={ styles.instrumentContainer }>
                    <div className={ styles.lastActionText }>{ state.lastAction }</div>
                </div>
                <div className={ styles.instrumentContainer }>
                    <Slider value={ state.volume }
                            onChange={(e) => {
                                dispatch(changeVolume(e.value));
                                dispatch(changeAction("Volume: " + e.value))
                            }}
                            className={ styles.volumeSlider }/>
                </div>
                <div className={ styles.instrumentContainer }>
                    <div className={ styles.instrumentTitle } >Bank</div>
                    <InputSwitch checked={state.piano}
                                 onChange={() => {
                                     dispatch(togglePiano());
                                     dispatch(changeAction("Piano" + (state.piano ? " Heater Kit" : " Smooth Piano Kit")))
                                 }} />
                </div>


            </div>
        </div>
    );
}


export default Board;