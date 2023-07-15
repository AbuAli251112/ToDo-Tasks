import { useState, useEffect } from 'react';
import { useGetDataToken } from '../../Hooks/UseGetHook';
import { useInsertDataWithToken } from '../../Hooks/UseInsertData';
import { useInsUpdateDataWithToken } from '../../Hooks/UseUpdateData';
import { useDeleteDataWithToken } from '../../Hooks/UseDeleteData';
import './ToDoListPage.css';
import { useNavigate } from 'react-router-dom';


const ToDoListPage = () => {
  const [todos, setTodos] = useState([]);
  const [newTodoTitle, setNewTodoTitle] = useState('');
  const [newTodoDescription, setNewTodoDescription] = useState('');
  const [newTodoStatus, setNewTodoStatus] = useState('');
  const [error, setError] = useState('');
  const [updateTodoId, setUpdateTodoId] = useState(null);
  const [updateTodoTitle, setUpdateTodoTitle] = useState('');
  const [updateTodoDescription, setUpdateTodoDescription] = useState('');
  const [updateTodoStatus, setUpdateTodoStatus] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const FetchTodos = async () => {
      try {
        const response = await useGetDataToken('/api/todos');
        setTodos(response);
      } catch (error) {
        setError('Failed to fetch To-Do list data.');
      }
    };
    FetchTodos();
  }, []);

  const handleNewTodoTitleChange = (event) => {
    setNewTodoTitle(event.target.value);
  };

  const handleNewTodoDescriptionChange = (event) => {
    setNewTodoDescription(event.target.value);
  };

  const handleNewTodoStatusChange = (event) => {
    setNewTodoStatus(event.target.value);
  };

  const handleUpdateTodoTitleChange = (event) => {
    setUpdateTodoTitle(event.target.value);
  };

  const handleUpdateTodoDescriptionChange = (event) => {
    setUpdateTodoDescription(event.target.value);
  };

  const handleUpdateTodoStatusChange = (event) => {
    setUpdateTodoStatus(event.target.value);
  };

  const HandleAddTodo = async (event) => {
    event.preventDefault();
    try {
      const response = await useInsertDataWithToken('/api/todos', { title: newTodoTitle, description: newTodoDescription, status: newTodoStatus });
      const newTodo = response.data;
      setTodos([...todos, newTodo]);
      setNewTodoTitle('');
      setNewTodoDescription('');
      setNewTodoStatus('');
    } catch (error) {
      setError('Failed to create a new To-Do item.');
    }
  };

  const handleUpdateTodo = async (id) => {
    setUpdateTodoId(id);
    setUpdateTodoTitle(todos.find((todo) => todo.id === id).title);
    setUpdateTodoDescription(todos.find((todo) => todo.id === id).description);
    setUpdateTodoStatus(todos.find((todo) => todo.id === id).status);
  };

  const handleCancelUpdate = () => {
    setUpdateTodoId(null);
    setUpdateTodoTitle('');
    setUpdateTodoDescription('');
    setUpdateTodoStatus('');
  };

  const HandleSaveUpdate = async () => {
    try {
      const response = await useInsUpdateDataWithToken(`/api/todos/${updateTodoId}`, { title: updateTodoTitle, description: updateTodoDescription, status: updateTodoStatus });
      const updatedTodo = response.data;
      setTodos(todos.map((todo) => (todo.id === updatedTodo.id ? updatedTodo : todo)));
      setUpdateTodoId(null);
      setUpdateTodoTitle('');
      setUpdateTodoDescription('');
      setUpdateTodoStatus('');
    } catch (error) {
      setError('Failed to update the To-Do item.');
    }
  };

  const HandleDeleteTodo = async (id) => {
    try {
      await useDeleteDataWithToken(`/api/todos/${id}`);
      setTodos(todos.filter((todo) => todo.id !== id));
    } catch (error) {
      setError('Failed to delete the To-Do item.');
    }
  };

  const HandleLogout = async () => {
    try {
        await useInsertDataWithToken(`/api/logout`);
        localStorage.removeItem('token');
        navigate('/');
    } catch(error) {
        setError('Failed to Log Out.');
    }
  }

  return (
    <div className="container">
        <header>
            <h1 className="title">To-Do List</h1>
            <button className='logout' onClick={HandleLogout}>Logout</button>
        </header>
      <h1 className="title">To-Do List</h1>
      {error && <p className="error">{error}</p>}
      <form onSubmit={HandleAddTodo}>
        <input className="input" type="text" value={newTodoTitle} onChange={handleNewTodoTitleChange} placeholder="Add a new To-Do Name..." />
        <input className="input" type="text" value={newTodoDescription} onChange={handleNewTodoDescriptionChange} placeholder="Add a new To-Do Description..." />
        <input className="input" type="text" value={newTodoStatus} onChange={handleNewTodoStatusChange} placeholder="Add a new To-Do Status..." />
        <button className="button" type="submit">Add To-Do</button>
      </form>
    <table>
        <thead>
            <tr>
            <th>Task Name</th>
            <th>Task Description</th>
            <th>Task Status</th>
            <th>Actions</th>
            </tr>
        </thead>
        <tbody>
            {todos && todos.length > 0 ? (
                todos.map((todo) => (
                <tr key={todo.id}>
                    {updateTodoId === todo.id ? (
                    <>
                        <td>
                        <input style={{ width: "153px" }} className="input" type="text" value={updateTodoTitle} onChange={handleUpdateTodoTitleChange} placeholder="Update To-Do Name..." />
                        </td>
                        <td>
                        <input style={{ width: "200px" }} className="input" type="text" value={updateTodoDescription} onChange={handleUpdateTodoDescriptionChange} placeholder="Update To-Do Description..." />
                        </td>
                        <td>
                        <input style={{ width: "140px" }} className="input" type="text" value={updateTodoStatus} onChange={handleUpdateTodoStatusChange} placeholder="Update To-Do Status..." />
                        </td>
                        <td>
                        <button style={{ margin: "0 10px"}} className="button" onClick={HandleSaveUpdate}>Save</button>
                        <button className="button" onClick={handleCancelUpdate}>Cancel</button>
                        </td>
                    </>
                    ) : (
                    <>
                        <td>{todo.title}</td>
                        <td>{todo.description}</td>
                        <td><span className={`status ${todo.status.toLowerCase()}`}>{todo.status}</span></td>
                        <td>
                        <button style={{ margin: "0 10px"}} className="button" onClick={() => handleUpdateTodo(todo.id)}>Update</button>
                        <button className="button" onClick={() => HandleDeleteTodo(todo.id)}>Delete</button>
                        </td>
                    </>
                    )}
                </tr>
                ))
            ) : (
                <tr>
                <td colSpan="4">There are no To-Do lists.</td>
                </tr>
            )}
        </tbody>
    </table>
    </div>
  );
};

export default ToDoListPage;