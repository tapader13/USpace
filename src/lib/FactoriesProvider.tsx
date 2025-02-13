'use client';

import { useSession } from 'next-auth/react';
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
  const ss = useSession();
  console.log(ss, 'min');
  console.log(propsData, 'set session');
  useEffect(() => {
    async function fetcSession() {
      setSession(propsData);
    }
    fetcSession();
  }, [propsData]);

  return (
    <SessionContext.Provider value={{ session, setSession }}>
      {children}
    </SessionContext.Provider>
  );
};

export const useXSession = () => {
  const session = useContext(SessionContext);
  return session;
};
export default FactoriesProvider;
