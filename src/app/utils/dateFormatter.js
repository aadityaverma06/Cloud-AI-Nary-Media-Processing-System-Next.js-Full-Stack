
import {formatDistanceToNow} from 'date-fns';
function dateFormatter(date) {
  return formatDistanceToNow(new Date(date), {
    addSuffix: true,
  });
}

export default dateFormatter;
