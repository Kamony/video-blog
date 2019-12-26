import React from 'react';
import RootLayout from './src/layout/RootLayout';

export const wrapRootElement = ({ element }) => {
  return <RootLayout>{element}</RootLayout>;
};
