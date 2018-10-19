import React, { Component } from 'react'
import './Card.css'
import Spinner from '../spinner/Spinner'

export default class Card extends Component {
  state = {
    imageLoaded: false
  }

  render() {
    return (
      <div className="card">
        {/* Image */}
        <a href={this.props.mapLink} target="_blank" rel="noopener noreferrer">
          <img style={{display: this.state.imageLoaded ? "inline" : "none"}} onLoad={() => this.setState({imageLoaded: true})} src={this.props.image} alt={this.props.desc} />
          <div style={{display: this.state.imageLoaded ? "none" : "flex"}}  className="placeholder"><Spinner/></div>
        </a>

        <div className="cardContent">
          {/* Title and location */}
          <div className="title"><a href={this.props.link}><h3>{this.props.name}<br/>{this.props.location}</h3></a></div>

          {/* Deals */}
          <div className="deals">
            {this.props.deals.map(this.toDeal)}  
          </div>         
        </div>
      </div>
    )
  }

  toDeal(deal) {
    let dealTime = ""

    if(deal.days && deal.time) {
      // both days and time
      dealTime = deal.days + " " + deal.time
    } else if(deal.days && !deal.time) {
      // just days
      dealTime = deal.days
    } else if(!deal.days && deal.time) {
      // just time
      dealTime = deal.time
    }

    return (
      <p key={dealTime + ": " + deal.offer} className="deal">{dealTime}: {deal.offer}</p>
    )
  }
}
