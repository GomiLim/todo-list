import { dateFormater } from 'libs/utill';
import React from 'react';

export const Today = ({ timezoneFormat }: { timezoneFormat: string }) => {
  const today = dateFormater(timezoneFormat, new Date());

  return <p className="today">{today}</p>;
};
