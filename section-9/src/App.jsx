import NewProject from "./components/new-project";
import NoProjectSelected from "./components/no-project-selected";
import ProjectsSidebar from "./components/projects-sidebar";

function App() {
  return (
    <main className="h-screen my-9 flex gap-8">
      <ProjectsSidebar />
      <NoProjectSelected />
    </main>
  );
}

export default App;
