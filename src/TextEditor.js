import React, {Component} from 'react';
import './common.css';

class TextEditor extends Component {
	constructor(props) {
		super(props);
		this.state = {
			itemStack: [], // a stack with all the items added to the screen
			currentTextItems: { // a object holding the current items not added to the screen
				Chapter: '',
				Section: '',
				SubSection: '',
				Text: '',
			},
			itemsCountPushed: [],
		}
		this.onChange = this.onChange.bind(this); // used to bind functions
		this.handleSubmit = this.handleSubmit.bind(this);
		this.undoLastOperation = this.undoLastOperation.bind(this);
	}

	handleSubmit(event) {
		event.preventDefault(); // to prevent the default behaviour of the form
		let copiedTextStack = this.state.itemStack.slice();
		let copiedItemsCountPushed = this.state.itemsCountPushed.slice();
		let itemCount = 0;
		for (let key in this.state.currentTextItems) {
			if (this.state.currentTextItems[key] !== '') {
				copiedTextStack.push(
					{
						tag: key,
						value: this.state.currentTextItems[key]
					}
				); // the order is really important therefore that has te be fixed
				itemCount++;
			}
		}
		copiedItemsCountPushed.push(itemCount);
		this.setState(
			{
				currentTextItems: { // empty the current text item object
					Chapter: '',
					Section: '',
					SubSection: '',
					Text: '',
				},
				itemStack: copiedTextStack,
				itemsCountPushed: copiedItemsCountPushed,
			}
		);
		// this.props.updateView(this.state.itemStack); // in the future used to update the view
	}

	addItemToState(value, type) {
		let items = Object.assign({}, this.state.currentTextItems);
		if(value !== '') {
			items[type] = value;	
			this.setState(
				{
					currentTextItems: items,
				}
			);
		}
	}

	onChange(value, type) {
		this.addItemToState(value, type); // add item to the object or adjust it
	}

	undoLastOperation() {
		let copiedTextStack = this.state.itemStack.slice(); // get a copy of an array by slice()
		let copiedItemsCountPushed = this.state.itemsCountPushed.slice();
		let itemCount = copiedItemsCountPushed.pop()
		for(let i=0;i<itemCount;i++) {
			copiedTextStack.pop();
		} 
		this.setState(
			{
				itemStack: copiedTextStack,
				itemsCountPushed: copiedItemsCountPushed,
			}
		);
		// this.props.updateView(this.state.itemStack); // in the future used to update the view
	}

	render() { // renders the text editor part of the application
		return (
			<div className="textEditor" style={{display: "inline"}}>
				<form onSubmit={this.handleSubmit}>
					<TextSubmitTool name="Chapter" onChange={this.onChange} value={this.state.currentTextItems["Chapter"]}/>
					<TextSubmitTool name="Section" onChange={this.onChange} value={this.state.currentTextItems["Section"]}/>
					<TextSubmitTool name="SubSection" onChange={this.onChange} value={this.state.currentTextItems["SubSection"]}/>
					<TextAreaSubmitTool name="Text" onChange={this.onChange} value={this.state.currentTextItems["Text"]}/>
					<button type="submit" className="col s3 btn btn-primary">
						<i className="material-icons">add</i>
					</button>
					<div className="col s1" style={{display: "inline"}}> </div> 
					<a className="waves-effect waves-light btn" onClick={this.undoLastOperation}><i className="material-icons">undo</i></a>
				</form> 
			</div>
		);
	}
}

class TextSubmitTool extends Component {
	render() {
		return (
			<div className="row">
				<div className="input-field col s12">
					<input 
						id={this.props.name}
						value={this.props.value} 
						onChange={(e) => this.props.onChange(e.target.value, this.props.name)} 
						type="text" 
						className="validate"/>
					<label htmlFor={this.props.name}>{this.props.name}</label>
				</div>
			</div>
		);
	}
}

class TextAreaSubmitTool extends Component {
	render() {
		return (
			<div className="row">
				<div className="input-field col s12">
					<textarea 
						id={this.props.name}
						value={this.props.value} 
						onChange={(e) => this.props.onChange(e.target.value, this.props.name)} 
						className="materialize-textarea">
					</textarea>
					<label htmlFor={this.props.name}>{this.props.name}</label>
			  	</div>
			</div>
		);
	}
}

export default TextEditor;