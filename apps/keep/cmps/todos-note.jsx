import { utilService } from "../../../services/util.service.js";

export class TodosNote extends React.Component {

    render() {
        const { onToggleTodo } = this.props
        const { title,todos  } = this.props.note.info
        
        console.log('todos render ', todos);
        
        return <section className="todo-container">
            <h2>{title}</h2>
            <ul className="todo-list">
                {todos.map((todo, idx) => {
                    return <p onClick={() => onToggleTodo(idx, this.props.note.id)}
                        className="todo-item" key={utilService.makeId()}>
                        <i className={`fa-solid fa-square${todo.doneAt ? '-check' : ''}`}></i> {todo.txt}</p>
                })}
            </ul>
        </section>
    }
}