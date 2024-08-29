import PropTypes from "prop-types";
import { useCountdown } from "./useCountdown";

CountdownTimer.propTypes = {
  date: PropTypes.number.isRequired,
  renderer: PropTypes.func.isRequired,
};

function CountdownTimer({ date, renderer }: any) {
  const [days, hours, minutes, seconds, onCompleted] = useCountdown(date);

  return renderer({
    days: days.toLocaleString("en-US", {
      minimumIntegerDigits: 2,
      useGrouping: false,
    }),
    hours: hours.toLocaleString("en-US", {
      minimumIntegerDigits: 2,
      useGrouping: false,
    }),
    minutes: minutes.toLocaleString("en-US", {
      minimumIntegerDigits: 2,
      useGrouping: false,
    }),
    seconds: seconds.toLocaleString("en-US", {
      minimumIntegerDigits: 2,
      useGrouping: false,
    }),
    onCompleted: onCompleted,
  });
}

export default CountdownTimer;
