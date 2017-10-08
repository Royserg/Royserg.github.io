import React, { Component } from 'react';
import TrainingItem from './TrainingItem';

class Trainings extends Component {
  deleteProject(id){
    this.props.onDelete(id);
  }
  
  render(){
    let currentCategory = this.props.currentCategory;
    let trainingItems;
    
    if(this.props.trainings){
      trainingItems = this.props.trainings.map(training => {
        if(training.category === currentCategory){
          return(
          <TrainingItem onDelete={this.deleteProject.bind(this)} key={training.id} training={training} />
          );  
        }
      });
    }
    
    
    return(
      <div className='trainings'>
        <h3>Latest Training</h3>
        {trainingItems}
      </div>

    );
  }
}

export default Trainings;