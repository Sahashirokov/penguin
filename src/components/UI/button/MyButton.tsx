import React, {FC} from 'react';
import cl from "./mybutton.module.css";
interface CustomButtonProps {
    onClick?: () => void;
    children?: React.ReactNode;
    className?: string;
}
const MyButton:FC<CustomButtonProps> = ({children, ...props}) => {
    return (
        <div>
            <button className={cl.myBtn} onClick={props.onClick}>
                {children}
            </button>
        </div>
    );
};

export default MyButton;