import { BrowserRouter } from 'react-router-dom';
import { AppProvider } from './providers';
import { Router } from './router';

export function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </AppProvider>
  );
}