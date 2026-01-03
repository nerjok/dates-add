"use client";
import React, { useState, type ChangeEvent, type JSX } from "react";
import { Modal } from "react-bootstrap";
import { apiService } from "../services.ts/api.service";
import { useTranslations } from "next-intl";

interface FormErrors {
  content?: string;
  email?: string;
}

export default function WriteMessageModal({
  advertisementId,
  close,
}: {
  advertisementId: string;
  close: () => void;
}): JSX.Element {
  const [errors, setErrors] = useState<FormErrors>({});
  const t = useTranslations();

  const [form, setForm] = useState<{ content: string; email: string }>({
    content: "",
    email: "neriejus@gmail.com",
  });

  const handleClose = () => {
    close();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validation = validate(form);
    setErrors(validation);


    apiService.sendMessage(advertisementId, form.email, form.content).then(() => {
      handleClose();
    });
  };

  const validate = (values: { content: string; email: string }): FormErrors => {
    const errs: FormErrors = {};

    if (!values.content.trim()) errs.content = "error-content-required";

    if (!values.email.trim()) errs.email = "error-email-required";
    else if (!/^\S+@\S+\.\S+$/.test(values.email))
      errs.email = "error-invalid-email";
    return errs;
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));

    setErrors((prev) => {
      if (!prev[name as keyof FormErrors]) return prev;

      const { [name as keyof FormErrors]: _, ...rest } = prev;
      return rest;
    });
  };

  return (
    <>
      {/* <button className="btn btn-warning" onClick={() => handleShow()}>
        &#9998; Add
      </button> */}
      <Modal
        show={true}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>{t("write_message_to_user")}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit} noValidate>
            <div className="mb-3">
              <label className="form-label">{t("email")}</label>
              <input
                name="email"
                type="email"
                className={`form-control ${errors.email ? "is-invalid" : ""}`}
                value={form.email}
                onChange={handleChange}
              />
              {errors.email && (
                <div className="invalid-feedback">{t(errors.email)}</div>
              )}
            </div>

            <div className="mb-3">
              <label className="form-label">{t("content")}</label>
              <textarea
                name="content"
                rows={4}
                className={`form-control ${errors.content ? "is-invalid" : ""}`}
                value={form.content}
                onChange={(e) => setForm({ ...form, content: e.target.value })}
              />
              {errors.content && (
                <div className="invalid-feedback">{t(errors.content)}</div>
              )}
            </div>
            <button type="submit" className="btn btn-primary">
              {t("submit")}
            </button>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
}
