import React, { Component } from 'react';
import WorkoutItem from './WorkoutItem';

class Trainings extends Component {
  deleteProject(id){
    this.props.onDelete(id);
  }
  
  render(){
    let currentCategory = this.props.currentCategory;
    let workoutItems;
    
    if(this.props.workouts){
      workoutItems = this.props.workouts.map( workout => {
        return (
          <WorkoutItem key={workout.id} workout={workout} />
        )
        
      })}
 
    return(
      <div className='trainings'>
        <h3>Latest Training</h3>
        {workoutItems}
      </div>
    );
  }
}

export default Trainings;