import React, { useContext } from 'react'
import { TodoContext } from '../context/context'
import TodoListItem from './TodoListItem'

const TodoList = () => {
    const context = useContext(TodoContext)

    const data = context.todos.map((todo, index) => (
        <tr key={todo.id}><TodoListItem  todo={todo} index={index} /></tr>
    ))
    return (
        <table className="table table-dark">
            <thead>
                <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Titulo</th>
                    <th scope="col">Criado em</th>
                    <th scope="col">Ações</th>                    
                </tr>
            </thead>
            <tbody>
               {data}               
            </tbody>            
        </table>        
    )
}

export default TodoList