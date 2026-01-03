"use client";
import { useEffect, useState } from "react";
import { Container } from "../../components/category";

import AdvertisementModal from "../../components/advertisement-modal";
import { apiService } from "../../services.ts/api.service";
import type { Advertisement, PagedData } from "../../model/advertisement.model";
import Paginate from "../../components/paginate";
import WriteMessageModal from "../../components/write-message-modal";
import { usePathname, useSearchParams } from "next/navigation";
import Link from "next/link";
import { useTranslations } from "next-intl";


export default function Browse(params: { category: string,  searchParams?: { page?: string }; }) {
  const pathname = usePathname();
  const [category, setCategory] = useState<string>("");
  const t = useTranslations();
  const searchParams = useSearchParams();

  const [advertisementId, setAdvertisementId] = useState<string | null>(null);
  useEffect(() => {
    const pathParts = pathname;
    setCategory(pathParts.split("/").pop() ?? "");
  }, [pathname]);

  const getCategoryFromPath = (): string => {
    const pathParts = pathname.split("/");
    return pathParts.pop() ?? "";
  };

  const [adds, setAdds] = useState<PagedData<Advertisement>>({
    data: [],
    total: 0,
    page: 0,
  });
  const updateAdds = (page = 0) => {
    const cat = getCategoryFromPath();
    apiService.geAdvertisements(page, cat).then((response) => {
      setAdds(response);
    });
  };

  const writeMessage = (advertisement: Advertisement) => {
    setAdvertisementId(advertisement.id!);
  };

  useEffect(() => {
    const page = searchParams.get("page") ?? "0";

    updateAdds(parseInt(page));
  }, []);

  return (
    <>
      <div className="page-info browse-heading d-flex justify-content-between flex-wrap">
        <Link href="/">
          <h1 className="heart-text text-3xl font-semibold mb-6">Category</h1>
        </Link>
        <div>
          <AdvertisementModal updateAdds={updateAdds} category={category} />
          {/* <button className="btn btn-warning ms-1">⚙ Profile</button> */}
        </div>
      </div>
      <div className="text-center">
        <h2>
          {t(pathname ?? "")}
          <span> 👨&zwj;❤️&zwj;👩</span>
        </h2>
      </div>

      <div className="container">
        <div className="p-3">
          {adds.data.map((item, index) => (
            <Container className="text-start mb-1" key={index}>
              <div>
                <h3 className="fs-5 ">
                  {item.name}, {item.age}
                </h3>
              </div>
              <div>
                <i>&#9872; {item.place}</i>
              </div>
              <div className="py-4">{item.content}</div>
              <div>
                <span className="me-3" onClick={() => writeMessage(item)}>
                  &#9993; {t("write_message_to_user")}
                </span>
                {item.showPhone && <span data-nosnippet>&#9742; {item.phone}</span>}
              </div>
            </Container>
          ))}
        </div>
        <nav aria-label="...">
          <Paginate
            page={adds.page}
            total={adds.total}
            pageSize={10}
            fetch={updateAdds}
          />
        </nav>
      </div>
      {advertisementId && (
        <WriteMessageModal
          advertisementId={advertisementId}
          close={() => setAdvertisementId(null)}
        />
      )}
    </>
  );
}
