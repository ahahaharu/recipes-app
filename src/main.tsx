import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { GlobalStyles } from './globalStyles';
import { ThemeProvider } from '@emotion/react';
import { theme } from './theme';
import { AuthProvider } from './context/AuthContext';
import { ApolloProvider } from '@apollo/client/react';
import { appoloClient } from './api/appolo';
import App from './App';

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ApolloProvider client={appoloClient}>
        <ThemeProvider theme={theme}>
          <AuthProvider>
            <GlobalStyles />
            <App />
          </AuthProvider>
        </ThemeProvider>
      </ApolloProvider>
    </QueryClientProvider>
  </StrictMode>
);
