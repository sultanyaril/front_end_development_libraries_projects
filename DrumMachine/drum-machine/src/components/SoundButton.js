import { Button } from 'primereact/button';
import { useHotkeys } from 'react-hotkeys-hook';
import styles from './SoundButton.module.css'
import { useSelector, useDispatch } from 'react-redux';
import { changeAction } from "../store";
import {useState} from "react";

function SoundButton({sound}) {
    const [isActive, setIsActive] = useState(false);

    const state = useSelector((state) => state.state);
    const dispatch = useDispatch();

    const main_sound = new Audio(sound.soundUrl);
    const piano_sound = new Audio(sound.altSoundUrl);

    const playSound = () => {
        if (state.piano) {
            piano_sound.volume = state.volume / 100;
            piano_sound.play();
            dispatch(changeAction(sound.name));
        } else {
            piano_sound.volume = state.volume / 100;
            main_sound.play();
            dispatch(changeAction(sound.altName));
        }

        setIsActive(true);
        setTimeout(() => setIsActive(false), 200); // Reset after 200ms
    }

    useHotkeys(sound.hotkey, () =>  playSound());

    return (
        <div className={styles.SoundButton}>
            <Button variant="primary"
                    onClick={ playSound }
                    label={sound.hotkey}
                    className={isActive ? styles.active : ''}/>
        </div>
    )
}

export default SoundButton;