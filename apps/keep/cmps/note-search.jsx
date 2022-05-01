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
        const field = target.name
        const value = target.value
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
        const { txt } = this.state.filterBy

        return <section className="note-search-bar">
            <input type="text" placeholder="Search note" name="txt"
                value={txt} onChange={this.handleChange} />
        </section>
    }
}


export const NoteSearch = withRouter(_NoteSearch)

