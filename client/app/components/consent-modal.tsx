"use client";
import { useTranslations } from "next-intl";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
const CONSENT_MODAL_KEY = "phub_consent_approved";
function ConsentModal() {
  const [show, setShow] = useState(false);
  // const navigate = useNavigate();
  const router = useRouter();

  // const location = useLocation();
  const pathname = usePathname();
  const t = useTranslations();

  useEffect(() => {
    window.scrollTo(0, 0);
    if (pathname !== "/error") {
      const approved = localStorage.getItem(CONSENT_MODAL_KEY) === "true";
      setShow(!approved);
    }
  }, [pathname]);

  useEffect(() => {
    const approved = localStorage.getItem(CONSENT_MODAL_KEY) === "true";
    setShow(!approved);
  }, []);

  useEffect(() => {
    const onPopState = () => {
      const approved = localStorage.getItem(CONSENT_MODAL_KEY) === "true";
      setShow(!approved);
    };

    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  const handleClose = () => {
    router.push("/error");
    setShow(false);
  };
  const handleShow = () => setShow(true);
  const approve = () => {
    setShow(false);
    localStorage.setItem(CONSENT_MODAL_KEY, "true");
  };

  return (
    <Modal
      show={show}
      onHide={handleClose}
      backdrop="static"
      keyboard={false}
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>{t("approve_page_rules")}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{t("page_consent_text")}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          {t("decline")}
        </Button>
        <Button variant="primary" onClick={approve}>
          {t("i_agree")}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ConsentModal;
