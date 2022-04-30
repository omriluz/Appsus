


export class MailSort extends React.Component {

    state = {
        sortBy: {}
    }



    handelChange = ({ target }) => {
        const prop = target.value
        const isDesc = target.checked
        this.setState((prevState) => ({
            sortBy: {
                [prop]: (isDesc) ? -1 : 1
            }
        }), () => {
            this.props.onSetSort(this.state.sortBy)
        })
    }



    render() {
        return <div className="mail-sort"> <select className="sort-by" onChange={this.handelChange}>
            <option value="">Select Sorting</option>
            <option value="date">Date</option>
            <option value="title">Name</option>
        </select>
            <label>
                Descending
                <input className="sort-desc" value="" type="checkbox" onChange={this.handelChange} />
            </label>
        </div>


    }
}
