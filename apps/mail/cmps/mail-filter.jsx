


export class MailFilter extends React.Component {

    state = {
        filterBy: {
            searchMail: '',
            isRead: ''
        }
    }


    handleChange = ({ target }) => {
        const value = target.value
        const field = target.name
        this.setState((prevState) => ({
            filterBy: {
                ...prevState.filterBy,
                [field]: value
            }
        }), () => {
            this.props.onSetFilter(this.state.filterBy)
        })


    }

    onFilter = (ev) => {
        ev.preventDefault()
        this.props.onSetFilter(this.state.filterBy)
    }


    render() {
        const { searchMail, isRead } = this.state.filterBy
        return <section className="mail-filter">
            <form onSubmit={this.onFilter} >
                <input type="text" placeholder="Search mail" name="searchMail"
                    value={searchMail} onChange={this.handleChange} />
                <select value={isRead} name="isRead" onChange={this.handleChange}>
                    <option value="all">All</option>
                    <option value="true">Read</option>
                    <option value="false">Unread</option>
                </select>
            </form>
        </section>
    }

}