"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { type JSX } from "react";
import { Pagination } from "react-bootstrap";

export default function Paginate({
  page,
  total,
  pageSize,
  fetch
}: {
  page: number;
  total: number;
  pageSize: number;
  fetch?: (page: number) => void;
}): JSX.Element {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const setPage = (pageIndex: number) => {
    if(pageIndex > 0)
      pageIndex -= 1;

    const newParams = new URLSearchParams(searchParams.toString());
    newParams.set("page", pageIndex.toString());

    // push updated query string
    router.push(`?${newParams.toString()}`);
    fetch && fetch(pageIndex);
  }

  let items = [];
  let totalPages = Math.ceil(total / pageSize);
  for (let number = 1; number <= totalPages; number++) {
    items.push(
      <Pagination.Item key={number} active={number === page+1} onClick={() => setPage(number)}>
        {number}
      </Pagination.Item>
    );
  }

  return totalPages > 1 ? <Pagination>{items}</Pagination> : <></>;
}
