/* eslint-disable @typescript-eslint/no-unsafe-argument */
import {type WebinarDetailsType} from 'configs/appTypes';
import WebinarDetails from 'data/WebinarDetails';
import React, {
  createContext,
  type ReactNode,
  useContext,
  useState,
} from 'react';

interface WebinarContextType {
  webinarData: WebinarDetailsType[];
  setWebinarData: React.Dispatch<React.SetStateAction<WebinarDetailsType[]>>;
}

const WebinarContext = createContext<WebinarContextType | undefined>(undefined);

export const WebinarProvider = ({
  children,
}: {
  children: ReactNode;
}): JSX.Element => {
  const [webinarData, setWebinarData] =
    useState<WebinarDetailsType[]>(WebinarDetails);

  return (
    <WebinarContext.Provider value={{webinarData, setWebinarData}}>
      {children}
    </WebinarContext.Provider>
  );
};

export const useWebinarContext = (): WebinarContextType => {
  const context = useContext(WebinarContext);
  if (context === undefined) {
    throw new Error('Something went wrong');
  }
  return context;
};
