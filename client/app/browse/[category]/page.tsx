



import { Suspense } from "react";
import BrowserClient from "./browserClient";

export function generateStaticParams() {
  return [
    { category: "mf" },
    { category: "mm" },
    { category: "ff" },
    { category: "fm" }
  ];
}

export default function BrowsePage({ params }: { params: any }) {
  return <Suspense fallback={<div>Loading...</div>}><BrowserClient category={params.category} /></Suspense>;
}
