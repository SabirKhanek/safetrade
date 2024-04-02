import "./App.css";
import { apiClient } from "./api-client";
function App() {
  const { data, isLoading } = apiClient.user.getAll.useQuery(["users"]);
  if (isLoading) return <p>Loading...</p>;
  return (
    <ul>
      {data?.body.map((u) => <div className="text-red-500">{u.username}</div>)}
    </ul>
  );
}

export default App;
