
export class MailFolderList extends React.Component {

    state = {

    }

    render() {
        return <section className="mail-folder-list flex column">
            <div className="add-mail" >

                <button onClick={this.props.onIsCompose}>Compose<img src="../../assets/imgs/compose.png" /></button>
            </div>
            <div className="mail-folders flex column" >
                <div><i className="fa-solid fa-inbox"></i> Inbox</div>
                <div><i className="fa-solid fa-envelope"></i> All mails</div>
                <div><i className="fa-solid fa-star"></i> Starred</div>
                <div><i className="fa-solid fa-paper-plane"></i> Sent</div>
                <div><i className="fa-solid fa-trash"></i> Trash</div>
                <div><i className="fa-solid fa-file"></i> Draft</div>
            </div>
        </section>
    }
}