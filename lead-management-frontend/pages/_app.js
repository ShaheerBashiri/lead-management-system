import '../styles/globals.css';
import Link from 'next/link';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <header className="top-nav">
        <nav className="nav-inner">
          <div className="nav-logo">
            <Link href="/">Lead Management</Link>
          </div>
          <div className="nav-links">
            <Link href="/">Home</Link>
            <Link href="/leads">Leads</Link>
            <Link href="/customers">Customers</Link>
          </div>
        </nav>
      </header>

      <main className="main-container">
        <Component {...pageProps} />
      </main>
    </>
  );
}

export default MyApp;
