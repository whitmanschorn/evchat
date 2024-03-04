import Link from 'next/link';

export default function Home() {
  return (
    <div>
      <h1>Home Page</h1>
      <nav>
        <ul>
          <li>
            <Link href="/alice">
              Go to Alice's Page
            </Link>
          </li>
          <li>
            <Link href="/bob">
              Go to Bob's Page
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
