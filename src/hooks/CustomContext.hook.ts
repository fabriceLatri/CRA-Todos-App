import React from 'react';
import { AppUseReducerInterface } from '../model';

const CustomContext = React.createContext<AppUseReducerInterface | null>(null);

export function useCustomContext() {
  return React.useContext(CustomContext);
}

export default CustomContext;
