import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem, Button,
Modal, ModalBody, ModalHeader, Label, Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Control, LocalForm, Errors } from 'react-redux-form';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';

// Validators for fields
const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);


// Creates a popup form that contains rating selector, name and comment, throws
// in line errors for incorrect selection. Displays results in a console log and
// alert popup
class CommentForm extends Component {
  constructor(props) {
    super(props);

    // set the inital state to false for the popup modal
    this.state = {
      isCommentFormModalOpen: false
    };

    this.toggleCommentFormModal = this.toggleCommentFormModal.bind(this);
    this.handleCommentFormSubmit = this.handleCommentFormSubmit.bind(this);
  }

  handleCommentFormSubmit(values) {
    this.toggleCommentFormModal();
    this.props.postComment(this.props.dishId, values.rating, values.author, values.comment);
  }

  toggleCommentFormModal() {
    this.setState({
      isCommentFormModalOpen: !this.state.isCommentFormModalOpen
    });
  }

  render() {
    return (
      <React.Fragment>
        <Button outline onClick={this.toggleCommentFormModal}>
          <span className="fa fa-comments fa-lg"></span> Submit Comment
        </Button>

        <Modal isOpen={this.state.isCommentFormModalOpen}>
          <ModalHeader toggle={this.toggleCommentFormModal}>Submit Comment</ModalHeader>

          <ModalBody>
            <LocalForm onSubmit={(values) => this.handleCommentFormSubmit(values)}>
              <Row className="form-group">
                <Label htmlFor="rating" md={12}>Rating</Label>
                <Col md={12}>
                  <Control.select model=".rating" id="rating" name="rating"
                    className="form-control"
                    validators={{
                      required
                  }}>
                  <option>Please Select</option>
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                  <option>5</option>
                </Control.select>
                  <Errors
                   className="text-danger"
                   model=".rating"
                   show="touched"
                   messages={{
                     required: 'Required'
                   }}
                  />
                </Col>
              </Row>
              <Row className="form-group">
                <Label htmlFor="author" md={12}>Your Name</Label>
                <Col md={12}>
                  <Control.text model=".author" id="author" name="author"
                    placeholder="Author"
                    className="form-control"
                    validators={{
                      required,
                      minLength: minLength(3),
                      maxLength: maxLength(15)
                    }}
                  />
                  <Errors
                   className="text-danger"
                   model=".author"
                   show="touched"
                   messages={{
                     required: 'Required',
                     minLength: 'Must be greater than 2 characters',
                     maxLength: 'Must be 15 characters or less'
                   }}
                  />
                </Col>
              </Row>
              <Row className="form-group">
                <Label htmlFor="comment" md={2}>Comment</Label>
                <Col md={12}>
                  <Control.textarea model=".comment" id="comment" name="comment"
                    rows="6"
                    className="form-control"
                    validators={{
                      required
                    }}
                  />
                  <Errors
                    className="text-danger"
                    model=".comment"
                    show="touched"
                    messages={{
                      required: 'Required',
                    }}
                  />
                </Col>
              </Row>
              <Row className="form-group">
                <Col>
                  <Button type="submit" color="primary">Submit</Button>
                </Col>
              </Row>
            </LocalForm>
          </ModalBody>
        </Modal>
      </React.Fragment>
    );
  }
}

function RenderDish({dish}) {
  return (
    <div className="col-12 col-md-5 m-1">
      <Card>
        <CardImg top src={baseUrl + dish.image} alt={dish.name} />
        <CardBody>
          <CardTitle heading>{dish.name}</CardTitle>
          <CardText>{dish.description}</CardText>
        </CardBody>
      </Card>
    </div>
  );
}

// <CommentForm dish={dish} comments={comments} this is what is making
// the comment form popup
function RenderComments({comments, postComment, dishId}){
  if (comments == null) {
    return (<div></div>)
  }
  const cmnts = comments.map(comment => {
    return (
      <li key={comment.id}>
        <p>{comment.comment}</p>
        <p>-- {comment.author},
        &nbsp;
        {new Intl.DateTimeFormat('en-US', {
            year: 'numeric',
            month: 'long',
            day: '2-digit'
        }).format(new Date(comment.date))}
        </p>
      </li>
    )
  })
  return (
    <div className='col-12 col-md-5 m-1'>
      <h4> Comments </h4>
      <ul className='list-unstyled'>
        {cmnts}
      </ul>
      <CommentForm dishId={dishId} postComment={postComment} />
    </div>
  )
}

const DishDetail = (props) => {
  if (props.isLoading){
    return(
      <div className="container">
        <div className="row">
          <Loading />
        </div>
      </div>
    );
  }
  else if (props.errMess) {
    return(
      <div className="container">
        <div className="row">
          <h4>{props.errMess}</h4>
        </div>
      </div>
    );
  }

  else if (props.dish != null)
    return (
      <div className="container">
        <div className="row">
          <Breadcrumb>
            <BreadcrumbItem><Link to='/menu'>Menu</Link></BreadcrumbItem>
            <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
          </Breadcrumb>
          <div className="col-12">
            <h3>{props.dish.name}</h3>
            <hr />
          </div>
        </div>
        <div className="row">
          <RenderDish dish={props.dish} />
          <RenderComments comments={props.comments}
            postComment={props.postComment}
            dishId={props.dish.id}
          />
        </div>
      </div>
    );
  else
    return(
      <div></div>
    )
}

export default DishDetail;
