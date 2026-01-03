"use client";
import { useTranslations } from "next-intl";
import PageHeader from "../components/page-header"

function ErrorPage() {
  const t = useTranslations();
  return (
    <>
    <PageHeader />
    <div className="container">
      <h1 className="fs-4 mb-4">{t("error-404")}</h1>
      <p>{t("not-found-text")}</p>
    </div>
    </>
  )
}

ErrorPage.propTypes = {}

export default ErrorPage
