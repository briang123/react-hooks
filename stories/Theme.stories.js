import React, { useEffect } from 'react';
import '../src/index.css';
import '../src/App.css';

import { useTheme } from 'hooks';

const Theme = ({ initialValue = 'light' }) => {
  const [theme, setTheme] = useTheme();

  useEffect(() => {
    setTheme(initialValue);
  }, []);

  return (
    <select defaultValue={initialValue} onChange={(e) => setTheme(e.target.value)}>
      <option value="light">Light</option>
      <option value="dark">Dark</option>
    </select>
  );
};

export const DefaultTheme = () => <Theme />;
export const DarkTheme = () => <Theme initialValue="dark" />;

export default {
  title: 'useTheme',
  component: DarkTheme,
};

DefaultTheme.story = {
  name: 'Default Theme behavior',
};
DarkTheme.story = {
  name: 'Dark Theme',
};
