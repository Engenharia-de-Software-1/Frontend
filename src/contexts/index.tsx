import React, { ReactNode } from 'react';
import { AuthProvider } from './authContext';

interface IAgroI9Providers {
  children: ReactNode;
}

function AgroI9Providers({ children }: IAgroI9Providers) {
  return(
    <AuthProvider>
      {children}
    </AuthProvider>
  );
}

export {AgroI9Providers};