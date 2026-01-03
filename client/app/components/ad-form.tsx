import {
  useState,
  type ChangeEvent,
  type FormEvent,
  type JSX,
} from "react";
import { validateLtPhone } from "../shared/utils/validators";
import type { AdvertisementFormValues } from "../model/advertisement-form";
import { cities } from "../shared/models/cities";
import { useTranslations } from "next-intl";
import { activeDays } from "../shared/models/active-time";

interface FormErrors {
  activeDays?: string;
  name?: string;
  age?: string;
  place?: string;
  content?: string;
  email?: string;
  phone?: string;
}

export default function AddForm({
  saveForm,
}: {
  saveForm: (values: AdvertisementFormValues) => Promise<void>;
}): JSX.Element {
  const t = useTranslations();
  const [form, setForm] = useState<AdvertisementFormValues>({
    name: "fghfg",
    age: "29",
    place: "Kaunas",
    content: "fgh",
    email: "neriejus@gmail.com",
    phone: "+37062939422",
    activeDays: 1,
    showPhone: false,
  });

  const [errors, setErrors] = useState<FormErrors>({});

  const validate = (values: AdvertisementFormValues): FormErrors => {
    const errs: FormErrors = {};

    if (!values.name.trim()) errs.name = "error-name-required";
    if (!values.age.trim()) errs.age = "error-age-required";
    if (!values.place.trim()) errs.place = "error-place-required";
    if (!values.content.trim()) errs.content = "error-content-required";

    if (!values.activeDays) errs.activeDays = "error-active-days-required";

    if (!values.email.trim()) errs.email = "error-email-required";
    else if (!/^\S+@\S+\.\S+$/.test(values.email))
      errs.email = "error-invalid-email";

    if (!values.phone.trim()) {
      errs.phone = "error-phone-required";
    }

    const phoneError = validateLtPhone(values.phone);
    if (phoneError) errs.phone = phoneError;

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

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validation = validate(form);
    setErrors(validation);

    if (Object.keys(validation).length === 0) {
      saveForm(form).then(() => {
        setForm({
          activeDays: 1,
          name: "",
          age: "",
          place: "",
          content: "",
          email: "",
          phone: "",
          showPhone: false,
        });
      });
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} noValidate>
        <div className="row">
          <div className="col-md-8 mb-3">
            <label className="form-label">{t("name")}</label>
            <input
              name="name"
              className={`form-control ${errors.name ? "is-invalid" : ""}`}
              value={form.name}
              onChange={handleChange}
            />
            {errors.name && (
              <div className="invalid-feedback">{t(errors.name)}</div>
            )}
          </div>

          <div className="col-md-4 mb-3">
            <label className="form-label">{t("age")}</label>
            <input
              name="age"
              type="number"
              className={`form-control ${errors.age ? "is-invalid" : ""}`}
              value={form.age}
              onChange={handleChange}
            />
            {errors.age && <div className="invalid-feedback">{t(errors.age)}</div>}
          </div>
        </div>

        <div className="mb-3">
          <label className="form-label">{t("place")}</label>
          <select
            name="place"
            className={`form-select ${errors.place ? "is-invalid" : ""}`}
            value={form.place}
            onChange={handleChange}
          >
            <option value="">Vietove</option>
            {cities.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
          {errors.place && (
            <div className="invalid-feedback">{t(errors.place)}</div>
          )}
        </div>

        <div className="mb-3">
          <label className="form-label">{t("content")}</label>
          <textarea
            name="content"
            rows={4}
            className={`form-control ${errors.content ? "is-invalid" : ""}`}
            value={form.content}
            onChange={handleChange}
          />
          {errors.content && (
            <div className="invalid-feedback">{t(errors.content)}</div>
          )}
        </div>
        <div className="mb-3">
          <label className="form-label">{t("active_days")}</label>
          <select
            name="activeDays"
            className={`form-select ${errors.activeDays ? "is-invalid" : ""}`}
            value={form.activeDays}
            onChange={handleChange}
          >
            {activeDays.map((day) => (
              <option key={day} value={day}>
                {day}
              </option>
            ))}
          </select>
          {errors.activeDays && (
            <div className="invalid-feedback">{t(errors.activeDays)}</div>
          )}
        </div>
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

        <div className="mb-2">
          <label className="form-label">{t("phone")}</label>
          <input
            name="phone"
            type="tel"
            className={`form-control ${errors.phone ? "is-invalid" : ""}`}
            value={form.phone}
            onChange={handleChange}
          />
          {errors.phone && (
            <div className="invalid-feedback">{t(errors.phone)}</div>
          )}
        </div>

        <div className="form-check mb-4">
          <input
            name="showPhone"
            className="form-check-input"
            type="checkbox"
            id="checkDefault"
            onChange={handleChange}
          />
          <label className="form-check-label" htmlFor="checkDefault">
            {t("show_phone_number")}
          </label>
        </div>

        <button type="submit" className="btn btn-primary">
          {t("submit")}
        </button>
      </form>
    </>
  );
}
