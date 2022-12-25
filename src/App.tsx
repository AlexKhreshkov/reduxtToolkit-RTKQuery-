import axios from 'axios';
import { useEffect } from 'react';
import './App.css';
import { useAppDispatch, useAppSelecor } from './hooks/useRedux';
import { deleteTodo, fetchTodos, toggleTodo } from './store/todosSlice';
import { ITodo } from './types';

function App() {

  const dispatch = useAppDispatch()
  const todos = useAppSelecor(state => state.todos.todos)
  const isLoading = useAppSelecor(state => state.todos.loading)
  const error = useAppSelecor(state => state.todos.error)

  useEffect(() => {
    dispatch(fetchTodos())



    // axios.get<ITodo[]>(`https://jsonplaceholder.typicode.com/todosd/`)
    //   .then(response => console.log(response.data))
  }, [])


  return (
    <div className="App">
      {isLoading
        ?
        <div>Loading...</div>
        :
        <>
          <div className='toods'>
            {todos.map(todo =>
              <div key={todo.id} className='todo'>
                {todo.id}. {todo.title}
                <input
                  type={'checkbox'}
                  checked={todo.completed}
                  onChange={() => dispatch(toggleTodo({ data: { id: todo.id, completed: todo.completed } }))}
                />
                delete: <input type='checkbox' onClick={() => dispatch(deleteTodo(todo.id))} />
              </div>
            )}
          </div>
          {error
            ?
            <div>{error}</div>
            :
            <></>
          }
        </>
      }
    </div>
  );
}

export default App;
