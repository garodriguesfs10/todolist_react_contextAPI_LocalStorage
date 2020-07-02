import React, { useState, useEffect } from 'react'
import { v1 as uuidv1 } from 'uuid';

export const TodoContext = React.createContext();
// esse children é o APP
const gethours = () => {
    var data = new Date(),
        dia = data.getDate().toString(),
        diaF = (dia.length === 1) ? '0' + dia : dia,
        mes = (data.getMonth() + 1).toString(), //+1 pois no getMonth Janeiro começa com zero.
        mesF = (mes.length === 1) ? '0' + mes : mes,
        anoF = data.getFullYear();
    var hora = addZero(data.getHours())
    var minutos = addZero(data.getMinutes())
    return (diaF + '/' + mesF + '/' + anoF + ' - ' + hora + ':' + minutos)
}

function addZero(i) {
    if (i < 10) {
        i = "0" + i;
    }
    return i;
}

const TodoProvider = ({ children }) => {
    const initialState = JSON.parse(localStorage.getItem('todos')) || []

    const [todos, setTodos] = useState(initialState);
    const [item, setEditItem] = useState('');

    const SetAlltodos = (id) => {
        setTodos(todos.filter(task => task.id !== id))
    }

    const saveTodo = (todo) => {
        const newTodo = {
            id: uuidv1(),
            title: todo.title,
            done: false,
            createdAt: gethours(),
            newCreatedAt: new Date().toLocaleTimeString()
        };

        setTodos([...todos, newTodo])
        clearItem()
    }

    useEffect(() => {
        //p p = nome da colecao, sp =  colecao em json
        localStorage.setItem('todos', JSON.stringify(todos))
    }, [todos])

    const sortItems = () => {
        let all = [...todos]
        const myData = [].concat(all)
            .sort((a, b) => a.newCreatedAt > b.newCreatedAt ? 1 : -1)
            .map((item, i) =>
                <div key={i}> {item.title}</div>
            );

    }

    const findTask = (id) => {
        const item = todos.find(e => e.id === id);
        setEditItem(item)
    }

    const newTodoEdit = (todo, id) => {
        const theTodo = todos.find(el => el.id === id)
        theTodo.title = todo.title
        const newTodos = todos.map((el) => { return el.id === id ? theTodo : el })
        console.log('New Todo: ' + theTodo)
        setTodos(newTodos)
    }

    const clearItem = () => {
        setEditItem('')

    }

    return (
        <TodoContext.Provider value={{ todos, saveTodo, SetAlltodos, findTask, item, newTodoEdit, clearItem }}>
            {children}
        </TodoContext.Provider>
    )



}

export default TodoProvider
