import NewProject from "./components/new-project";
import NoProjectSelected from "./components/no-project-selected";
import ProjectsSidebar from "./components/projects-sidebar";
import { useState } from "react";
import SelectedProject from "./components/selected-project";

function App() {
  const [projectState, setProjectState] = useState({
    selectedProjectId: undefined,
    projects: [],
    tasks: []
  });

  function handleAddTasks(text) {
    setProjectState(prevState => {
      const newTask = {
        text: text,
        id: Math.random(),
        projectId: prevState.selectedProjectId
      };

      return {
        ...prevState,
        tasks: [newTask, ...prevState.tasks]
      }
    })
  }

  function handleDeleteTask(id) {
    setProjectState(prevState => {
      return {
        ...prevState,
        task: prevState.tasks.filter((task) => task.id !== id)
      }
    })
  }

  function handleStartAddProject() {
    setProjectState(prevState => {
      return {
        ...prevState,
        selectedProjectId: null,
      }
    })
  }
  function handleAddProject(projectData) {
    setProjectState(prevState => {
      const newProject = {
        ...projectData,
        id: Math.random()
      };

      return {
        ...prevState,
        selectedProjectId: undefined,
        projects: [...prevState.projects, newProject]
      }
    })
  }

  function handleDeleteProject() {
    setProjectState(prevState => {
      return {
        ...prevState,
        selectedProjectId: undefined,
        projects: prevState.projects.filter((project) => project.id !== prevState.selectedProjectId)
      }
    })
  }

  function handleSelectProject(id) {
    setProjectState(prevState => {
      return {
        ...prevState,
        selectedProjectId: id,
      }
    })
  }

  function handleCancelAddProject() {
    setProjectState(prevState => {
      return {
        ...prevState,
        selectedProjectId: undefined,
      }
    })
  }


  let content;

  const selectedProject = projectState.projects.find(project => project.id === projectState.selectedProjectId);

  if (projectState.selectedProjectId === null) {
    content = <NewProject onAdd={handleAddProject} onCancel={handleCancelAddProject} />
  } else if (projectState.selectedProjectId === undefined) {
    content = <NoProjectSelected onStartAddProject={handleStartAddProject} />
  } else if (projectState.selectedProjectId) {
    content = <SelectedProject project={selectedProject} 
    onDelete={handleDeleteProject} 
    onAddTask={handleAddTasks} 
    onDeleteTask={handleDeleteTask}
    tasks={projectState.tasks}  />
  }

  return (
    <main className="h-screen my-9 flex gap-8">
      <ProjectsSidebar onStartAddProject={handleStartAddProject} 
      projects={projectState.projects}
      onSelectProject={handleSelectProject}
      selectedProjectId={projectState.selectedProjectId} />
      {content}
    </main>
  );
}

export default App;
