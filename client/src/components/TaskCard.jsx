const TaskCard = ({ task, onToggle, onDelete }) => {
  const { title, description, assignee, image, status, startDate, endDate } = task;

  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="text-lg font-semibold mb-1">{title}</h2>
      <p className="text-sm text-gray-700 mb-2">{description}</p>

      {image && <img src={image} alt="Task" className="w-full h-40 object-cover mb-2 rounded" />}

      <div className="text-sm mb-2">
        <p>
          <strong>Assignee:</strong> {assignee?.name}
        </p>
        <p>
          <strong>Status:</strong> {status ? "Completed" : "Not Completed"}
        </p>
        <p>
          <strong>Start:</strong> {new Date(startDate).toLocaleDateString()}
        </p>
        <p>
          <strong>End:</strong> {new Date(endDate).toLocaleDateString()}
        </p>
      </div>

      <div className="flex gap-2">
        <button
          onClick={onToggle}
          className={`flex-1 px-3 py-1 rounded text-white ${
            status ? "bg-yellow-600" : "bg-green-600"
          }`}
        >
          {status ? "Mark Incomplete" : "Mark Completed"}
        </button>
        <button onClick={onDelete} className="flex-1 px-3 py-1 rounded bg-red-500 text-white">
          Delete
        </button>
      </div>
    </div>
  );
};

export default TaskCard;
