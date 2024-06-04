import ReactDOM from 'react-dom/client';
import App from './components/app/app';
import { store } from './store';
import { fetchOffers } from './store/action';
import { Provider } from 'react-redux';

(async () => {
  await store.dispatch(fetchOffers());
})();

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
