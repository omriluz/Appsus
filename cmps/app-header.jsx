const { Link, NavLink, withRouter } = ReactRouterDOM
import {NoteSearch} from '../apps/keep/cmps/note-search.jsx'
import { MailFilter } from '../apps/mail/cmps/mail-filter.jsx'

function _AppHeader(props) {

    return <header className="app-header">


        
        <h3>AppSus</h3>
        
        <nav>
            <NavLink to="/" exact >Home</NavLink>
            <NavLink to="/book">Books</NavLink>
            <NavLink to="/keep">Keep</NavLink>
            <NavLink to="/mail">Mail</NavLink>
        </nav>
    </header>
}
export const AppHeader = withRouter(_AppHeader)
