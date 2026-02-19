import { createContext, useContext, useState, useEffect } from 'react';

const ProjectContext = createContext();

export const ProjectProvider = ({ children }) => {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [tasks, setTasks] = useState([]);

  const API_URL = 'http://localhost:3000';

  const fetchProjects = async () => {
    const res = await fetch(`${API_URL}/projects`);
    setProjects(await res.json());
  };

  const fetchTasks = async projectId => {
    const res = await fetch(`${API_URL}/projects/${projectId}/tasks`);
    setTasks(await res.json());
  };

  const addProject = async name => {
    await fetch(`${API_URL}/projects`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name }),
    });
    fetchProjects();
  };

  const addTask = async (projectId, title) => {
    await fetch(`${API_URL}/projects/${projectId}/tasks`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title }),
    });
    fetchTasks(projectId);
    fetchProjects(); // Update counts on dashboard
  };

  const toggleTask = async taskId => {
    await fetch(`${API_URL}/tasks/${taskId}`, { method: 'PATCH' });
    if (selectedProject) fetchTasks(selectedProject.id);
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <ProjectContext.Provider
      value={{
        projects,
        selectedProject,
        tasks,
        setSelectedProject,
        fetchTasks,
        addProject,
        addTask,
        toggleTask,
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
};

export const useProjects = () => useContext(ProjectContext);
