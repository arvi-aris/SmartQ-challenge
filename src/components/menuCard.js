import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import axios from 'axios';
import _ from 'lodash';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

class MenuCard extends Component {

  constructor(props){
    super(props);
    this.state = {
       cart : {}
    }
  }

  checkAvailabilty(availabletime) {
    let currentTime = new Date().getHours() + " " + new Date().getMinutes();
    let availableStartTime = availabletime.split('-')[0];
    let availableEndTime = availabletime.split('-')[1]; 
    if(currentTime.split(':')[0] < availableStartTime.split(':')[0]) {
      return false;
    }
    else if(currentTime.split(':')[0] == availableStartTime.split(':')[0] && currentTime.split(':')[1] < availableStartTime.split(':')[1]) {
        return false;
    }
    else if(currentTime.split(':')[1] > availableStartTime.split(':')[1]) {
      return false
    }
    else if(currentTime.split(':')[1] == availableStartTime.split(':')[1] && currentTime.split(':')[1] > availableStartTime.split(':')[1]) {
      return false;
    }
    return true;
  }

  addToCart(item) {
    let cart = this.props.cart;
    if (cart[item.name]) {
      cart[item.name].count++;
    }
    else {
      cart[item.name] = item;
      item.count = 1;
    }
    this.props.getCart(cart);
  }

  deleteCart(item) {
    let cart = this.props.cart;
    if (cart[item.name]) {
      cart[item.name].count--;
    }
    if(!cart[item.name].count) {
      delete cart[item.name]
    }
    this.props.getCart(cart);
  }

  render() {
    return(
      <div> 
        <p class="item-category" > {this.props.category} </p>
         {this.props.item.map(item => {
           let foodType = (item.vegflag === "veg" ? "green" : "red");
           let color = {
             color: foodType,
             backgroundColor: foodType
           }
           let isAvailable = this.checkAvailabilty(item.availabletime);
            return(
              <div className={"item " + (isAvailable ? '' : 'disabled')}>
                <Grid container spacing={24}>
                  <Grid item xs={1}>
                    <i class="material-icons food-type-icon" style={color}>
                    crop_square
                    </i>  
                  </Grid>
                  <Grid item xs={6}>
                    <div>
                    <p class="item-name"> {item.name} </p>
                    <p> {item.description} </p>
                    </div>
                  </Grid>
                  <Grid item xs={3}>
                    <Grid container spacing={24}>
                      <Grid item xs>
                      { item.count ? <i class="material-icons cart-icons" onClick={this.deleteCart.bind(this, item)} >
                          remove_circle_outline
                        </i> : '' }
                      </Grid>
                      <Grid item xs>
                        { item.count ? <span> {item.count} </span> : '' }
                      </Grid>
                      <Grid item xs>
                        <i class="material-icons cart-icons" onClick={this.addToCart.bind(this, item)}>
                          add_circle
                        </i>
                      </Grid>
                      </Grid>
                  </Grid>
                  <Grid item xs={2}>
                    {isAvailable ? <div> &#8377; {item.price}</div> : ''}
                  </Grid>
                </Grid>
              </div>
            )
         })}
      </div>
    )
  }
}

export default MenuCard;
