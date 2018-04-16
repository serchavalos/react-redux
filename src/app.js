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

const decks = (state, action) => {
  switch(action.type) {
    case 'ADD_DECK':
      let newDeck = Object.assign({}, action.data, { id: +new Date });

      return state.concat([newDeck]);

    default:
      return state || [];
  }
};

const store = Redux.createStore(Redux.combineReducers({ cards, decks }));

const App = (props) => {
  return (
    <div className='app'>
      <h1>Hello React</h1>
    </div>
  );
}

ReactDom.render(<App />, document.getElementById('root'));