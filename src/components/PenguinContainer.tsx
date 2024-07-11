import React, {Component} from 'react';
import { connect } from 'react-redux';
import {fetchUsers} from "../service/UserService";
import PenguinItem from "./PenguinItem";
import {IPenguin} from "../models/IPenguin";
import {AppDispatch, RootState} from "../store/store";

interface PenguinContainerProps {
    fetchUsers: (limit: number) => void;
    penguins: IPenguin[];
    isLoading: boolean;
    error: string;
}
class PenguinContainer extends Component<PenguinContainerProps> {
    componentDidMount() {
        this.props.fetchUsers(10);
    }

    render() {
        const { penguins, isLoading, error } = this.props;

        return (
            <div>
                <div className="penguin__list">
                    {isLoading && <h1>Загрузка...</h1>}
                    {error && <h1>Ошибка: {error}</h1>}
                    {penguins && penguins.map((penguin) => (
                        <PenguinItem key={penguin.id} penguin={penguin} />
                    ))}
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state: RootState) => ({
    penguins: state.penguin.penguins,
    isLoading: state.penguin.isLoading,
    error: state.penguin.error,
});

const mapDispatchToProps = (dispatch: AppDispatch) => ({
    fetchUsers: (limit: number) => dispatch(fetchUsers(limit)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PenguinContainer);