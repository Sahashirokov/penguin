import React, {ChangeEvent, FC} from 'react';
import cl from './mytextarea.module.css'
interface MyTextareaProps {
    value: string;
    onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
    readOnly: boolean;
}

const MyTextarea: React.FC<MyTextareaProps> = ({ value, onChange, readOnly }) => {
    return (
        <textarea
            value={value}
            onChange={onChange}
            readOnly={readOnly}
            className={cl.myText}
        />
    );
};

export default MyTextarea;