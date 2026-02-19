import { TaskItem } from './TaskItem';

export const ProjectDetail = ({
  project,
  tasks,
  onBack,
  onAddTask,
  onToggleTask,
  inputValue,
  setInputValue,
}) => {
  return (
    <div className="bg-white p-8 rounded-xl shadow animate-in fade-in slide-in-from-bottom-2 duration-300">
      {/* Back Button */}
      <button
        onClick={onBack}
        className="text-indigo-600 font-medium mb-4 flex items-center gap-1 hover:underline"
      >
        ← Back to Dashboard
      </button>

      {/* Title */}
      <h2 className="text-2xl font-bold mb-6 text-slate-800">{project.name}</h2>

      {/* Input Area */}
      <div className="flex gap-2 mb-8">
        <input
          className="border p-2 flex-1 rounded bg-slate-50 focus:ring-2 ring-indigo-200 outline-none transition"
          placeholder="What needs to be done?"
          value={inputValue}
          onChange={e => setInputValue(e.target.value)}
        />
        <button
          onClick={onAddTask}
          className="bg-emerald-600 text-white px-6 py-2 rounded font-medium hover:bg-emerald-700 transition"
        >
          Add Task
        </button>
      </div>

      {/* Task List */}
      <div className="space-y-1">
        {tasks.length === 0 && (
          <p className="text-slate-400 text-center py-4">No tasks yet.</p>
        )}
        {tasks.map(t => (
          <TaskItem key={t.id} task={t} onToggle={onToggleTask} />
        ))}
      </div>
    </div>
  );
};
