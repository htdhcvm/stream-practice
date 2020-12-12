import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import LoadFileOnClientWithPersent from './components/LoadFileOnClientWithPersent/LoadFileOnClientWithPersent';
import LoadManyImagesFromServer from './components/LoadManyImagesFromServer/LoadManyImagesFromServer';
import LoadManyDataFromServerWithDelay from './components/LoadManyDataFromServerWithDelay/LoadManyDataFromServerWithDelay';
import LoadFileToServerWithPercent from './components/LoadFileToServerWithPercent/LoadFileToServerWithPercent';
import WriteInDbAndPTag from './components/WriteInDbAndPTag/WriteInDbAndPTag';

import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';

import './App.scss';

const App = () => {
    return (
        <div className='App'>
            <Router>
                <Link to='/'>
                    <Typography variant='h1' component='h1' gutterBottom>
                        Tasks
                    </Typography>
                </Link>
                <ul className='header'>
                    <li>
                        <Link to='/loadFileOnClientWithPersent'>
                            <Tab label='Download file' />
                        </Link>
                    </li>
                    <li>
                        <Link to='/loadManyImagesFromServer'>
                            <Tab label='Donwload posts' />
                        </Link>
                    </li>
                    <li>
                        <Link to='/loadManyDataFromServerWithDelay'>
                            <Tab label='Download comments' />
                        </Link>
                    </li>
                    <li>
                        <Link to='/loadFileToServerWithPercent'>
                            <Tab label='Load file' />
                        </Link>
                    </li>
                    <li>
                        <Link to='/writeInDbAndPTag'>
                            <Tab label='Send fio' />
                        </Link>
                    </li>
                </ul>
                <Switch>
                    <Route
                        path='/loadFileOnClientWithPersent'
                        render={(props) => (
                            <LoadFileOnClientWithPersent {...props} />
                        )}
                    />
                    <Route
                        path='/loadManyImagesFromServer'
                        render={(props) => (
                            <LoadManyImagesFromServer {...props} />
                        )}
                    />
                    <Route
                        path='/loadManyDataFromServerWithDelay'
                        render={(props) => (
                            <LoadManyDataFromServerWithDelay {...props} />
                        )}
                    />
                    <Route
                        path='/loadFileToServerWithPercent'
                        render={(props) => (
                            <LoadFileToServerWithPercent {...props} />
                        )}
                    />
                    <Route
                        path='/writeInDbAndPTag'
                        render={(props) => <WriteInDbAndPTag {...props} />}
                    />

                    <Route path='/'></Route>
                </Switch>
            </Router>
        </div>
    );
};

export default App;
