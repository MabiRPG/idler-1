import React from 'react';
// import { Provider } from 'react-redux';
// import { store } from './store/store';
// import { Login } from './pages/account/login/Login';
// import { Navigate, Route, Routes } from 'react-router';
// import { AccountLayout } from './layouts/account/AccountLayout';

import '@/assets/css/global.css';
import { ConfigProvider } from 'antd';
// import { DefaultLayout } from './layouts/default/DefaultLayout';
// import { ProtectedRoute } from './components/ProtectedRoute';
// import { ROUTES } from './resources/routes-constants';
// import { Dashboard } from './pages/dashboard/Dashboard';
// import { PageNotFound } from './pages/pageNotFound/PageNotFound';

const App: React.FC = () => {
  return (
    <></>
    // <Provider store={store}>
    //   <ConfigProvider theme={{ token: { fontFamily: 'Figtree' } }}>
    //     <Routes>
    //       <Route element={<AccountLayout />}>
    //         <Route path={ROUTES.HOMEPAGE} element={<Login />}></Route>
    //       </Route>
    //       <Route
    //         element={
    //           <ProtectedRoute>
    //             <DefaultLayout />
    //           </ProtectedRoute>
    //         }
    //       >
    //         <Route path={ROUTES.DASHBOARD}>
    //           <Route index element={<Dashboard />}></Route>
    //         </Route>
    //       </Route>
    //       <Route element={<AccountLayout />}>
    //         <Route path="*" element={<PageNotFound />}></Route>
    //       </Route>
    //     </Routes>
    //   </ConfigProvider>
    // </Provider>
  );
};

export default App;
