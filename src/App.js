import React, { Component } from 'react'
import './App.css'
import Header from './components/header/Header'
import Card from './components/card/Card'
import db from './assets/db'
import { sortOnNow, filter } from './utils/Sorting'

export default class App extends Component {
  state = {
    search: "",
    sortMode: 0,
    places: []
  }

  componentWillMount() {
    let onNow = sortOnNow(db)
    let everything = db
    this.setState({places: [onNow, everything]})
  }

  render() {
    return (
      <div className="app">
        <Header/>

        <p className="intro">Welcome to AppyHour, a place to discover London's booziest deals</p>

        {this.renderSearch()}

        {this.renderSort()}

        {this.renderCards()}
      </div>
    )
  }

  renderCards() {
    let places = this.state.places[this.state.sortMode].filter(place => filter(this.state.search, place))

    return (
      <div className="cards">
        {
          places.length===0
          ? <p>Couldn't find anywhere :(</p>
          : places.map(place => <Card key={place.name + ", " + place.location} {...place} />)
        }
      </div>
    )
  }

  renderSearch() {
    return (
      <div className="search">
        <input onChange={e => this.setState({search: e.target.value})} placeholder="Search for a specific place or deals in your area" value={this.state.search} />
      </div>
    )
  }

  renderSort() {
    return (
      <div className="sorts">
        <div onClick={() => this.setState({sortMode: 0})} className={this.state.sortMode===0 ? "selected" : ""}>On now <span className="onNow">{this.state.places[0].length}</span></div>
        <div onClick={() => this.setState({sortMode: 1})} className={this.state.sortMode===1 ? "selected" : ""}>Show me everything</div>
      </div>
    )
  }
}
