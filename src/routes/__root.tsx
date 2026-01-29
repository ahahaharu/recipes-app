import { createRootRoute, Outlet } from '@tanstack/react-router';
import Navbar from '../components/Navbar';
import { Main } from '../components/Main';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

export const Route = createRootRoute({
  component: () => (
    <>
      <Navbar />

      <Main>
        <Outlet />
      </Main>

      <TanStackRouterDevtools />
      <ReactQueryDevtools />
    </>
  ),
});
