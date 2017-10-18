import React, { Component } from 'react';
import { Jumbotron, Grid } from 'react-bootstrap';
//import uuid from 'uuid';
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
    
    // fix it to be like categories below:
    workoutsRef.on('child_added', snap => {
      let workout = {
        id: snap.val().id,
        category: snap.val().category,
        weight: snap.val().weight,
        reps: snap.val().reps,
      }
      workouts.push(workout);
    })
    
    this.setState({workouts:workouts})
    
    
    categoriesRef.once('value', snap => {  
//      console.log(snap.val()); // object of keys with objects
      let keys = Object.keys(snap.val());
      for(let i = 0; i < keys.length; i++){
        let k = keys[i];
        let id = snap.val()[k].id;
        let categoryName = snap.val()[k].name;
        categories.push({
          id: id,
          name: categoryName
        })
//        console.log(k)
//        console.log(id)
//        console.log(categoryName)
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
    
    let id = categoriesRef.push().key;
    let category = {
      id: id,
      name: newCategory
    }
    // and add the category to the state 
    categories.push(category);
    this.setState({categories:categories})
    // add category to the db
    categoriesRef.push(category);
    
  }
  
  handleTrainingAdd(newTraining){
    let currentCategory = this.state.currentCategory;
    let workouts = this.state.workouts;
    
    let workoutsRef = fire.database().ref('workouts/Royserg/')
    
    let newWorkout= {
      id: workoutsRef.push().key,
      category: currentCategory,
      weight: newTraining.weight,
      reps: newTraining.reps
    }
    
    workouts.push(newWorkout); // update state
    this.setState({workouts:workouts})
    
    workoutsRef.push(newWorkout); // add to db
    
    
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
