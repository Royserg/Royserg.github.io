import React, { Component } from 'react';
import uuid from 'uuid';
import TrainingCategories from './Components/TrainingCategories'
import Trainings from './Components/Trainings'
import AddTraining from './Components/AddTraining'
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentCategory: '', 
      categories: [],
      trainings: []
    };
  }

  componentWillMount(){
    this.setState({
      currentCategory: "Bench Press",
      categories: [
        {
            id: uuid.v4(),
            name: "Bench Press",
        },
        {
            id: uuid.v4(),
            name: "Squats"
        },
        {
            id: uuid.v4(),
            name: "Biceps Curl"
        }
      ], 
      trainings: [
         {
             id: uuid.v4(),
             category: "Bench Press",
             weight: 20,
             reps: 10
         },
         {
             id: uuid.v4(),
             category: "Bench Press",
             weight: 70,
             reps: 6
         },
         {
             id: uuid.v4(),
             category: "Squats",
             weight: 55,
             reps: 9
         },
         {
             id: uuid.v4(),
             category: "Biceps Curl",
             weight: 45,
             reps: 12
         }
      ]
    })
  }

  handleAddCategory(newCategory){
    let categories = this.state.categories;
    
//    let categoryToAdd = {
//        id: uuid.v4(),
//        name: newCategory.name
//      }
    
    categories.push(newCategory);
    this.setState({categories:categories})
  }
  
  handleTrainingAdd(newTraining){
    let trainings = this.state.trainings;
    trainings.push(newTraining);
    
    this.setState({trainings:trainings})
    
  }
  
  handleCategoryChange(categoryName){
    let categories = this.state.categories;
    
    categories.forEach(category => {
      category.className = "";
      if(category.name === categoryName){
        category.className = "active";
      }
    })
    
    this.setState({
            currentCategory: categoryName,
            categories: categories
      })
  }
  
  handleTrainingDelete(id){
    let trainings = this.state.trainings;
    let index = trainings.findIndex(x => x.id === id);
    
    trainings.splice(index, 1);
    this.setState({trainings:trainings});
  }
  
  render(){
    return(
      <div className='container'>
        <TrainingCategories categories={this.state.categories} addCategory={this.handleAddCategory.bind(this)} onCategoryChange={this.handleCategoryChange.bind(this)}/>
        
        <Trainings onDelete={this.handleTrainingDelete.bind(this)} trainings={this.state.trainings} currentCategory={this.state.currentCategory}/>
        <AddTraining currentCategory={this.state.currentCategory} addTraining={this.handleTrainingAdd.bind(this)}/>
      </div>

    );
  }
}

export default App;
