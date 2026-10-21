import { format, toZonedTime } from 'date-fns-tz';

class DateUtils {
    public static formatDate(date: Date | string): string {
        const timeZone = 'Europe/Bucharest';
        const dateObject = date instanceof Date ? date : new Date(date);
        const zonedTime = toZonedTime(dateObject, timeZone);
        return format(zonedTime, 'EEE, MMM d · h:mm aaa', { timeZone })
    }
}

export default DateUtils;