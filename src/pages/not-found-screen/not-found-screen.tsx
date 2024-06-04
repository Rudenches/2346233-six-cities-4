import { Link } from 'react-router-dom';
import React from 'react';

const NotFoundScreen = React.memo((): JSX.Element => (
  <section className="page page--gray page--main">
    <header className="header">
    </header>
    <section>
      <h1>404. Page not found</h1>
      <Link to="/">Вернуться на главную</Link>
    </section>
  </section>
));

NotFoundScreen.displayName = 'NotFoundScreen';

export default NotFoundScreen;
