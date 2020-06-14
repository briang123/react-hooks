import React, { useState } from 'react';

import { useCountdown } from 'hooks';

const Countdown = () => {
  const [date, setDate] = useState('1/1/2030');
  const { total, days, hours, minutes, seconds, toggle, isActive } = useCountdown(date);

  const onChange = ({ target }) => setDate(target.value);

  return (
    <div>
      <input value={date} onChange={onChange} />
      Days: {days}, Hours: {hours}, Minutes: {minutes}, Seconds: {seconds}
      <button onClick={toggle}>{isActive ? 'Pause' : 'Continue'}</button>
    </div>
  );
};

export const TotalCountdown = () => <Countdown />;

export default {
  title: 'useCountdown',
  component: TotalCountdown,
};

TotalCountdown.story = {
  name: 'Countdown',
};
