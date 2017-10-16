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
      currentCategory: 'Bench Press', 
      categories: [],
      workouts: []
    };
  }
  
  componentWillMount(){
    
    let categories = this.state.categories;
    let categoriesRef = fire.database().ref('categories/Royserg');
    
    let workouts = this.state.workouts;
    let workoutsRef = fire.database().ref('workouts/Royserg/')
    
    workoutsRef.on('child_added', snap => {
      let workout = {
        id: snap.key,
        category: snap.val().category,
        weight: snap.val().weight,
        reps: snap.val().reps,
      }
      workouts.push(workout);
    })
    
    this.setState({workouts:workouts})
    
    
    categoriesRef.once('value', snap => {  
      let keys = Object.keys(snap.val());
      for(let i = 0; i < keys.length; i++){
        let k = keys[i];
        let categoryName = snap.val()[k]
        categories.push({
          id: k,
          name: categoryName
        })
      }
      
      this.setState({
        categories:categories
      })
    })
  }
  
  handleAddCategory(newCategory){
    let categories = this.state.categories;  
    let db = fire.database();
    let categoriesRef = db.ref('categories/Royserg');
    categoriesRef.push( newCategory ); // add cat to db
    
    // assign id to a variable
    // and add the category to the state 
  }
  
  handleTrainingAdd(newTraining){
    let currentCategory = this.state.currentCategory;
    let workouts = this.state.workouts;
    
    let workoutsRef = fire.database().ref('workouts/Royserg/')
//    console.log(workoutsRef.push().key);
    
    let newWorkout= {
      id: workoutsRef.push().key,
      category: currentCategory,
      weight: newTraining.weight,
      reps: newTraining.reps
    }
    
//    workouts.push(newWorkout); // update state
    
    workoutsRef.push(newWorkout); // add to db
    this.setState({workouts:workouts})
    
    
  }
  
  handleCategoryChange(categoryName){
    let categories = this.state.categories;
      
    categories.forEach( (category,index) => {
      category.className = "";
      if(category.name === categoryName){
        category.className = 'active';
      }  
    })
        
    this.setState({
            currentCategory: categoryName,
            categories: categories
      })
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
          
          <AddTraining 
            currentCategory={this.state.currentCategory} 
            addTraining={this.handleTrainingAdd.bind(this)}
          />
          
        </Grid>
      </div>

    );
  }
}

export default App;
