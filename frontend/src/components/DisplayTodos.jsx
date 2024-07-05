import React, { Fragment, useContext, useEffect, useRef, useState } from 'react'
import image2 from '../assests/image2.png'
import { CiEdit } from "react-icons/ci";
import { FaTrashCan } from "react-icons/fa6";
import { MdDeleteForever, MdSportsGymnastics } from "react-icons/md";
import axios from "axios"
import { MdBrowserUpdated } from "react-icons/md";
import TodoContext from './TodoContext';
import { ToastContainer, toast } from 'react-toastify';
import { MdErrorOutline } from "react-icons/md";
import 'react-toastify/dist/ReactToastify.css';
import { IoClose } from "react-icons/io5";
import EditModal from './EditModal';

const DisplayTodos = () => {
    const { todos, setTodo } = useContext(TodoContext)
    // console.log("🚀 ~ DisplayTodos ~ todos:", todos)
    // const [updateTitle, setUpdateTitle] = useState('')
    // const [updateDesc, setUpdateDesc] = useState('')
    const [confirmationDel, setConfirmationDel] = useState(false)
    const [expandDesc, setExpandDesc] = useState(false)
    const [editModal, setEditModal] = useState(false)
    const [editItem , setEditItem] = useState({})


    

    const modalRef = useRef();

    const handleClickOutside = (event) => {
    
        if (modalRef.current && !modalRef.current.contains(event.target)) {
            setConfirmationDel(false);
            setExpandDesc(false);
        }
    };

    function handleEdit(item) {
        
        setEditModal(true)
        setEditItem({...item})

        // setTodo(todos.map((todo) => (todo._id === id ? { ...todo, isEdit: true } : todo)))
    }

    // function handleUpdate(id) {
    //     // console.log(id)
    //     try {
    //         const res = axios.post("http://localhost:5000/todo/", { _id: id, isEdit: false, title: updateTitle, desc: updateDesc })
    //         // console.log("🚀 ~ handleUpdate ~ res:", res)
    //         setTodo(todos.map((todo) => (todo._id === id ? { ...todo, isEdit: false, title: updateTitle, desc: updateDesc } : todo)))

    //     } catch (error) {
    //         console.log(error)
    //     }

    // }

    function handleDelete(_id, i) {
        // console.log(_id, i)
        try {
            const res = axios.post("https://todoapp-mern.vercel.app/todo/delete", { _id: _id })
            // console.log("🚀 ~ handleDelete ~ res:", res)
            setTodo(todos.filter((item) => item._id !== _id))

        } catch (error) {
            console.log(error)
        }
    }


    const deleteAll = () => { // Asynchronous function for deletion logic
        setConfirmationDel(true)

    };
    const handleAlldelete = () => {
        const res = axios.post("https://todoapp-mern.vercel.app/todo/deleteAll");  // Send DELETE request
        setTodo([]);  // Update state to reflect empty todo list
        setConfirmationDel(false)
    }

    return (
        <>
            <div className='relative'>
                <fieldset className=" w-full h-auto  relative mt-5 ">
                    <legend className="flex ">
                        <img src={image2} alt="" className="w-16" />
                        <p className="absolute top-6 left-16 text-xl font-semibold font-serif text-blue-900">TODO LIST</p>
                        <button className="absolute top-6 right-0 outline-none shadow-lg transform active:scale-75 transition-transform " ><MdDeleteForever onClick={() => deleteAll()}
                            className=" text-4xl text-blue-950" /></button>
                    </legend>

                    {/* ================== display todos ================= */}
                    <div className="" >
                        <ul id="ul" className=" py-4">
                            {todos && todos.map((item, i) => (

                                <div className="flex justify-between max-w-3xl text-clip border-b mb-5 ">
                                    <div className="flex grow ">
                                        <li className="font-serif list-none ms-5 flex flex-col w-full " key={item._id}>
                                            <h1 className='text-2xl capitalize w-full font-serif'>{item.title}</h1>
                                            <h1 className='text-base  w-full font-serif'>{item.desc.length > 40 ?
                                                <>{item.desc.slice(0, 35)}...
                                                    <span onClick={() => setExpandDesc(true)} className='cursor-pointer ms-2 underline text-blue-950'>Read More</span>
                                                </>
                                                :
                                                item.desc}</h1>
                                            {expandDesc &&
                                                <div onClick={handleClickOutside} className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                                                    <div ref={modalRef} className="relative bg-white rounded-lg p-2 text-center w-1/3">
                                                        <h1 className='mb-3 font-serif font-bold break-words text-center capitalize '>{item.title}</h1>
                                                        <h1 className='mb-2 font-serif  break-words'>
                                                            {item.desc}
                                                        </h1>
                                                    </div>
                                                </div>
                                            }

                                            {/* <input type="text" readOnly={!item.isEdit} defaultValue={item.title} onChange={(e) => setUpdateTitle(e.target.value)} className='bg-transparent outline-none focus:outline-none text-2xl capitalize w-full' />
                                            <input type="text" readOnly={!item.isEdit} defaultValue={item.desc.slice(0, 5)} onChange={(e) => setUpdateDesc(e.target.value)} className='bg-transparent outline-none focus:outline-none h-auto ' /> */}
                                        </li>
                                    </div>
                                    <div className="flex gap-3">
                                        <button className="focus: outline-none">
                                            <CiEdit onClick={() => handleEdit(item)} className="text-blue-950  outline-none shadow-lg transform active:scale-75 transition-transform text-3xl " />
                                        </button>
                                        {editModal && <EditModal item={editItem} close={()=>setEditModal(false)}/>}
                                        {/* {item.isEdit ?
                                            <button className="focus: outline-none">
                                                <MdBrowserUpdated onClick={() => handleUpdate(item._id)} className="text-blue-950  outline-none shadow-lg transform active:scale-75 transition-transform text-3xl " />
                                            </button>
                                            :
                                            <button className="focus: outline-none">
                                                <CiEdit onClick={() => handleEdit(item._id)} className="text-blue-950  outline-none shadow-lg transform active:scale-75 transition-transform text-3xl " />
                                            </button>
                                        } */}
                                        <button ><FaTrashCan onClick={() => handleDelete(item._id, i)} className="text-blue-950  outline-none shadow-lg transform active:scale-75 transition-transform text-2xl" />
                                        </button>
                                    </div>
                                </div>
                                
                            ))}
                            
                        </ul>
                    </div>
                </fieldset>
            </div>
            {confirmationDel &&
                <div onClick={handleClickOutside} className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div ref={modalRef} className="relative bg-white rounded-lg p-2 w-1/3 text-center ">
                        <h1 className='text-red mb-5'><MdErrorOutline fontSize={"50px"} color='red' style={{ marginLeft: "auto", marginRight: "auto" }} /></h1>
                        <h1 className='mb-5 font-serif font-bold '>Are you sure?</h1>
                        <p className='mb-5 font-serif'>You won't be able to revert this.</p>
                        <div className='flex justify-center px-6'>
                            <button className='text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 font-serif' onClick={() => handleAlldelete()}>Yes, Delete It</button>
                            <button className='text-white bg-gradient-to-r from-slate-400 via-slate-500 to-slate-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-slate-300 dark:focus:ring-slate-800 shadow-lg shadow-slate-500/50 dark:shadow-lg dark:shadow-slate-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 font-serif' onClick={() => setConfirmationDel(false)}>Cancel</button>
                        </div>

                    </div>
                </div>

            }
            

            
        </>
    )
}

export default DisplayTodos;