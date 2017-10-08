import React, { Component } from 'react';

class TrainingItem extends Component {
  deleteTraining(id){
    this.props.onDelete(id);
  }
  
  render(){
    return(
        <li>
          {this.props.training.weight}kg x {this.props.training.reps} 
          [{this.props.training.category}] 
          <button onClick={this.deleteTraining.bind(this, this.props.training.id)} className='btn btn-xs btn-danger'>X</button>
        </li>
      );
  }
}

export default TrainingItem;