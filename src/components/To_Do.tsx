import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useParams } from 'react-router-dom';
import { RootState, AppDispatch } from '../store/store';
import {fetchTodos, addTodo, deleteTodo, editTodo, toggleTodoCompleted} from '../store/reducers/ActionCreators';
import TodoItem from './TodoItem';
import MyInput from './UI/input/MyInput';
import MyButton from './UI/button/MyButton';
import { ITodo } from '../models/ITodo';

const ToDo = () => {
    const { id } = useParams<{ id: string }>();
    const location = useLocation();
    const dispatch = useDispatch<AppDispatch>(); // Correctly typed dispatch
    const todos = useSelector((state: RootState) => state.todos.todos);
    const loading = useSelector((state: RootState) => state.todos.loading);
    const error = useSelector((state: RootState) => state.todos.error);
    const [newTodo, setNewTodo] = useState('');
    let numberID = todos.length;
    useEffect(() => {
        if (id) {
            dispatch(fetchTodos(Number(id)));
        }
    }, [dispatch, id]);

    const handleAddTodo = async () => {
        if (newTodo.trim()) {
            try {
                numberID+=1;
                await dispatch(
                    addTodo({
                        userId: Number(id),
                        id:numberID,
                        title: newTodo,
                        completed: false,
                    })
                );

                setNewTodo('');
            } catch (error) {
                console.error('Error adding todo:', error);
            }
        }
    };

    const handleEditTodo = async (todo: ITodo, newTitle: string) => {
        await dispatch(editTodo({ ...todo, title: newTitle }));
    };

    const handleDeleteTodo = async (todoId: number) => {
        await dispatch(deleteTodo(todoId));
    };

    if (!id) {
        return <h1>Выберете пингивна</h1>;
    }
    const handleToggleCompleted= async (todo:ITodo)=>
    {
        await dispatch(toggleTodoCompleted(todo));
    }

    const penguinName = location.state?.name;
    const completedTodos = todos.filter(todo => todo.completed).length;
    return (
        <div>
            <div className="penguin__header">
                <h1>Имя: {penguinName}</h1>
                <p>Количество завершенных: {completedTodos}</p>
                <p>Количество незавершенных: {todos.length - completedTodos}</p>
            </div>
            <div>
                <MyInput type="text" value={newTodo} onChange={(e) => setNewTodo(e.target.value)} placeholder="New Todo" />
                <MyButton onClick={handleAddTodo}>Добавить</MyButton>
            </div>
            <div className="todo__list">
                {loading && <h1>Загрузка...</h1>}
                {error && <h1>Ошибка: {error}</h1>}

                {todos.map((todo:ITodo) => (
                    <TodoItem key={todo.id}
                              todo={todo} onEdit={handleEditTodo}
                              onDelete={() => dispatch(deleteTodo(todo.id))}  onToggleCompleted={handleToggleCompleted}/>
                ))}
            </div>
        </div>
    );
};

export default ToDo;