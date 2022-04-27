// import { BookApp } from './cmps/book-app.jsx'
// import { BookAdd } from './cmps/book-add.jsx'
// import { HomePage } from './pages/homepage.jsx'
// import { About } from './pages/about.jsx'
// import { BookDetails } from './pages/book-details.jsx'
import { AppHeader } from './cmps/app-header.jsx'
// import { KeepApp } from './apps/keep/pages/note-app.jsx'
import { MailApp } from './apps/mail/pages/mail-app.jsx'
const Router = ReactRouterDOM.HashRouter
const { Route, Switch } = ReactRouterDOM


export function App() {
    return <Router>
        <section className="app">
            <main>
                <AppHeader />
                <Switch>
                    {/* <Route path="/keep" component={KeepApp} /> */}
                    <Route path="/mail" component={MailApp} />
                    {/* <Route path="/book" component={BookApp} /> */}
                    {/* <Route path="/about" component={About} /> */}
                    {/* <Route path="/" component={HomePage} /> */}
                </Switch>

            </main>
        </section>
    </Router>
}


