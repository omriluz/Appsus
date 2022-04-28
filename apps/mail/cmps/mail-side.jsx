
export class MailSide extends React.Component {

    state = {

    }

    render() {
        return <section className="mail-side">
            <div className="add-mail" >
                <button onClick={this.props.onIsCompose}><img src="../../assets/imgs/compose.png" /></button>
            </div>
        </section>
    }
}