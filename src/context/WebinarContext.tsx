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
  showWebinarData: WebinarDetailsType[];
  setShowWebinarData: React.Dispatch<
    React.SetStateAction<WebinarDetailsType[]>
  >;
  allWebinarDatas: WebinarDetailsType[];
  setAllWebinarDatas: React.Dispatch<
    React.SetStateAction<WebinarDetailsType[]>
  >;
}

const WebinarContext = createContext<WebinarContextType | undefined>(undefined);

export const WebinarProvider = ({
  children,
}: {
  children: ReactNode;
}): JSX.Element => {
  const [showWebinarData, setShowWebinarData] =
    useState<WebinarDetailsType[]>(WebinarDetails);
  const [allWebinarDatas, setAllWebinarDatas] =
    useState<WebinarDetailsType[]>(WebinarDetails);

  return (
    <WebinarContext.Provider
      value={{
        showWebinarData,
        setShowWebinarData,
        setAllWebinarDatas,
        allWebinarDatas,
      }}>
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
