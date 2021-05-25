import { Component } from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle } from 'reactstrap';

class DishDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {

    };
    console.log('Menu Component constructor is Invoked');
  }

  renderDish(dish) {
    if(dish != null) {
      return(
        <div className="col-12 col-md-5 m-1">
          <Card>
            <CardImg width="100%" src={dish.image} alt={dish.name} />
            <CardBody>
              <CardTitle heading>{dish.name}</CardTitle>
              <CardText>{dish.description}</CardText>
            </CardBody>
          </Card>
        </div>
      )
    }
    else {
      return(
        //nothing will render on the screen
        <div></div>
      )
    }
  }

  renderComments(comments){
    if (comments == null) {
      return (<div></div>);
    }

    const commentInfo = comments.map(comment => {
      return (
        <div key={comment.id}>
          <li>
            <p>{comment.comment}</p>
            <p>-- {comment.author},
            &nbsp;
            // this formats the date value into a more readable format
            {new Intl.DateTimeFormat('en-US', {
              year: 'numeric',
              month: 'long',
              day: '2-digit'
            }).format(new Date(comment.date))}
            </p>
          </li>
        </div>
      )
    })
    // Returns the above information formatted as below
    return (
      <div className='col-12 col-md-5 m-1'>
        <h4> Comments </h4>
        <ul className='list-unstyled'>
          {commentInfo}
        </ul>
      </div>
    )
  }

  //Used to Render the selectedDish view, returned in the menuComponent
  render() {
    const selectedDish = this.props.dish

    if(selectedDish == null) {
      return(<div></div>);
    }

    const dishInfo = this.renderDish(selectedDish);
    const dishComment = this.renderComments(selectedDish.comments);
    return (
      <div className="row">
        {dishInfo}
        {dishComment}
      </div>
    )
  }
}

export default DishDetail;
