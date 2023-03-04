import 'tailwindcss/tailwind.css';
import '../public/static/import.css';
/* import 'hnb-cdn/index.min.css'; */
import '../public/static/waline.css';
import Header from '../shared/Header';
import Footer from '../shared/Footer';

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <Header />
      <Component {...pageProps} />
      <Footer />
    </>
  );
}
