import {Switch, Route} from 'react-router-dom'
import Header from './components/Header'
import Home from './components/Home'
import About from './components/About'
import StateItem from './components/StateItem'
import './App.css'

const App = () => (
  <>
    <Header />
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/about" component={About} />
      <Route path="/state/:id" component={StateItem} />
    </Switch>
  </>
)

export default App
