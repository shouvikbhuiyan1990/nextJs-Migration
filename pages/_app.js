import { Provider } from 'react-redux';
import { useStore } from '../store/index';
import '../utils/fetchApi';

export default function App({ Component, pageProps }) {
  const store = useStore(pageProps.initialReduxState)

  return (
    <div id="root">
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </div>
  )
}
