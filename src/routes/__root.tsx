import {
  createRootRouteWithContext,
  Outlet,
  redirect,
  useLocation,
} from '@tanstack/react-router';
import Navbar from '../components/Navbar';
import { Main } from '../components/Main';
// import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';
// import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import type { AuthContextType } from '../context/AuthContext';

interface RouterContext {
  auth: AuthContextType;
}

export const Route = createRootRouteWithContext<RouterContext>()({
  beforeLoad: ({ context, location }) => {
    if (!context.auth.isAuth) {
      if (location.pathname !== '/login') {
        throw redirect({
          to: '/login',
        });
      }
    }
  },
  component: RootComponent,
});

function RootComponent() {
  const location = useLocation();

  const isLoginPage = location.pathname === '/login';

  return (
    <>
      {!isLoginPage && <Navbar />}

      {isLoginPage ? (
        <Outlet />
      ) : (
        <Main>
          <Outlet />
        </Main>
      )}

      {/* <TanStackRouterDevtools />
      <ReactQueryDevtools /> */}
    </>
  );
}
