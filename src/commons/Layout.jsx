import { Outlet } from 'react-router-dom';

import Title from './Title';
import FooterBar from './FooterBar';

export default function Layout() {
  // const toggle = useSelector((state) => state.notice.toggle);

  return (
    <>
      <header>
        <Title />
      </header>

      <main>
        <Outlet />
      </main>

      <footer>
        <FooterBar />
      </footer>
    </>
  );
}
