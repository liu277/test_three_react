// pages/_app.js
import { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
// import 'bootstrap/dist/js/bootstrap.bundle.min.js';

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    const handleFormSubmit = (event) => {
      if (event.target.tagName === 'FORM') {
        event.preventDefault();
      }
    };

    document.addEventListener('submit', handleFormSubmit);

    // Cleanup the event listener on component unmount
    return () => {
      document.removeEventListener('submit', handleFormSubmit);
    };
  }, []);

  return <Component {...pageProps} />;
}

export default MyApp;
