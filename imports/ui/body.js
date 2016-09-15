import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';

import { Tasks } from '../api/tasks.js';

import './task.js';
import './body.html'; 

Template.body.onCreated(function bodyOnCreated(){
	this.state= new ReactiveDict();
	
});

Template.body.helpers({
  tasks() {
  	
  	const instance = Template.instance();
  	console.log("mensaje 0");
  	//console.log(instace.state.get('hideCompleted'));
  	console.log("mensaje 1");
  	//if(instace.state.get('hideCompleted')){
  		//if hide completed is checked, filter tasks
  	//	return Task.find({ checked:{$ne:true}},{sort:{createdAt:-1}});
  	//	return Tasks.find({}, {sort:{createdAt:-1}});
  	//}
  	//otherwise, return all the tasks
    return Tasks.find({}, {sort:{createdAt:-1}});
  },
}); 

Template.body.events({
	'submit .new-task'(event){
		console.log(event);
		//prevent default browser form submit
		event.preventDefault();

		//get value from form element
		const target = event.target;
		const text = target.text.value; 

		//insert a task into the collection

		Tasks.insert({
			text, createdAt: new Date(), //current time
		});

		//clear form
		target.text.value = '';
	},
	'change .hide-completed input'(event, instance){
		instance.state.set('hideCompleted', event.target.checked);
	},
});