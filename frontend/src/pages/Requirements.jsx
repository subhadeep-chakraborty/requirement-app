import { useEffect, useState, useContext } from "react";
import { getRequirements, createRequirement } from "../api/requirementApi";
import { getErrorMessage } from "../utils/errorHandler";
import { AuthContext } from "../context/AuthContext";

import Loader from "../components/common/Loader";
import ErrorMessage from "../components/common/ErrorMessage";
import RequirementForm from "../components/requirements/RequirementForm";
import RequirementTable from "../components/requirements/RequirementTable";

const Requirements = () => {
  const { logout } = useContext(AuthContext);

  const [data, setData] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await getRequirements();

      if (Array.isArray(res)) {
        setData(res);
      } else if (Array.isArray(res.data)) {
        setData(res.data);
      } else {
        setData([]);
      }

    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleCreate = async (form) => {
    try {
      await createRequirement(form);
      fetchData();
    } catch (err) {
      setError(getErrorMessage(err));
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="flex justify-between mb-4">
        <h2 className="text-2xl font-bold">Requirements</h2>

        <button
          onClick={logout}
          className="bg-red-500 text-white px-4 py-1 rounded"
        >
          Logout
        </button>
      </div>

      <ErrorMessage message={error} />

      <RequirementForm onSubmit={handleCreate} />

      {loading ? (
        <Loader />
      ) : (
        <RequirementTable data={data} />
      )}
    </div>
  );
};

export default Requirements;