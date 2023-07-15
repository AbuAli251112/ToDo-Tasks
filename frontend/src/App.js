import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./Pages/Login/LoginPage";
import RegisterPage from "./Pages/Register/RegisterPage";
import ToDoListPage from "./Pages/ToDoList/ToDoListPage";
import ProtectedRoutes from "./Components/Utility/ProtectedRoutes";
import ProtectedRoutesHook from "./Hook/ProtectedRoutesHook";
import NotFoundPage from './Pages/NotFound/NotFoundPage';

function App() {
  const [isUser] = ProtectedRoutesHook();
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route element={<ProtectedRoutes isUser={isUser} />}>
          <Route path="/todo-list" element={<ToDoListPage />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
