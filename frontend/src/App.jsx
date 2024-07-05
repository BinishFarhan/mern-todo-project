import AddTodos from './components/AddTodos';
import DisplayTodos from './components/DisplayTodos';
import { useEffect, useState } from 'react';
import TodoContext from './components/TodoContext';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';
import { FaCircleCheck } from 'react-icons/fa6';

function App() {
  const [todos, setTodo] = useState([])
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/todo/");
        setTodo(response.data.data);
        // console.log("🚀 ~ fetchData ~ response:", response.data.data)
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData()
  }, [])

  return (
    <>
      <TodoContext.Provider value={{todos, setTodo}}>
        <div className=" w-full mx-auto md:w-1/2 md:mx-auto min-h-screen max-h-auto px-2 shadow-purple-900 shadow-xl  ">
          <div className='flex justify-center'>
            <h1
              className=" bg-clip-text text-transparent bg-gradient-to-r from-blue-950 to-blue-700 text-5xl text-center font-extrabold font-serif">
              TOD</h1>
            <FaCircleCheck className='text-blue-800 text-5xl text-center font-extrabold font-serif' />
          </div>
          <div className='flex flex-col gap-2'>
          <AddTodos />
          <DisplayTodos />
          </div>
        </div>
      </TodoContext.Provider>

    </>
  );
}

export default App;
