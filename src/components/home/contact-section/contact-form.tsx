"use client";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Send } from "lucide-react";
import type { z } from "zod";
import { useEnquiryStore } from "@/stores/enquiryStore";
import { enquirySchema } from "@/lib/zod";

type Values = z.infer<typeof enquirySchema>;
export default function ContactForm() {
  const { isSubmitting, submitSuccess, error, submitEnquiry } =
    useEnquiryStore();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Values>({
    resolver: zodResolver(enquirySchema),
    defaultValues: { name: "", email: "", message: "" },
  });
  useEffect(() => {
    if (submitSuccess) reset();
  }, [submitSuccess, reset]);
  return (
    <form
      noValidate
      className="contact-form"
      onSubmit={handleSubmit(submitEnquiry)}
    >
      <div className="field-row">
        {(["name", "email"] as const).map((name) => (
          <div key={name}>
            <label htmlFor={name}>
              {name === "name" ? "Your name" : "Email address"}
            </label>
            <input
              id={name}
              type={name === "email" ? "email" : "text"}
              autoComplete={name}
              required
              aria-invalid={!!errors[name]}
              aria-describedby={errors[name] ? name + "-error" : undefined}
              {...register(name)}
            />
            {errors[name] && (
              <p className="field-error" id={name + "-error"}>
                {errors[name]?.message}
              </p>
            )}
          </div>
        ))}
      </div>
      <div>
        <label htmlFor="message">Message</label>
        <textarea id="message" rows={4} {...register("message")} />
      </div>
      <button disabled={isSubmitting} className="button primary" type="submit">
        <Send size={16} />
        {isSubmitting ? "Sending…" : "Send message"}
      </button>
      <div role="status">
        {submitSuccess && "Message sent. Thanks for getting in touch!"}
        {error && <p className="form-error">{error}</p>}
      </div>
    </form>
  );
}
