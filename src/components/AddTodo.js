import React, { useContext, useState, useEffect } from 'react'
import { TodoContext } from '../context/context'

const AddTodo = (props) => {
    const { saveTodo, item, newTodoEdit, clearItem } = useContext(TodoContext)
    const [todo, setTodo] = useState(['']);
  



    const HandleForm = (e) => {
        e.preventDefault();    
        if (item === '') {
            async function save() {
                console.log('entrei no savetodo')
                await saveTodo(todo)
                setTodo({ ...todo, title: '' })              
            }
            save();
            clearItem()
        } else {
            console.log('entrei no new todo edit')
            newTodoEdit(todo, item.id)
            clearItem()
            setTodo({ ...todo, title: '' })    
        }
    }

    const HandleInputChange = (e, id) => {
        setTodo({ ...todo, title: e.target.value })
    }



    useEffect(() => {
        console.log('use Effect: entrei')
        if (item !== '') {
            setTodo(item, item.id)
            console.log('item: ' + item.title + 'item id: ' + item.id)
        }
    }, [item])

  
    return (


        <form onSubmit={HandleForm}>
            <div className="form-row">
                <div className="form-group col-md-6">
                    <h5>Modo: {(item!=='') ? 'Editar' : 'Entrar' }</h5>
                    <label htmlFor="title"><strong>Texto:</strong></label>
                    <input type='text' className="form-control" required placeholder='Digite a nova tarefa' id='title' name='title' onChange={HandleInputChange} value={todo.title || ''} />
                    <br />
                    <button className="btn btn-success">Adicionar</button>
                </div>
            </div>
        </form>


    )
}

export default AddTodo