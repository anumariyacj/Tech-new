export const TaskItem = ({ task, onToggle }) => {
  const isCompleted = task.status === 'Completed';

  return (
    <div className="flex items-center gap-3 p-3 border-b border-slate-50 last:border-0 hover:bg-slate-50 transition rounded-lg">
      <input
        type="checkbox"
        checked={isCompleted}
        onChange={() => onToggle(task.id)}
        className="h-5 w-5 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600 cursor-pointer"
      />
      <span
        className={
          isCompleted ? 'line-through text-gray-400' : 'text-slate-700'
        }
      >
        {task.title}
      </span>
    </div>
  );
};
