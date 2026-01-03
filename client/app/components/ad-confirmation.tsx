import { useState } from "react";
import { Form } from "react-bootstrap";
import { apiService } from "../services.ts/api.service";
import { useTranslations } from "next-intl";

export default function AdConfirmation() {
  const [form, setForm] = useState<{ confirmationCode: string }>({
    confirmationCode: "",
  });
  const [error, setError] = useState<string>("");
	const [confirmed, setConfirmed] = useState<boolean>(false);
  const t = useTranslations();

  const confirmAdvertisement = () => {
    apiService
      .confirmAdvertisementByCode(form.confirmationCode)
      .then((data) => {
        if (data.success) {
					setConfirmed(true);
        }
      })
      .catch((error) => {
        setError("Invalid confirmation code");
        console.error("Error confirming advertisement:", error);
      });
  };

	if(confirmed){
		return <div>{t("advertisement_submitted")}</div>
	}

  return (
    <>
      <div>
        <Form.Label htmlFor="confirmationCode">{t("confirmation_code")}</Form.Label>
        <Form.Control
          required
          value={form.confirmationCode}
          onChange={(e) =>
            setForm({ ...form, confirmationCode: e.target.value })
          }
          type="text"
          id="confirmationCode"
        />

        {!!error && <div className="invalid-feedback d-block">{error}</div>}

        <button
          type="button"
          className="btn btn-primary mt-3"
          onClick={confirmAdvertisement}
        >
          {t("submit")}
        </button>
      </div>
    </>
  );
}
