import Link from 'next/link';

export default function Home() {
  return (
    <div className="container">
      <h1>Lead Management System</h1>
      
      <div className="nav-links mt-16">
        <Link href="/leads">Go to Leads</Link>
        <Link href="/customers">Go to Customers</Link>
      </div>
    </div>
  );
}
