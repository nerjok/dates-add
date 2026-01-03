"use client";
import { useTranslations } from "next-intl";
import PageHeader from "../components/page-header";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { apiService } from "../services.ts/api.service";

function ConfirmMessageClient() {
  const t = useTranslations();
  const searchParams = useSearchParams();

  const [confirmed, setConfirmed] = useState<boolean>(false);

  useEffect(() => {
    const confirmationCode = searchParams.get("code");
    if (confirmationCode) {
      apiService
        .confirmMessage(confirmationCode)
        .then(() => {
          setConfirmed(true);
        })
        .catch((error) => {
          console.error("Error confirming advertisement:", error);
        });
    }
  }, []);

  return (
    <>
      <PageHeader />
      <div className="container text-center">
        <div>
          <h1 className="fs-4 mb-4">{t("message-confirmation")}</h1>
          {confirmed ? <p>{t("message-confirmed")}</p> : null}
        </div>
      </div>
    </>
  );
}

ConfirmMessageClient.propTypes = {};

export default ConfirmMessageClient;
