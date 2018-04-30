import React from 'react';
import { connect } from 'react-redux';
import { addDeck, showAddDeck, hideAddDeck } from '../actions';

const mapStateToProps = ({ decks, addingDeck }) => ({ decks, addingDeck });

const mapDispatchToProps = dispatch => ({
  addDeck: name => dispatch(addDeck(name)),
  showAddDeck: () => dispatch(showAddDeck()),
  hideAddDeck: () => dispatch(hideAddDeck())
});

class Sidebar extends React.Component {
  constructor(props) {
    super(props);

    this.textInput = null;
    this.setTextInputRef = element => {
      this.textInput = element;
    }
    this.focusTextInput = () => {
      if (this.textInput) this.textInput.focus();
    }
  }

  componentDidUpdate() {
    this.focusTextInput();
  }

  render() {
    let props = this.props;

    return (
      <div className='sidebar'>
        <h2> All Decks </h2>
        <button onClick={ e => this.props.showAddDeck() }>
          New deck
        </button>
        <ul>
        { props.decks.map((deck, i) =>
          <li key={i}> {deck.name} </li>
        )}
        </ul>
        { props.addingDeck && <input ref={this.setTextInputRef} onKeyPress={ this.createDeck.bind(this) }/> }
      </div>
    );
  }

  createDeck(evt) {
    if (evt.which !== 13) return;

    const name = evt.target.value;
    this.props.addDeck(name);
    this.props.hideAddDeck();
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);