import React, { Component } from 'react';
import { Navbar, NavbarBrand } from "reactstrap";
import Menu from './MenuComponent';
import DishDetail from './DishdetailComponent';
import { DISHES } from '../shared/dishes'

class Main extends Component {
  constructor(props){
    super(props);

    this.state = {
      dishes: DISHES,
      selectedDish: null
    };
  }

  onDishSelect(dishId){
    this.setState({
      selectedDish: dishId
    });
  }

  render(){
    return(
      <div>
        <Navbar dark color="primary">
          <div className="container">
              <NavbarBrand href="/"> Ristorante Con Fusion </NavbarBrand>
          </div>
        </Navbar>

        <Menu dishes={ this.state.dishes } onClick={(dishId) => this.onDishSelect( dishId )} />
        // In main Component it maps out the dishes to dish object, the dishDetail compares the
        //selectedDish id to the dish object id, if it matches it returns the first element in the array
        // [0] select first item in array
        <DishDetail
        dish={this.state.dishes.filter((dish) => dish.Id === this.state.selectedDish)[0]} />
      </div>
    );
  }
}
export default Main;
