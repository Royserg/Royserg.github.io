import React, { Component } from 'react';

class AddTraining extends Component {
  constructor(){
    super();
    this.state = {
      newTraining: {}
    }
  }
  
  handleSubmit(e){
    e.preventDefault();
    let weight = parseInt(this.refs.weight.value, 10);
    let reps = parseInt(this.refs.reps.value, 10);
    
    if(weight && reps){
      this.setState({newTraining:{
        weight: weight,
        reps: reps
      }}, function(){
        this.props.addTraining(this.state.newTraining);
      })  
    } else {
      alert('Fill up the fields!');
    }
    
    
    
    this.refs.reps.value = '';
    this.refs.weight.value = '';
  }
  
  
  render(){
    return(
        <div className='row'>
          <div className='col-sm-10'>
              <form className='form-inline' onSubmit={this.handleSubmit.bind(this)}>
                <div className='form-group'>
                  <label>Weight</label>
                  <input type='text' ref='weight' />kg
                </div>
                <div className='form-group'>
                  <label>Reps</label>
                  <input type='text' ref='reps' />
                </div>
                <input type='submit' value="Add" className='btn btn-primary'/>
              </form>
          </div>
        </div>
      );
  }
}

export default AddTraining;