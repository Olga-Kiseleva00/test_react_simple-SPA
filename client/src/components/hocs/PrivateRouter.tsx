import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

type PrivateRouterProps = {
  children?: JSX.Element;
  isAllowed: boolean;
  redirect?: string;
};

export default function PrivateRouter({
  children,
  isAllowed,
  redirect = '/',
}: PrivateRouterProps): JSX.Element {
  console.log({ isAllowed });
  if (!isAllowed) return <Navigate to={redirect} replace/>;
  return children || <Outlet />;
}


// import React from 'react';
// import { Navigate, Outlet } from 'react-router-dom';

// type PrivateRouterProps = {
//   children?: React.ReactElement;
//   isAllowed: boolean;
//   redirect?: string;
// };

// export default function PrivateRouter({
//   children,
//   isAllowed,
//   redirect,
// }: PrivateRouterProps): JSX.Element {
//   console.log({ isAllowed });
//   if (!isAllowed && redirect) return <Navigate to={redirect} />;
//   return children || <Outlet />;
// }

// import React from 'react';
// import { Navigate } from 'react-router-dom';

// type PrivateRouterProps = {
//   children?: React.ReactElement;
//   isAllowed: boolean;
//   redirect: string;
// };

// export default function PrivateRouter({
//   children,
//   isAllowed,
//   redirect,
// }: PrivateRouterProps): JSX.Element {
//   console.log({ isAllowed });
//   if (!isAllowed) return <Navigate to={redirect} />;
//   return <>{children}</>;
// }