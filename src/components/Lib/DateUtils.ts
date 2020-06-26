import format from 'date-fns/format';

const currentYear = new Date().getFullYear();

const dateFormatWithoutYear = 'MMM d';
const dateFormat = 'MMM d, yyyy';
const timeFormat = 'h:mm a';

export const formatDateText = (dateText: string) => {
  if (dateText) {
    const date = new Date(dateText);
    return format(
      date,
      date.getFullYear() === currentYear ? dateFormatWithoutYear : dateFormat
    );
  }
  return '';
};

export const formatDate = (date: Date) => {
  if (date) {
    return format(
      date,
      date.getFullYear() === currentYear ? dateFormatWithoutYear : dateFormat
    );
  }
  return '';
};

export const formatDateOrTimeText = (dateText: string) => {
  if (dateText) {
    const date = new Date(dateText);
    if (isToday(date, new Date())) {
      return `Today at ${format(date, timeFormat)}`;
    }
    return format(
      date,
      date.getFullYear() === currentYear ? dateFormatWithoutYear : dateFormat
    );
  }
  return '';
};

const isToday = (date, now) => {
  const yearDate = date.getYear();
  const monthDate = date.getMonth();
  const dayDate = date.getDate();
  const yearNow = now.getYear();
  const monthNow = now.getMonth();
  const dayNow = now.getDate();
  if (yearDate === yearNow && monthDate === monthNow && dayDate === dayNow) {
    return true;
  }
  return false;
};
