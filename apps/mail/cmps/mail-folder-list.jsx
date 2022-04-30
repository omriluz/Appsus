import { mailService } from "../service/mail.service.js"


const { Link } = ReactRouterDOM

export class MailFolderList extends React.Component {

    state = {
        onIsCompose: this.props.onIsCompose,
        isToggle: false
    }


    onCountMail = () => {
        const mailsCount = mailService.mailCount()
        return mailsCount
    }

    toggleMenu = () => {
        this.setState({ isToggle: !this.state.isToggle })
        console.log(this.state.isToggle);
    }

    closeMenu = () => {
        this.setState({ isToggle: false })
    }

    render() {
        return <section><button className='btn-toggle-menu' onClick={this.toggleMenu}>☰</button>
            <section className={`mail-folder-list flex column  ${this.state.isToggle ? 'menu-open' : ''}`}>
                <div className="add-mail" onClick={this.closeMenu} >
                    <button onClick={this.state.onIsCompose}>Compose<img src="../../assets/img/compose.png" /></button>
                </div>
                <div className="mail-folders flex column" >
                    <Link to="/mail?status=inbox"> <div onClick={this.closeMenu}><i className="fa-solid fa-inbox"></i> Inbox <span>{this.onCountMail()}</span> </div></Link>
                    <Link to="/mail"> <div onClick={this.closeMenu} ><i className="fa-solid fa-envelope"></i> All mails</div></Link>
                    <Link to="/mail?isStared=true"> <div onClick={this.closeMenu}><i className="fa-solid fa-star"></i> Starred</div></Link>
                    <Link to="/mail?status=sent"><div onClick={this.closeMenu}><i className="fa-solid fa-paper-plane"></i> Sent</div></Link>
                    <Link to="/mail?status=trash"><div onClick={this.closeMenu}><i className="fa-solid fa-trash"></i> Trash</div></Link>
                    <Link to="/mail?status=draft"><div onClick={this.closeMenu}><i className="fa-solid fa-file"></i> Draft</div></Link>
                </div>
            </section>
        </section>
    }
}