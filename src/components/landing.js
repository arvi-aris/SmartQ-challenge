import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Paper from '@material-ui/core/Paper';
import axios from 'axios';
import _ from 'lodash';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MenuCard from './menuCard.js';
const styles = {
}
class Bar extends Component {

  constructor(props){
    super(props);
    this.state = {
        menu : [],
        category : [],
        cart: [],
        cartEmptied : false
    }
  }

  componentDidMount() {
    axios.get('https://thesmartq.firebaseio.com/menu.json')
      .then(response => {
        let menuList = _.compact(_.get(response, 'data'));
        let category = _.union(_.map(menuList, 'category'));
        let menu = {};
        menuList.forEach(item => {
          if(!menu[item.category]) {
            menu[item.category] = [];
          }
          menu[item.category].push(item);
        });
        let mastermenu = _.cloneDeep(menu);
        this.setState({
          menu: menu,
          category: category,
          mastermenu: mastermenu
        })
      });
  }

  getAddedItems(cartItems) {
    if(!cartItems) {
      this.setState({
        cartEmptied: false
      });
    }
    else this.setState({
      cart: cartItems
    });
  }

  emptyCart() {
    let mastermenu = _.cloneDeep(this.state.mastermenu);
    this.setState({
      cart: {},
      menu: mastermenu
    });
  }

  scrollToTab (categoryName) {
    const node = ReactDOM.findDOMNode(this['_div' + categoryName]);
    if (node) {
      node.scrollIntoView({ behavior: 'smooth' });
    }
  }

  render() {
    return(
      <div class="landing">
         <Grid container spacing={24}>
         <Grid item xs={2}>
           <Paper><List component="category">
                <ListItemText primary="All" className="item-category"/> 
                  {this.state.category.map(categoryName => {
                    return (
                      <div className="listItem"> 
                        <ListItem button>
                          <ListItemText primary={categoryName} onClick={this.scrollToTab.bind(this, categoryName)}/> 
                        </ListItem>
                      </div>
                    );
                  })}
            </List></Paper>
         </Grid>
         <Grid item xs={6}>
           <Paper><List component="menu">{Object.keys(this.state.menu).map(menuItem => {
                    return (
                      <MenuCard ref={(ref) => this['_div' + menuItem] = ref} item={this.state.menu[menuItem]} category={menuItem} getCart={this.getAddedItems.bind(this)} cartEmptied={this.state.cartEmptied} cart={this.state.cart} />
                    );
                  })}
            </List></Paper>
         </Grid>
         <Grid item xs={4}>
           <Paper style={{margin: '10px'}}>
           <List component="cart">
          <p class="item-category" > YOUR CART  { Object.keys(this.state.cart).length ? <i class="material-icons cart-icons delete-cart" onClick={this.emptyCart.bind(this)} >delete</i> : '' } </p>
           <div class="cart-items">
           <div className="cart-accounts">
           {Object.keys(this.state.cart).map(cartItem => {
               return (<Grid container spacing={24}>
                  <Grid item xs>
                    <span class="cart-item-name"> {cartItem} </span>
                  </Grid>
                  <Grid item xs>
                    <Grid container spacing={24}>
                      <Grid item xs> <i class="material-icons"> clear </i> </Grid>
                      <Grid item xs> {this.state.cart[cartItem]['count']} </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs>
                  &#8377; {this.state.cart[cartItem]['count'] * this.state.cart[cartItem]['price']}
                  </Grid>
                </Grid>)
             })}
             </div>
             <Grid container spacing={24} className="totalArea">
                  <Grid item xs>
                    <span class="cart-item-name">
                      <b> Total </b>
                    </span>
                  </Grid>
                  <Grid item xs>
                    <Grid container spacing={24}>
                      <Grid item xs> </Grid>
                      <Grid item xs> {Object.keys(this.state.cart).reduce((total, cartItem) => total+this.state.cart[cartItem]['count'], 0)} </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs>
                  &#8377; {Object.keys(this.state.cart).reduce((total, cartItem) => total+this.state.cart[cartItem]['price'], 0)}
                  </Grid>
                </Grid></div>
                <p class="item-category" > CHECK OUT </p>
                </List>
           </Paper>
         </Grid>
       </Grid>
      </div>
    )
  }
}

export default Bar;
