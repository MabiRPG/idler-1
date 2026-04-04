import { createRoot } from 'react-dom/client';
import App from './App';
// import { AuthKitProvider } from '@workos-inc/authkit-react';
// import * as serviceWorker from './serviceWorker';
// import { BrowserRouter } from 'react-router-dom';

const root = createRoot(document.getElementById('root')!); // createRoot(container!) if you use TypeScript
root.render(
  // <AuthKitProvider clientId={import.meta.env.VITE_WORKOS_CLIENT_ID} devMode={true}>
  //   <BrowserRouter>
      <App />
    // </BrowserRouter>
  // </AuthKitProvider>,
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
