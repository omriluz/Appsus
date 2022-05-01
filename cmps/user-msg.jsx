import { eventBusService } from "../services/event-bus.service.js";


export class UserMsg extends React.Component {

    state = {
        msg: null
    }

    removeEvent;
    timeoutId;

    componentDidMount() {
        this.removeEvent = eventBusService.on('user-msg', (msg) => {
            this.setState({ msg })
            if (this.timeoutId) clearTimeout(this.timeoutId)
            this.timeoutId = setTimeout(this.onCloseMsg, 5000)
        })
    }

    componentWillUnmount() {
        this.removeEvent()
    }

    onCloseMsg = () => {
        setTimeout(() => {this.msgType = this.state.msg.type}, 1000)
        this.setState({ msg: null })
        clearTimeout(this.timeoutId)
    }

    render() {
        const { msg } = this.state
        if (!msg) return <React.Fragment></React.Fragment>
        return <div className={`user-msg ${this.msgType}`}>
          &nbsp;  {msg.txt} <span className="btn-close" onClick={this.onCloseMsg}>&nbsp; X &nbsp;</span> 
            {/* <button  onClick={this.onCloseMsg}>X</button> */}
        </div>
    }
}