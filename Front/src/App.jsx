import { ProjectCard } from './ProjectCard';
import { ProjectDetail } from './ProjectDetail';
import { useProjects } from './ProjectContext';
import { useState } from 'react';
import Layout from './Layout';
export default function App() {
  const {
    projects,
    selectedProject,
    setSelectedProject,
    tasks,
    addProject,
    addTask,
    toggleTask,
    fetchTasks,
  } = useProjects();

  const [input, setInput] = useState('');

  const HeaderAction = !selectedProject && (
    <div className="flex gap-2">
      <input
        className="border p-2 rounded shadow-sm bg-white"
        placeholder="New Project Name"
        value={input}
        onChange={e => setInput(e.target.value)}
      />
      <button
        onClick={() => {
          addProject(input);
          setInput('');
        }}
        className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition font-medium"
      >
        Create
      </button>
    </div>
  );

  return (
    <Layout headerAction={HeaderAction}>
      {!selectedProject ? (
        /* DASHBOARD VIEW */
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {projects.map(p => (
            <ProjectCard
              key={p.id}
              project={p}
              onSelect={() => {
                setSelectedProject(p);
                fetchTasks(p.id);
              }}
            />
          ))}
        </div>
      ) : (
        /* PROJECT DETAILS VIEW */
        <ProjectDetail
          project={selectedProject}
          tasks={tasks}
          onBack={() => setSelectedProject(null)}
          onToggleTask={toggleTask}
          inputValue={input}
          setInputValue={setInput}
          onAddTask={() => {
            addTask(selectedProject.id, input);
            setInput('');
          }}
        />
      )}
    </Layout>
  );
}
