import React from 'react';
import { connect } from 'react-redux';

import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import Scroll from '../components/Scroll';
import ErrorBoundary from '../components/ErrorBoundary';
import './App.css';
import { setSearchField, requestRobots } from '../actions';

const mapStateToProps = state => {
    return {
        searchfield: state.searchRobots.searchfield,
        robots: state.requestRobots.robots,
        isPending: state.requestRobots.isPending,
        error: state.requestRobots.error
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onSearchChange: (event) => dispatch(setSearchField(event.target.value)),
        // onRequestRobots: () => requestRobots(dispatch)
        onRequestRobots: () => dispatch(requestRobots())
    }
}
class App extends React.Component {
    // constructor() {
    //     super();
    //     this.state = {
    //         robots: [],
    // searchfield: ''
    //     }
    // }

    componentDidMount() {
        this.props.onRequestRobots();
        // console.log(this.props.store.getState());
        // fetch('https://jsonplaceholder.typicode.com/users')
        //     .then(res => res.json())
        //     .then(users => this.setState({ robots: users }))
    }


    // onSearchChange = (event) => {
    //     this.setState({ searchfield: event.target.value })

    // }

    render() {
        // const { robots, searchfield } = this.state;
        const { searchfield, onSearchChange, robots, isPending } = this.props;
        // const { robots } = this.state;
        const filteredRobots = robots.filter(robot => {
            return robot.name.toLowerCase().includes(searchfield.toLowerCase());
        })
        return isPending ? <h1>Loading</h1> :
            (
                <div className='tc'>
                    <h1 className='f1'>Robofriends</h1>
                    <SearchBox searchChange={onSearchChange} />
                    <Scroll>
                        <ErrorBoundary>
                            <CardList robots={filteredRobots} />
                        </ErrorBoundary>
                    </Scroll>
                </div>
            )
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(App);