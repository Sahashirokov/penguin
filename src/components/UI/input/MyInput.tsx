import React, {ChangeEvent, FC} from 'react';
import cl from "./myinput.module.css";

interface CustomInputProps {
    type?: "text" | "number";
    value?: string | number;
    onChange?: (e:ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
    className?: string;
}

const MyInput:FC<CustomInputProps> = ({type="text",value,onChange,placeholder,className}) => {
    return (
        <div>
            <input className={cl.myInput}
            type={type}
                   value={value}
                   onChange={onChange}
                   placeholder={placeholder}
            />
        </div>
    );
};

export default MyInput;