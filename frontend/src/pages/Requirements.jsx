import { useEffect, useState, useContext } from "react";
import { getRequirements, createRequirement } from "../api/requirementApi";
import { getErrorMessage } from "../utils/errorHandler";
import { AuthContext } from "../context/AuthContext";

const Requirements = () => {
  const { logout } = useContext(AuthContext);

  const [data, setData] = useState([]);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    title: "",
    description: "",
    status: "open",
  });

  //  Fetch requirements
  const fetchData = async () => {
    try {
      const res = await getRequirements();

      // handle both cases (res.data OR res directly)
      const payload = res?.data || res || [];
      setData(Array.isArray(payload) ? payload : []);
    } catch (err) {
      setError(getErrorMessage(err));
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  //  Create requirement
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.title.trim()) {
      setError("Title is required");
      return;
    }

    try {
      await createRequirement(form);

      // reset form
      setForm({
        title: "",
        description: "",
        status: "open",
      });

      fetchData();
    } catch (err) {
      setError(getErrorMessage(err));
    }
  };

  //  Status badge styling
  const getStatusClass = (status) => {
    switch (status) {
      case "open":
        return "bg-green-500";
      case "processed":
        return "bg-blue-500";
      case "obsolete":
        return "bg-gray-500";
      default:
        return "bg-gray-400";
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Header */}
      <div className="flex justify-between mb-6 items-center">
        <h2 className="text-2xl font-bold">Requirements</h2>
        <button
          onClick={logout}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
        >
          Logout
        </button>
      </div>

      {error && (
        <p className="text-red-500 mb-4">{error}</p>
      )}

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-4 rounded shadow mb-6 flex flex-col md:flex-row gap-3"
      >
        <input
          placeholder="Title"
          className="border p-2 flex-1 rounded"
          value={form.title}
          onChange={(e) =>
            setForm({ ...form, title: e.target.value })
          }
        />

        <input
          placeholder="Description"
          className="border p-2 flex-1 rounded"
          value={form.description}
          onChange={(e) =>
            setForm({ ...form, description: e.target.value })
          }
        />

        <select
          className="border p-2 rounded"
          value={form.status}
          onChange={(e) =>
            setForm({ ...form, status: e.target.value })
          }
        >
          <option value="open">open</option>
          <option value="processed">processed</option>
          <option value="obsolete">obsolete</option>
        </select>

        <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 rounded">
          Add
        </button>
      </form>

      {/* Table */}
      <table className="w-full bg-white shadow rounded overflow-hidden">
        <thead>
          <tr className="bg-gray-200 text-left">
            <th className="p-3">ID</th>
            <th className="p-3">Title</th>
            <th className="p-3">Description</th>
            <th className="p-3">Status</th>
          </tr>
        </thead>

        <tbody>
          {data.length === 0 ? (
            <tr>
              <td
                colSpan="4"
                className="text-center p-4 text-gray-500"
              >
                No requirements found
              </td>
            </tr>
          ) : (
            data.map((r) => (
              <tr key={r.id} className="border-t">
                <td className="p-3">{r.id}</td>
                <td className="p-3">{r.title}</td>
                <td className="p-3">{r.description}</td>
                <td className="p-3">
                  <span
                    className={`px-3 py-1 rounded text-white text-sm ${getStatusClass(
                      r.status
                    )}`}
                  >
                    {r.status}
                  </span>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Requirements;