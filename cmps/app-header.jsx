const { Link, NavLink, withRouter } = ReactRouterDOM

function _AppHeader(props) {
    return <header className="app-header">


        {/* <SearchBar toSearch={mails} /> */}
        <h3>AppSus</h3>
        <nav>
            <NavLink to="/" exact >Home</NavLink>
            <NavLink to="/about">About</NavLink>
            <NavLink to="/book">Books</NavLink>
            <NavLink to="/keep">Keep</NavLink>
            <NavLink to="/mail">Mail</NavLink>
        </nav>
    </header>
}

export const AppHeader = withRouter(_AppHeader)