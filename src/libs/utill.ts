import { TagData } from 'stores/tag';

export type DateType = Date | string | number;

export const zero = (value: number | string) =>
  value.toString().length === 1 ? `0${value}` : value;

const formatReplace = (format: string, date: Date) => {
  return format.replace(
    /(yyyy|mm|dd|MM|DD|H|i|s|m-contraction)/g,
    (type: string): any => {
      switch (type) {
        case 'yyyy':
          return date.getFullYear();
        case 'mm':
          return date.getMonth() + 1;
        case 'dd':
          return date.getDate();
        case 'MM':
          return zero(date.getMonth() + 1);
        case 'DD':
          return zero(date.getDate());
        case 'm-contraction':
          return String(date).split(' ')[1];
        case 'H':
          return zero(date.getHours());
        case 'i':
          return zero(date.getMinutes());
        case 's':
          return zero(date.getSeconds());
        default:
          return '';
      }
    }
  );
};

export const dateFormater = (format: string, date?: DateType): string => {
  const _date = date || new Date();
  const newDate = typeof _date === 'object' ? _date : new Date(_date); // Date 객체로 만들어줍니다.
  return formatReplace(format, newDate);
};

export const findSameItem = (
  list: TagData[] = [],
  item_type: string,
  item: string
) => {
  if (item_type == 'id') {
    return list.findIndex((listItem: TagData) => listItem.id === item);
  } else {
    return list.findIndex((listItem: TagData) => listItem.text === item);
  }
};
