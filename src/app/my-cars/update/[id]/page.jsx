"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
import PrivateRoute from "@/components/layout/PrivateRoute";
import LoadingSpinner from "@/components/shared/LoadingSpinner";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

function UpdateCarForm() {
  const { id } = useParams();
  const router = useRouter();
  const [form, setForm] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    axios
      .get(`${API_URL}/cars/${id}`, { withCredentials: true })
      .then((res) => setForm(res.data));
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await axios.patch(
        `${API_URL}/cars/${id}`,
        {
          dailyPrice: Number(form.dailyPrice),
          description: form.description,
          availabilityStatus: form.availabilityStatus,
          imageURL: form.imageURL,
          carType: form.carType,
          pickupLocation: form.pickupLocation,
        },
        { withCredentials: true }
      );
      toast.success("Car listing updated");
      router.push("/my-cars");
    } catch {
      toast.error("Couldn't update this car. Try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (!form) return <LoadingSpinner full />;

  return (
    <div className="mx-auto max-w-2xl px-4 py-12 md:px-8">
      <h1 className="font-display text-3xl font-extrabold">Update {form.carName}</h1>
      <p className="mt-1 text-base-content/60">
        Price, description, availability, image, type, and location can be edited.
      </p>

      <form onSubmit={handleSubmit} className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="form-control">
          <label className="label"><span className="label-text">Daily rent price ($)</span></label>
          <input type="number" min="1" name="dailyPrice" required value={form.dailyPrice} onChange={handleChange} className="input input-bordered w-full" />
        </div>

        <div className="form-control">
          <label className="label"><span className="label-text">Car type</span></label>
          <select name="carType" value={form.carType} onChange={handleChange} className="select select-bordered w-full">
            {["SUV", "Sedan", "Hatchback", "Luxury", "Convertible", "Electric"].map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </div>

        <div className="form-control sm:col-span-2">
          <label className="label"><span className="label-text">Image URL</span></label>
          <input type="url" name="imageURL" required value={form.imageURL} onChange={handleChange} className="input input-bordered w-full" />
        </div>

        <div className="form-control sm:col-span-2">
          <label className="label"><span className="label-text">Pickup location</span></label>
          <input name="pickupLocation" required value={form.pickupLocation} onChange={handleChange} className="input input-bordered w-full" />
        </div>

        <div className="form-control sm:col-span-2">
          <label className="label"><span className="label-text">Description</span></label>
          <textarea name="description" required rows={4} value={form.description} onChange={handleChange} className="textarea textarea-bordered w-full" />
        </div>

        <label className="label sm:col-span-2 cursor-pointer justify-start gap-3">
          <input type="checkbox" name="availabilityStatus" checked={!!form.availabilityStatus} onChange={handleChange} className="toggle toggle-primary" />
          <span className="label-text">Available for booking</span>
        </label>

        <button type="submit" className="btn btn-primary sm:col-span-2 mt-2" disabled={submitting}>
          {submitting ? <span className="loading loading-spinner loading-sm" /> : "Save changes"}
        </button>
      </form>
    </div>
  );
}

export default function UpdateCarPage() {
  return (
    <PrivateRoute>
      <UpdateCarForm />
    </PrivateRoute>
  );
}
