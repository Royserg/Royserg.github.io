import React, { Component } from 'react';

class WorkoutItem extends Component {
  deleteTraining(id){
    this.props.onDelete(id);
  }
  
  render(){
    return(
        <li>
          {this.props.workout.weight}kg x{this.props.workout.reps}
          
        </li>
      );
  }
}

export default WorkoutItem;