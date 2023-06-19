// _app.js (または _app.tsx)
import 'tailwindcss/tailwind.css';

function MyApp({ Component, pageProps }: { Component: React.ComponentType<any>, pageProps: any }) {
  return <Component {...pageProps} />;
}

export default MyApp;