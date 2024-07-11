import React, {ChangeEvent, useState} from 'react';
import { ITodo } from '../models/ITodo';
import MyTextarea from './UI/textarea/MytextArea';
import MyButton from './UI/button/MyButton';
interface TodoItemProps {
    todo: ITodo;
    onEdit: (todo: ITodo, newTitle: string) => void;
    onDelete: (id: number) => void;
    onToggleCompleted: (todo: ITodo) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, onEdit, onDelete,onToggleCompleted }) => {
    const [editMode, setEditMode] = useState(false);
    const [newTitle, setNewTitle] = useState(todo.title);

    const handleSave = () => {

        onEdit(todo, newTitle);
        setEditMode(false);
    };

    const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setNewTitle(e.target.value);
    };

    return (
        <div className={`penguin__todoItem ${todo.completed ? 'completed' : 'uncompleted'}`}>
            <ul>
                <li>Номер: {todo.id}</li>
                <li>
                    <MyTextarea value={newTitle} onChange={handleChange} readOnly={!editMode}/>
                </li>
                <li>
                    {editMode ? (
                        <MyButton onClick={handleSave}>Сохранить</MyButton>

                    ) : (
                        <MyButton onClick={() => setEditMode(true)}>Редактировать</MyButton>
                    )}
                    <MyButton onClick={() => onDelete(todo.id)}>Удалить</MyButton>
                </li>
                <li><input type="checkbox"  onChange={()=>onToggleCompleted(todo)} checked={todo.completed}/></li>
            </ul>
        </div>
    );
};

export default TodoItem;