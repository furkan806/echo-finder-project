import { useState, type ChangeEvent, type FormEvent } from "react";
import { useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import { CATEGORIES, addItem, type ItemStatus } from "@/lib/store";

type Errors = Record<string, string>;

export function ItemForm({ status }: { status: ItemStatus }) {
  const navigate = useNavigate();
  const isLost = status === "lost";
  const [photo, setPhoto] = useState<string | undefined>();
  const [errors, setErrors] = useState<Errors>({});
  const [values, setValues] = useState({
    name: "",
    category: "",
    description: "",
    date: "",
    location: "",
    personName: "",
    contact: "",
  });

  const set = (key: keyof typeof values, value: string) =>
    setValues((v) => ({ ...v, [key]: value }));

  function onPhoto(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 2 * 1024 * 1024) {
      toast.error("Please upload an image smaller than 2 MB.");
      e.target.value = "";
      return;
    }
    const reader = new FileReader();
    reader.onload = () => setPhoto(reader.result as string);
    reader.readAsDataURL(file);
  }

  function validate(): Errors {
    const e: Errors = {};
    if (values.name.trim().length < 3) e.name = "Item name must be at least 3 characters.";
    if (!values.category) e.category = "Please select a category.";
    if (values.description.trim().length < 10)
      e.description = "Please write at least 10 characters.";
    if (!values.date) e.date = "Please select a date.";
    else if (new Date(values.date) > new Date()) e.date = "Date cannot be in the future.";
    if (values.location.trim().length < 3) e.location = "Please enter a valid location.";
    if (values.personName.trim().length < 3) e.personName = "Please enter your full name.";
    const c = values.contact.trim();
    const okPhone = /^[0-9]{10}$/.test(c.replace(/\s|-/g, ""));
    const okEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(c);
    if (!okPhone && !okEmail) e.contact = "Enter a 10-digit phone number or a valid email.";
    return e;
  }

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    const found = validate();
    setErrors(found);
    if (Object.keys(found).length > 0) {
      toast.error("Please fix the highlighted fields.");
      return;
    }
    const item = addItem({
      ...values,
      name: values.name.trim(),
      description: values.description.trim(),
      location: values.location.trim(),
      personName: values.personName.trim(),
      contact: values.contact.trim(),
      status,
      photo,
    });
    toast.success("Report submitted! It will appear after admin approval.");
    navigate({ to: "/items/$itemId", params: { itemId: item.id } });
  }

  const field =
    "w-full rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-ring/40";
  const labelCls = "mb-1.5 block text-sm font-medium text-foreground";

  return (
    <form onSubmit={onSubmit} noValidate className="grid gap-5 sm:grid-cols-2">
      <div className="sm:col-span-2">
        <label className={labelCls} htmlFor="name">
          Item name
        </label>
        <input
          id="name"
          className={field}
          placeholder="e.g. Black Dell Laptop Bag"
          value={values.name}
          onChange={(e) => set("name", e.target.value)}
        />
        <FieldError message={errors.name} />
      </div>

      <div>
        <label className={labelCls} htmlFor="category">
          Category
        </label>
        <select
          id="category"
          className={field}
          value={values.category}
          onChange={(e) => set("category", e.target.value)}
        >
          <option value="">Select a category</option>
          {CATEGORIES.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
        <FieldError message={errors.category} />
      </div>

      <div>
        <label className={labelCls} htmlFor="date">
          {isLost ? "Lost date" : "Found date"}
        </label>
        <input
          id="date"
          type="date"
          className={field}
          value={values.date}
          onChange={(e) => set("date", e.target.value)}
        />
        <FieldError message={errors.date} />
      </div>

      <div className="sm:col-span-2">
        <label className={labelCls} htmlFor="description">
          Description
        </label>
        <textarea
          id="description"
          rows={4}
          className={field}
          placeholder="Colour, brand, marks or anything that helps identify the item"
          value={values.description}
          onChange={(e) => set("description", e.target.value)}
        />
        <FieldError message={errors.description} />
      </div>

      <div className="sm:col-span-2">
        <label className={labelCls} htmlFor="location">
          {isLost ? "Lost location" : "Found location"}
        </label>
        <input
          id="location"
          className={field}
          placeholder="e.g. Library, 2nd Floor"
          value={values.location}
          onChange={(e) => set("location", e.target.value)}
        />
        <FieldError message={errors.location} />
      </div>

      <div className="sm:col-span-2">
        <label className={labelCls} htmlFor="photo">
          Item photo (optional)
        </label>
        <input
          id="photo"
          type="file"
          accept="image/*"
          onChange={onPhoto}
          className="w-full rounded-lg border border-dashed border-input bg-secondary/50 px-3 py-2 text-sm file:mr-3 file:rounded-md file:border-0 file:bg-primary file:px-3 file:py-1.5 file:text-sm file:font-medium file:text-primary-foreground"
        />
        {photo && (
          <img
            src={photo}
            alt="Selected item preview"
            className="mt-3 h-32 w-32 rounded-lg border border-border object-cover"
          />
        )}
      </div>

      <div>
        <label className={labelCls} htmlFor="personName">
          {isLost ? "Student name" : "Finder name"}
        </label>
        <input
          id="personName"
          className={field}
          placeholder="Your full name"
          value={values.personName}
          onChange={(e) => set("personName", e.target.value)}
        />
        <FieldError message={errors.personName} />
      </div>

      <div>
        <label className={labelCls} htmlFor="contact">
          Contact information
        </label>
        <input
          id="contact"
          className={field}
          placeholder="Phone number or email"
          value={values.contact}
          onChange={(e) => set("contact", e.target.value)}
        />
        <FieldError message={errors.contact} />
      </div>

      <div className="sm:col-span-2">
        <button
          type="submit"
          className="w-full rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-card transition hover:bg-primary/90 sm:w-auto"
        >
          Submit Report
        </button>
      </div>
    </form>
  );
}

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return <p className="mt-1.5 text-xs font-medium text-destructive">{message}</p>;
}
