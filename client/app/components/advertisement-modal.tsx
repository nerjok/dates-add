"use client";
import { useState, type JSX } from "react";
import Modal from "react-bootstrap/Modal";
import type { AdvertisementFormValues } from "../model/advertisement-form";
import AddForm from "./ad-form";
import { apiService } from "../services.ts/api.service";
import AdConfirmation from "./ad-confirmation";
import { useTranslations } from "next-intl";
function AdvertisementModal({
  updateAdds,
  category,
}: {
  updateAdds: () => void;
  category: string;
}): JSX.Element {
  const [show, setShow] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(true);
  const [submitted, setSubmitted] = useState<AdvertisementFormValues | null>(
    null
  );
  const t = useTranslations();

  const handleClose = () => {
    setShow(false);
    setSubmitted(null);
    setTimeout(() => {
      updateAdds();
    }, 0);
  };

  const handleShow = () => setShow(true);

  const saveValues = (values: AdvertisementFormValues): Promise<void> => {
    return apiService
      .addAdvertisement({
        ...values,
        category,
        showPhone: (values.showPhone as unknown as string) === "on",
      })
      .then((data) => {
        setSubmitted(values);
        setIsConfirmed(data.confirmed === true);
      })
      .catch((error) => {
        console.error("Error adding advertisement:", error);
      });
  };

  return (
    <>
      <button className="btn btn-warning" onClick={() => handleShow()}>
        &#9998; {t("add-advertisement")}
      </button>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Add new entry</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {!submitted ? (
            <AddForm saveForm={saveValues} />
          ) : (
            <div className="alert alert-success mt-4">
              {isConfirmed ? (
                <strong>{t("advertisement_confirmed")}</strong>
              ) : (
                <>
                  <div className="mb-3">
                    <strong>{t("advertisement_submitted_message")}</strong>
                  </div>

                  {<AdConfirmation />}
                </>
              )}
            </div>
          )}
        </Modal.Body>
      </Modal>
    </>
  );
}

export default AdvertisementModal;
