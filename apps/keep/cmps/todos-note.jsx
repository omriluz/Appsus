import { utilService } from "../../../services/util.service.js";

// TODO: decide if this needs to be a function
export class TodosNote extends React.Component {

    state = {

    }

    onChangeTodo = ({ target }, idx, id) => {
        console.log(target.innerText, idx, id);

    }

    itemContentRef = React.createRef()

    render() {
        const { onTodoUpdateDelete, onAddTodoItem } = this.props
        const { title, todos } = this.props.note.info

        return <section className="todo-container">
            <h2>{title}</h2>
            <ul className="todo-list">
                {todos.map((todo, idx) => {
                    return <div className="todo-item"
                        key={utilService.makeId()}>
                        <i onClick={() => onTodoUpdateDelete(idx, this.props.note.id, 'toggleDone')}
                            className={`fa-solid fa-square${todo.doneAt ? '-check' : ''}`}>
                        </i>
                        <span onBlur={(event) => onTodoUpdateDelete(idx, this.props.note.id, 'updateTxt', event)} ref={this.itemContentRef}
                            suppressContentEditableWarning={true}
                            contentEditable
                            className="todo-item-content">{todo.txt}</span>
                        <i onClick={() => onTodoUpdateDelete(idx, this.props.note.id, 'delete')}
                            className="todo-delete-btn fa-regular fa-trash-can"></i>
                    </div>
                })}
                <p onClick={() => onAddTodoItem(this.props.note.id)} className="new-todo-item-btn"><i className="fa-solid fa-circle-plus"></i> Add new Todo</p>
            </ul>
        </section>
    }
}