import { useRoutes } from "react-router-dom";
import "./App.css";
import { routesConfig } from "./app.routes";
function App() {
  const routes = useRoutes(routesConfig);
  return <>{routes}</>;
}

export default App;
