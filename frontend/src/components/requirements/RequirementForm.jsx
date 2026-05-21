import { useState } from "react";

const RequirementForm = ({ onSubmit }) => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    status: "open",
  });

  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // ✅ FRONTEND VALIDATION
    if (!form.title.trim()) {
      setError("Title is required");
      return;
    }

    if (!form.status) {
      setError("Status is required");
      return;
    }

    setError("");

    onSubmit(form);

    // reset form
    setForm({
      title: "",
      description: "",
      status: "open",
    });
  };

  return (
    <>
      {error && (
        <p className="text-red-500 mb-2">{error}</p>
      )}

      <form
        onSubmit={handleSubmit}
        className="bg-white p-4 rounded shadow mb-4 flex gap-2"
      >
        <input
          value={form.title}
          placeholder="Title *"
          className="border p-2 flex-1"
          onChange={(e) =>
            setForm({ ...form, title: e.target.value })
          }
        />

        <input
          value={form.description}
          placeholder="Description"
          className="border p-2 flex-1"
          onChange={(e) =>
            setForm({ ...form, description: e.target.value })
          }
        />

        <select
          value={form.status}
          className="border p-2"
          onChange={(e) =>
            setForm({ ...form, status: e.target.value })
          }
        >
          <option value="open">open</option>
          <option value="processed">processed</option>
          <option value="obsolete">obsolete</option>
        </select>

        <button className="bg-blue-500 text-white px-4 rounded">
          Add
        </button>
      </form>
    </>
  );
};

export default RequirementForm;