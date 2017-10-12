import React, { Component } from 'react';
import AddCategory from './AddCategory'

class TrainingCategories extends Component {
  getCategoryName(e){
    let categories = this.props.categories;
    let categoryName = e.target.textContent.trim();
    let index = categories.findIndex(x => x.name === categoryName);
    console.log(e.target.textContent.trim());
    
    this.props.onCategoryChange(index);
  }
  
  
  AddCategory(newCategory){
    this.props.addCategory(newCategory);
  }
  
  render(){
    let trainingCategories;
    if(this.props.categories){
      trainingCategories = this.props.categories.map(category => {
        return (
          <li className={category.className} key={category.id} onClick={this.getCategoryName.bind(this)}><a> {category.name}</a></li>
        )
      })
    }
    
    return(
          <ul className="nav nav-pills">
              {trainingCategories}
              <AddCategory addCategory={this.AddCategory.bind(this)} />
          </ul>
      )
  }
}

export default TrainingCategories;
