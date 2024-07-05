import React, { useContext, useEffect, useState } from 'react'
import image1 from '../assests/image1.png'
import { IoAddCircleSharp } from "react-icons/io5";
import axios from 'axios';
import TodoContext from './TodoContext';
import { ToastContainer, toast } from 'react-toastify';

const AddTodos = () => {
    const { todos, setTodo } = useContext(TodoContext)
    const [title, setTitle] = useState("")
    const [desc, setDesc] = useState('')
    const [error, setError] = useState('')

    async function AddTodos() {
        if (title.trim() === '') {
            setError('Please enter a title.');
        } else {
            try {
                const data = {
                    title,
                    desc
                }
                const resp = await axios.post("http://localhost:5000/todo/add", data)
                const handleToastClose = () => {
                    setTodo([...todos, resp.data.res])
                }
                toast.success("Todo Added Successfully", {
                    autoClose: 1000,
                    onClose: handleToastClose,
                    theme: "light"
                });

                setTitle("")
                setDesc("")

            } catch (error) {
                console.log(`error in posting data ${error}`)
            }
        }
        console.log("add todo")
    }
    const handleKeyPress = (event) => {
        // console.log(event)
        if (event.key === 'Enter') {
            AddTodos();
        }
    };
    function handleBlur(){
    if (title.trim() === '') {
            setError('Please enter a title.');
        }
    }

    return (
        <>
            <fieldset className="w-full h-40 relative  mt-4 mb-10 ">
                <legend className="flex ">
                    <img src={image1} alt="" className="w-16" />
                    <p className="absolute top-7 left-16 text-xl font-semibold font-serif text-blue-900">Add TODOs</p>
                </legend>
                <div className="flex justify-between my-4 items-center ">
                    <div className='flex flex-col  w-full flex-grow '>
                        <div className='flex flex-col'>
                            <input placeholder='Title'
                                type="text"
                                className="text-lg font-serif   h-10 mx-5 mt-2 rounded-tl-3xl rounded-br-3xl ps-3 focus:outline-none "
                                onChange={(e) => {
                                    setTitle(e.target.value);
                                    setError(''); // Clear the error message when the user starts typing
                                }}

                                onKeyDown={(event) => handleKeyPress(event)}
                                value={title}
                                onBlur={()=>handleBlur()} // Validate on blur
                            />
                            {error && <p className="text-blue-950 mx-5">{error}</p>}
                        </div>
                        <textarea placeholder='Description'
                            rows="3"
                            type="text"
                            className="resize-none text-lg font-serif h-30 mx-5 mt-2 rounded-tl-3xl rounded-br-3xl ps-3 focus:outline-none "
                            onChange={(e) => setDesc(e.target.value)}
                            onKeyDown={(event) => handleKeyPress(event)}
                            value={desc}
                        />
                    </div>
                    <button className="outline-none shadow-lg transform active:scale-75 transition-transform"  ><IoAddCircleSharp className='text-4xl text-gray-200' onClick={() => AddTodos()} /></button>
                </div>
            </fieldset >
            <ToastContainer />

        </>
    )
}

export default AddTodos