import React from "react";
import "./Modal.css";

class Modal extends React.Component {
    state = {
        isOpen: false
    }

    closeModal = () => {
        this.setState({isOpen: false})
    } // синтаксис метода со стрелочной функцией не теряет this при вызове метода по событию

    render() {
        return (
            <div>
                <button onClick={() => this.setState({isOpen: true})}>Open modal</button>

                {this.state.isOpen && (
                    <div className="modal">
                        <div className="modal-body">
                            <h1>Modal title</h1>
                            <p>I'm awesome modal!</p>
                            <button onClick={this.closeModal}>Close modal</button>
                        </div>
                    </div>
                )}
            </div>
        )
    }
}

export default Modal;