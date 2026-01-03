import Link from "next/link";

export default function Rules() {
  return (
    <div>
      <h1>Rules page</h1>
      <br />
      <Link href="/pages">Pages</Link> | 
      <Link href="/">Home</Link>
    </div>
  );
}
