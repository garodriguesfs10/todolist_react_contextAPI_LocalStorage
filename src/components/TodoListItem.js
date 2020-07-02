import React, { useContext } from 'react'
import { TodoContext } from '../context/context'


const TodoListItem = ({ todo }) => {

    const {  SetAlltodos,findTask, clearItem  } = useContext(TodoContext)


    function HandleDelete(id) {        
        SetAlltodos(id)
    }

   
    return (
        <>
            <td>{todo.id}</td>
            <td>{todo.title}</td>
            <td>{todo.createdAt}</td>
            <td><button className="btn btn-primary" onClick={() => findTask(todo.id)}>Editar</button>  <button className="btn btn-secondary" onClick={() =>clearItem()}>Cancelar</button> <button className="btn btn-danger" onClick={() => HandleDelete(todo.id)}>Deletar</button></td>            
        </>
    )

}

export default TodoListItem