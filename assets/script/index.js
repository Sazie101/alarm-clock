'use strict';

import { select, onEvent, selectById } from "./utility.js";

const alarmHour = select('.setHour');
const alarmMinute = select('.setMinute');
const showAlarm = select('.alarmSet');
const submit = select('button');
const AlarmInfo = select('.setInfo');

function clockChange() {
    let now = new Date();

    let hours = now.getHours(); 
    let minutes = now.getMinutes().toString().padStart(2, '0'); 
    hours = hours.toString().padStart(2, '0');
    let showHours = selectById('hours');
    let showMins = selectById('minutes');
    showHours.innerText = hours;
    showMins.innerText = minutes;

    return { hours, minutes };
}

clockChange();

setInterval(clockChange, 1000);

function checkAlarm(setHour, setMin) {
    const now = new Date();
    let currentHours = now.getHours().toString().padStart(2, '0');
    let currentMinutes = now.getMinutes().toString().padStart(2, '0');

    if (currentHours == setHour && currentMinutes == setMin) {
        AlarmInfo.innerText = "It's time for your Alarm!";
        showAlarm.style.color = '#00ff00';
        const alarmSound = selectById('alarmSound');
        alarmSound.play();
        alarmSound.volume = 0.8; 
        alarmSound.loop = true;  
    } else {
        showAlarm.style.color = '#fff';
    }
}

function validateInput(hour, minute) {
    if (hour === '' || minute === '') {
        AlarmInfo.innerText = "Please fill out all fields";
        return false;
    } else {
        const numericHour = parseInt(hour);
        const numericMinute = parseInt(minute);

        if (isNaN(numericHour) || isNaN(numericMinute)) {
            AlarmInfo.innerText = "Invalid Input!";
        } else {
            if ((numericHour > 24 || numericHour < 0) || (numericMinute > 60 || numericMinute < 0)) {
                AlarmInfo.innerText = "Invalid Hour or Minute!";
            } else {
                return true;
            }
        }
    }

    return false;
}

function setAlarm() {
    const setHour = alarmHour.value;
    const setMinute = alarmMinute.value;

    if (validateInput(setHour, setMinute)) {
        const paddedHour = setHour.toString().padStart(2, '0');
        const paddedMinute = setMinute.toString().padStart(2, '0');

        const finalTime = `${paddedHour}:${paddedMinute}`;
        AlarmInfo.innerText = `Your Alarm has been set to ${finalTime}.`;
        showAlarm.innerText = finalTime;

        setInterval(() => {
            checkAlarm(paddedHour, paddedMinute);
        }, 1000);
    }

    alarmHour.value = '';
    alarmMinute.value = '';
}

onEvent('click', submit, (event) => {
    event.preventDefault();
    setAlarm();
});