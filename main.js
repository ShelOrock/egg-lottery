const { Component } = React;
const { render } = ReactDOM;
const { HashRouter, Link, Route, Switch, Redirect } = ReactRouterDOM;

const app = document.querySelector('#app');

const Nav = ({options}) => {
    return (

    <nav>
        <Link to='/home'>Home</Link>
        {
            options.map((link, idx) => {
                return <Link
                    key={ idx } 
                    to={`/games/${link.name
                        .split(' ')
                        .join('')
                        .toLowerCase()}`}>{link.name}
                    </Link>
            })
        }
    </nav>
)
    }

class Home extends Component {
    constructor( {options} ) {
        super();
        this.state = {
            options,
            selectValue: 'Powerball',
            ticket: []
        }
    }

    changeGame = (e) => {
        this.setState({
            selectValue: e.target.value
        })
    }

    ticketNumber = (e) => {
        this.setState({
            ticket: [],
        })
    }

    submitForm = (e) => {
        e.preventDefault();
        this.setState({ 
            ticket: [] 
        })
    }

    render() {
        const { options, selectValue } = this.state;
        console.log(options)
        return (
            <div>
                <div>
                    <h2>Check your numbers:</h2>
                    <form>
                        { new Array (options.find(option => option.name === selectValue).gameLength * 1)
                            .fill('')
                            .map((item, idx) => <input key={ idx } type='number' onChange={ this.ticketNumber }/>) }
                        <div>
                            <p>Game:</p>
                            <select name='gameSelect' onChange={ this.changeGame } value={ selectValue }>
                                {
                                    options.map((option, idx) => <option key={ idx }>{option.name}</option>)
                                }
                            </select>
                            <button onClick={ this.submitForm }>Check My Numbers!!</button>
                        </div>
                    </form>
                </div>
                <div>
                    <h4>Rules</h4>
                    <p>Powerball has 5 balls that range from 1-69 and 1 ball that ranges from 1-26</p>
                    <p>Mega Millions has 5 balls that range from 1-70 and 1 ball that ranges from 1-25</p>
                    <p>Take Five has 5 balls that range from 1-39</p>
                </div>
            </div>
        )
    }
}

const Game = (options) => {
    const { match: { params: { game }}} = options
    return (
    <div>
        <h1>
            {
                options.options
                    .find(option => option.name
                            .split(' ')
                            .join('')
                            .toLowerCase() === game
                            ).name
            }
        </h1>
        <div>
            <h2>Winning Numbers:</h2>
            {
                new Array(options.options
                    .find(option =>option.name
                    .split(' ')
                    .join('')
                    .toLowerCase() === game
                    ).gameLength * 1)
                    .fill('')
                    .map((space, idx) => <div key={ idx }>{ Math.ceil(Math.random() * 100)}</div>)
            }
        </div>
    </div>
)
        }

class App extends Component {
    constructor() {
        super();
        this.state = {
            options: [
                {
                    name: 'Powerball',
                    gameLength: 6,
                },
                {
                    name: 'Mega Millions',
                    gameLength: 6
                },
                {
                    name: 'Take Five',
                    gameLength: 5
                }
            ],
        }
    }

    render() {
        const { options } = this.state
        return (
            <div>
                <HashRouter>
                    <Nav options={ options }/>
                    <h1>Egg Lottery</h1>
                    <Switch>
                        <Route path='/home' render={() => <Home options={options}/> } />
                        <Route path='/games/:game' render={(props) => <Game options={options} {...props}/>}/>
                        <Redirect to='/home'/>
                    </Switch>
                </HashRouter>
            </div>
        )
    }
}

render(<App />, app)