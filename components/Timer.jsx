import { CircularProgressbarWithChildren, buildStyles } from 'react-circular-progressbar';

export default function Timer(props) {
  let action = null;

  return (
    <div className='timerBox'>
      <CircularProgressbarWithChildren
        value={ props.currentPercentage }
        strokeWidth={3}
        background
        backgroundPadding={3}
        styles={buildStyles({
          pathColor: 'white',
          backgroundColor: '#CD5C5C',
          trailColor: 'transparent',
          textColor: '#D7E0FF',
          strokeLinecap: 'round',
          pathTransitionDuration: 0.5
        })}>
        <span className='timerTimeText'>{getSecondsToClockString(props.fullTime - props.currentTime)}</span>
      </CircularProgressbarWithChildren>
    </div>
  );
}

function getSecondsToClockString(seconds) {
    if(isNaN(seconds) || seconds === '') {
      return NaN;
    }

  let minutesPart = parseInt(seconds / 60).toString();
    let secondsPart = (seconds % 60).toString();


    if(secondsPart.length === 1) {
      if(secondsPart > 0) {
        secondsPart = "0".concat(secondsPart);
      } else {
        secondsPart += '0';
      }
    }

    return minutesPart + ':' + secondsPart;
}