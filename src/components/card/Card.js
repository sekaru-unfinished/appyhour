import React, { Component } from 'react'
import './Card.css'
import Spinner from '../spinner/Spinner'

export default class Card extends Component {
  render() {
    return (
      <div className="card">
        {/* Image */}
        <a href={this.props.mapLink} target="_blank" rel="noopener noreferrer">
          {this.props.image ? <img src={this.props.image} alt={this.props.desc} /> : <div className="placeholder"><Spinner/></div>}
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
      <p className="deal">{dealTime}: {deal.offer}</p>
    )
  }
}
