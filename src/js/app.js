import './inputMask';

import Timer from './timer';
import Elements from './elements';
import parseInput from './parseInput';

import '../css/main.styl';

import {
  timerInput,
  timerEdit,
  timerDisplay,
  timerAutoRestart,
  play,
  pause,
  restart,
} from './definitions';

function playTimer() {
  Elements.showTimerDisplay();
  Elements.showPauseButton();

  Timer.start(() => {
    Elements.showPlayButton();
  });
}

function pauseTimer() {
  Elements.showPlayButton();
  Timer.stop();
}

function restartTimer() {
  pauseTimer();
  Timer.restart(true);
}

function playNewValue() {
  const inputText = timerInput.value || '0';

  const value = parseInput(inputText);
  pauseTimer();
  Timer.reset();
  Timer.setValue(value);
  if (value) {
    playTimer();
  }
}

play.addEventListener('click', () => {
  if (timerEdit.classList.contains('hide')) {
    playTimer();
    return;
  }
  playNewValue();
});

pause.addEventListener('click', () => {
  pauseTimer();
});

restart.addEventListener('click', () => {
  restartTimer();
});

timerAutoRestart.addEventListener('change', () => {
  Timer.toggleAutoRestart();
});

document.addEventListener('keyup', (event) => {
  const { code } = event;
  if (event.target === timerInput) {
    return;
  }

  if (code === 'Escape') {
    restartTimer();
  } else if (code === 'Space' || code === 'Enter') {
    if (Timer.isRunning()) {
      pauseTimer();
      return;
    }
    playTimer();
  }
});

timerDisplay.addEventListener('click', () => {
  if (!Timer.isRunning()) {
    Elements.showTimerInput();
  }

  pauseTimer();
});

timerInput.addEventListener('keyup', (event) => {
  const { code } = event;
  const isExitCode = code === 'Escape' || code === 'Space' || code === 'Enter';
  if (isExitCode) {
    Elements.showTimerDisplay();

    playNewValue();
  }
});
