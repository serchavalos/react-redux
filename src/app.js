const cards = (state, action) => {
  switch(action.type) {
    case 'ADD_CARD':
      let newCard = Object.assign({}, action.data, {
        score: 1,
        id: +new Date
      });

      return state.concat([newCard]);

    default:
      return state || [];
  }
};

const addDeck = (name) => ({ type: 'ADD_DECK', data: name});
const showAddDeck = () => ({ type: 'SHOW_ADD_DECK'});
const hideAddDeck = () => ({ type: 'HIDE_ADD_DECK'});

const decks = (state, action) => {
  switch(action.type) {
    case 'ADD_DECK':
      let newDeck = { name: action.data, id: +new Date };
      return state.concat([newDeck]);

    default:
      return state || [];
  }
};

const addingDeck = (state, action) => {
  switch (action.type) {
    case 'SHOW_ADD_DECK': return true;
    case 'HIDE_ADD_DECK': return false;
    default: return !!state;
  }
}

const App = (props) => {
  return (
    <div className='app'>
      {props.children}
    </div>
  );
}

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

const store = Redux.createStore(Redux.combineReducers({ cards, decks, addingDeck }));

function run() {
  let state = store.getState();
  console.log(state);
  ReactDOM.render(<App>
    <Sidebar
      decks={state.decks}
      addingDeck={state.addingDeck}
      addDeck={name => store.dispatch(addDeck(name))}
      showAddDeck={() => store.dispatch(showAddDeck())}
      hideAddDeck={() => store.dispatch(hideAddDeck())}
    />
  </App>, document.getElementById('root'));
}

run();

store.subscribe(run);