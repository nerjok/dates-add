import { useTranslations } from "next-intl";
import { IconDiv, IconStyle } from "./category";

function PageHeader() {
  const t = useTranslations();
  return (
    <div className="page-info text-center">
      <IconDiv>
        <IconStyle>
          <span>&#9825;</span>
        </IconStyle>
      </IconDiv>
      <h1 className="heart-text">{t("title")}</h1>
      <p className="heading-description">
        {t("page_description")}
      </p>
    </div>
  );
}

PageHeader.propTypes = {};

export default PageHeader;
