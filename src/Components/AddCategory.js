import React, { Component } from 'react';

class AddCategory extends Component {
  constructor(){
    super();
    this.state = {
      newCategory: ""
    }
  }
  
  handleSubmit(e) {
    e.preventDefault();
    let newCategoryName = this.refs.categoryName.value;
    
    if (newCategoryName === ""){
      alert('Training name is required!')
    } else {
      this.setState({ newCategory: newCategoryName }, function(){
        //console.log(this.state);
        this.props.addCategory(this.state.newCategory);
      });
    }
    
    this.refs.categoryName.value = '';
  }
  
  
  render(){
    return(
        <div>
          <button className='btn btn-success'>
            Add
          </button>
          <form onSubmit={this.handleSubmit.bind(this)}>
            <input type='text' ref='categoryName' placeholder='name' />
          </form>
        </div>
      )
  }
}

export default AddCategory;
