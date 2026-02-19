export const ProjectCard = ({ project, onSelect }) => {
  const dateStr = project.createdAt.endsWith('Z')
    ? project.createdAt
    : project.createdAt + 'Z';
  const dateObj = new Date(dateStr);
  const formattedDate = `${dateObj.toLocaleDateString()} at ${dateObj.toLocaleTimeString(
    [],
    {
      hour: '2-digit',
      minute: '2-digit',
    }
  )}`;

  return (
    <div
      onClick={onSelect}
      className="bg-white p-6 rounded-xl shadow hover:ring-2 ring-indigo-500 cursor-pointer transition flex flex-col justify-between"
    >
      <div>
        <h2 className="text-xl font-bold">{project.name}</h2>
        <p className="text-gray-500">{project.taskCount || 0} Tasks</p>
      </div>
      <div className="mt-4 pt-4 border-t border-gray-100 text-xs text-gray-400">
        Created: {formattedDate}
      </div>
    </div>
  );
};
