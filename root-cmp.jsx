// import { BookApp } from './cmps/book-app.jsx'
// import { BookAdd } from './cmps/book-add.jsx'
import { HomePage } from './pages/app-home.jsx'
import { About } from './pages/app-about.jsx'
// import { BookDetails } from './pages/book-details.jsx'
import { AppHeader } from './cmps/app-header.jsx'
import { KeepApp } from './apps/keep/pages/note-app.jsx'
import { NoteDetails } from './apps/keep/pages/note-details.jsx'
import { MailApp } from './apps/mail/pages/mail-app.jsx'
import { MailDetails } from './apps/mail/pages/mail-details.jsx'
import { UserMsg } from './cmps/user-msg.jsx'

const Router = ReactRouterDOM.HashRouter
const { Route, Switch } = ReactRouterDOM


export function App() {
    return <Router>
        <section className="app">
            <main>
                <AppHeader />
                <Switch>
                    <Route path="/mail/:mailId" component={MailDetails} />
                    <Route path="/mail" component={MailApp} />
                    <Route path="/keep" component={KeepApp} />
                    {/* <Route path="/book" component={BookApp} /> */}
                    <Route path="/" component={HomePage} />
                </Switch>

            </main>
        </section>
        <UserMsg />
    </Router>
}


