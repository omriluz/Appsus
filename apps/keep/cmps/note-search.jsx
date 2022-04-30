const { withRouter } = ReactRouterDOM
import {eventBusService} from '../../../services/event-bus.service.js'

class _NoteSearch extends React.Component {


    state = {
        filterBy: {
            noteType: '',
            txt: ''
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
            eventBusService.emit('search', this.state.filterBy)
        })

    }


    onSetFilter = (filterBy) => {
        console.log('woohoo', filterBy);

        const urlSrcPrm = new URLSearchParams(filterBy)
        const searchStr = urlSrcPrm.toString()
        this.props.history.push(`/note?${searchStr}`)

        
    }


    render() {
        const { txt, noteType } = this.state.filterBy
        // console.log(txt, noteType);

        return <section className="note-search-bar">
            <input type="text" placeholder="Search note" name="txt"
                value={txt} onChange={this.handleChange} />


            <select value={noteType} name="noteType" onChange={this.handleChange}>
                <option value="all">All</option>
                <option value="note-txt">text</option>
                <option value="note-img">images</option>
                <option value="note-video">videos</option>
                <option value="note-todos">todo lists</option>
            </select>
        </section>
    }
}


export const NoteSearch = withRouter(_NoteSearch)

// onFilter = (ev) => {
//     ev.preventDefault()
//     this.props.onSetFilter(this.state.filterBy)
// }


// render() {
//     const { txt, isRead } = this.state.filterBy
//     return <section className="mail-filter">
//         <form onSubmit={this.onFilter} >
//             <input type="text" placeholder="Search mail" name="txt"
//                 value={txt} onChange={this.handleChange} />
//             <select value={isRead} name="isRead" onChange={this.handleChange}>
//                 <option value="all">All</option>
//                 <option value="true">Read</option>
//                 <option value="false">Unread</option>
//             </select>
//         </form>
//     </section>
// }

// }