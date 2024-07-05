import React, { useContext, useEffect, useRef, useState } from 'react'
import TodoContext from './TodoContext'
import axios from 'axios'

const EditModal = ({ item, close }) => {
    const { todos, setTodo } = useContext(TodoContext)
    const [updateTitle, setUpdateTitle] = useState('')
    const [updateDesc, setUpdateDesc] = useState('')

    useEffect(() => {
        setUpdateTitle(item.title)
        setUpdateDesc(item.desc)
    }, [item])

    function handleUpdate(id) {

        try {
            const res = axios.post("http://localhost:5000/todo/", { _id: id, isEdit: false, title: updateTitle, desc: updateDesc })
            // console.log("🚀 ~ handleUpdate ~ res:", res)
            setTodo(todos.map((todo) => (todo._id === id ? { ...todo, isEdit: false, title: updateTitle, desc: updateDesc } : todo)))
            close()

        } catch (error) {
            console.log(error)
        }

    }

    return (
        <>
            <div className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30'>
                <div className="relative bg-white rounded-lg p-2 w-2/3 text-center ">
                    <div className="flex justify-between my-4 items-center ">
                        <div className='flex flex-col gap-2  w-full flex-grow '>
                            <label htmlFor="title" className='text-lg font-serif' onClick={() => document.getElementById('title').focus()}>Title:</label>
                            <input placeholder='Title'
                                id="title" name="title"
                                type="text"
                                className="text-lg font-serif border-2 border-black  h-10  mt-2 rounded-tl-3xl rounded-br-3xl ps-3 focus:outline-none "
                                onChange={(e) => setUpdateTitle(e.target.value)}
                                value={updateTitle}
                            // defaultValue={item.title}
                            />
                            <label for="desc" className='text-lg font-serif'>Description:</label>
                            <textarea placeholder='Description'
                                id="desc" name="desc"
                                rows="3"
                                type="text"
                                className="resize-none text-lg font-serif border-2 border-black h-30 mt-2 rounded-tl-3xl rounded-br-3xl ps-3 focus:outline-none "
                                onChange={(e) => setUpdateDesc(e.target.value)}
                                value={updateDesc}
                            />
                            <div className='flex gap-4 justify-center'>
                                <button onClick={() => handleUpdate(item._id)} className='text-white bg-gradient-to-r from-slate-400 via-slate-500 to-slate-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-slate-300 dark:focus:ring-slate-800 shadow-lg shadow-slate-500/50 dark:shadow-lg dark:shadow-slate-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 font-serif'>Update</button>
                                <button onClick={close} className='text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 font-serif'>Cancel</button>
                            </div>
                        </div>


                    </div>
                </div>
            </div>

        </>



    )
}

export default EditModal