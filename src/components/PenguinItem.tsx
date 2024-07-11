import React, {FC} from 'react';
import {IPenguin} from "../models/IPenguin";
import {Link, useNavigate} from "react-router-dom";

interface PenguinItemProps {
    penguin: IPenguin
}

const PenguinItem:FC<PenguinItemProps> = ({penguin}) => {
   // const router = useNavigate();
   /* function transitToPost(id) {
        router(`/posts/${id}`, { replace: true })
    }*/
    return (
        <div className="penguin">
            <ul className="penguin__info">
                <li> <strong> Имя: </strong> <Link className="name__link" to={`/To_Do/${penguin.id}`} state={{name:penguin.name}}>{penguin.name}</Link></li>
                <li className="penguin__email"><strong>Email:</strong> {penguin.email}</li>
                <li ><strong>Адрес:</strong> {penguin.address.street}.</li>
                 <li className="penguin__company"> <strong>Название компании:</strong> {penguin.company.name}</li>
            </ul>
        </div>
    );
};

export default PenguinItem;