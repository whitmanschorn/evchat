import Link from "next/link";

export default function Home() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-gray-900 mb-4">
        EVChat Home Page
      </h1>
      <nav>
        <ul className="list-none p-0 m-0">
          <li className="mb-2">
            <Link
              href="/alice"
              className="text-blue-500 hover:text-blue-700 transition duration-150 ease-in-out"
            >
              Go to Alice&apos;s Page
            </Link>
          </li>
          <li className="mb-2">
            <Link
              href="/bob"
              className="text-blue-500 hover:text-blue-700 transition duration-150 ease-in-out"
            >
              Go to Bob&apos;s Page
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
