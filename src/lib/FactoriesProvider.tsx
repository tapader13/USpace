'use client';

import { createContext, useContext, useEffect, useState } from 'react';

export const SessionContext = createContext<any>({});
const FactoriesProvider = ({
  children,
  propsData,
}: {
  children: React.ReactNode;
  propsData: any;
}) => {
  const [session, setSession] = useState({});

  useEffect(() => {
    async function fetcSession() {
      setSession(propsData);
    }
    fetcSession();
  }, [propsData]);

  return (
    <SessionContext.Provider value={session}>
      {children}
    </SessionContext.Provider>
  );
};

export const useXSession = () => {
  const session = useContext(SessionContext);
  return session;
};
export default FactoriesProvider;
