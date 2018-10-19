import React, { Component } from 'react'
import './App.css'
import Header from './components/header/Header'
import Card from './components/card/Card'
import db from './assets/db'

export default class App extends Component {
  state = {
    search: ""
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
    let places = db.filter(this.filter.bind(this))

    return (
      <div className="cards">
        {
          places.length===0
          ? <p>Couldn't find any places in that area</p>
          : places.map(place => <Card {...place} />)
        }
      </div>
    )
  }

  filter(place) {
    place.searchVal = place.location + " " + place.name

    if(this.state.search.length===0) return true
    return place.searchVal.toLowerCase().indexOf(this.state.search.toLowerCase())!==-1
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
        <div>On now</div>
        <div>Ending soon</div>
        <div className="selected">Show me everything</div>
      </div>
    )
  }
}
