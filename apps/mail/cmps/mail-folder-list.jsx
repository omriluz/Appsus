import { mailService } from "../service/mail.service.js"


const { Link, withRouter } = ReactRouterDOM

class _MailFolderList extends React.Component {

    state = {
        onIsCompose: this.props.onIsCompose,
        activeFolder: null,
        activeStar: null
    }

    componentDidMount() {
        const urlSrcPrm = new URLSearchParams(this.props.location.search)
        const status = urlSrcPrm.get('status')
        const isStared = urlSrcPrm.get('isStared')
        this.setState({ activeFolder: status, activeStar: isStared })
    }

    componentDidUpdate(prevProps, prevState) {
        const urlSrcPrm = new URLSearchParams(this.props.location.search)
        const status = urlSrcPrm.get('status')
        const isStared = urlSrcPrm.get('isStared')
        if (prevProps.location.search !== this.props.location.search) this.setState({ activeFolder: status, activeStar: isStared })
    }

    onCountMail = () => {
        const mailsCount = mailService.mailCount()
        return mailsCount
    }

    onChooseActive = ({ target }) => {
        this.setState({
            mailType: target.dataset.mailtype
        })
    }




    render() {
        const { activeFolder, activeStar } = this.state
        console.log(activeFolder);
        return <section><button className='btn-toggle-menu' onClick={this.props.toggleMenu}>☰</button>
            <section className={`mail-folder-list flex column  ${this.props.isToggle ? 'menu-open' : ''}`}>
                <div className="add-mail" onClick={this.props.closeMenu} >
                    <button onClick={this.state.onIsCompose}>Compose<img src="assets/img/compose.png" /></button>
                </div>
                <div className="mail-folders flex column" >
                    <Link className={` ${activeFolder === 'inbox' ? 'active-folder' : ''} `} to="/mail?status=inbox"> <div onClick={this.props.closeMenu}><i className='fa-solid fa-inbox '></i> Inbox <span>{this.onCountMail()}</span> </div></Link>
                    <Link className={` ${!activeFolder && !activeStar ? 'active-folder' : ''} `} to="/mail"> <div onClick={this.props.closeMenu} ><i className="fa-solid fa-envelope"></i> All mails</div></Link>
                    <Link className={` ${activeFolder === 'sent' ? 'active-folder' : ''} `} to="/mail?status=sent"><div onClick={this.props.closeMenu}><i className="fa-solid fa-paper-plane"></i> Sent</div></Link>
                    <Link className={` ${activeStar ? 'active-folder' : ''} `} to="/mail?isStared=true"> <div onClick={this.props.closeMenu}><i className="fa-solid fa-star"></i> Starred</div></Link>
                    <Link className={` ${activeFolder === 'trash' ? 'active-folder' : ''} `} to="/mail?status=trash"><div onClick={this.props.closeMenu}><i className="fa-solid fa-trash"></i> Trash</div></Link>
                    <Link className={` ${activeFolder === 'draft' ? 'active-folder' : ''} `} to="/mail?status=draft"><div onClick={this.props.closeMenu}><i className="fa-solid fa-file"></i> Draft</div></Link>
                </div>
            </section>
        </section>
    }
}

export const MailFolderList = withRouter(_MailFolderList)