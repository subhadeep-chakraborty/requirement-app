const RequirementTable = ({ data = [] }) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full bg-white shadow rounded border border-gray-200">
        
        {/* HEADER */}
        <thead className="bg-gray-200">
          <tr>
            <th className="p-3 text-left w-16">ID</th>
            <th className="p-3 text-left w-1/4">Title</th>
            <th className="p-3 text-left w-2/4">Description</th>
            <th className="p-3 text-center w-32">Status</th>
          </tr>
        </thead>

        {/* BODY */}
        <tbody>
          {data.map((r) => (
            <tr key={r.id} className="border-t hover:bg-gray-50">
              
              <td className="p-3">{r.id}</td>

              <td className="p-3">
                {r.title}
              </td>

              <td className="p-3">
                {r.description || "-"}
              </td>

              <td className="p-3 text-center">
                <span
                  className={`inline-block min-w-[90px] px-3 py-1 rounded text-white text-sm ${
                    r.status === "open"
                      ? "bg-green-500"
                      : r.status === "processed"
                      ? "bg-blue-500"
                      : "bg-gray-500"
                  }`}
                >
                  {r.status}
                </span>
              </td>

            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RequirementTable;