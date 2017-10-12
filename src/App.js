import React, { Component } from 'react';
import { Jumbotron, Grid } from 'react-bootstrap';
import uuid from 'uuid';
import TrainingCategories from './Components/TrainingCategories'
import Trainings from './Components/Trainings'
import AddTraining from './Components/AddTraining'
import fire from './fire';

class App extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      currentCategory: '', 
      categories: [],
      workouts: []
    };
  }

  componentWillMount(){
    let currentCategory = this.state.currentCategory;
    let db = fire.database();
    let categories = this.state.categories;
    let categoriesRef = db.ref('categories/Royserg');
    
    currentCategory = 'Bench Press'
    
    
    categoriesRef.on('child_added', snap => {
      categories.push({
        id: snap.key,
        name: snap.val(),
      })
  
      this.setState({
        categories: categories,
      })
    })

    let workouts = this.state.workouts;
    let workoutsRef = db.ref('workouts/Royserg/')
    
    workoutsRef.on('child_added', snap => {
      console.log(snap.val())
      console.log(snap.key)
      workouts.push({
        id: snap.key,
        workouts: snap.val()
      })
    }) 
    
    this.setState({
        workouts: workouts,
        currentCategory: currentCategory
    })
  }
          
  

  handleAddCategory(newCategory){
    let categories = this.state.categories;  
    let db = fire.database();
    let categoriesRef = db.ref('categories/Royserg');
    categoriesRef.push( newCategory ); 
  }
  
  handleTrainingAdd(newTraining){
    let currentCategory = this.state.currentCategory;
    let trainingsRef = fire.database().ref('workouts/Royserg/'+currentCategory)
    
    if(!currentCategory){
      alert('choose category');
    } else {
      trainingsRef.push(newTraining);
    }
    
  }
  
  handleCategoryChange(categoryIndex){
    let categories = this.state.categories;
    
    categories.forEach( (category,index) => {
      category.className = "";
    })
    categories[categoryIndex].className = "active";
    
    this.setState({
            currentCategory: categories[categoryIndex].id,
            categories: categories
      })
    
    console.log(this.state.currentCategory);
  }
  
  handleTrainingDelete(id){
    let categories = this.state.categories;
    let currentCategory = this.state.currentCategory;
    
    let categoryIndex = categories.findIndex(category => category.name === currentCategory);
    let trainingIndex = categories[categoryIndex].trainings.findIndex(x => x.id === id);
    
    categories[categoryIndex].trainings.splice(trainingIndex, 1);
    
    this.setState({categories:categories});
  }
  
  render(){
    return(
      <div>
        <Jumbotron>
          <Grid>
            <TrainingCategories categories={this.state.categories} addCategory={this.handleAddCategory.bind(this)} onCategoryChange={this.handleCategoryChange.bind(this)}/>
          </Grid>
        </Jumbotron>
        <Grid>
          <Trainings onDelete={this.handleTrainingDelete.bind(this)} workouts={this.state.workouts} currentCategory={this.state.currentCategory}/>
          <AddTraining currentCategory={this.state.currentCategory} addTraining={this.handleTrainingAdd.bind(this)}/>
        </Grid>
      </div>

    );
  }
}

export default App;
