import React, {Component} from 'react';

// TODO undo/redo system with everything added with the add button 
// text editor creates strings with markup language or just a list which could be easier
// markup language: <ch> = chapter, <s> = section, <sx> = subsection, <h> = heading, <t> = text 
class TextEditor extends Component {
	constructor(props) {
		super(props);
		this.state = {
			// documentString: '', // the string with all text items not yet used
			itemStack: [], // a stack with all the items added to the screen
			currentTextItems: {
				Chapter: '',
				Section: '',
				SubSection: '',
				Text: '',
			}, // a object holding the current items not added to the screen
		}
		this.onChange = this.onChange.bind(this); // used to bind functions
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleSubmit(event) {
		event.preventDefault(); // to prevent the default behaviour of the form
		// add items from current tex items to itemstack
		let copiedTextStack = this.state.itemStack.slice();
		for (let key in this.state.currentTextItems) {
			if (this.state.currentTextItems[key] !== '') {
				copiedTextStack.push(
					{
						tag: key,
						value: this.state.currentTextItems[key]
					}
				); // the order is really important therefore that has te be fixed
			}
		}
		this.setState(
			{
				currentTextItems: {
					Chapter: '',
					Section: '',
					SubSection: '',
					Text: '',
				}, // empty the current text item object
				itemStack: copiedTextStack,
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

	// TODO make a real undo instead of simply removing the last element 
	undoLastOperation() {
		let copiedTextStack = this.state.itemStack.slice(); // get a copy of an array by slice()
		copiedTextStack.pop();
		this.setState(
			{
				itemStack: copiedTextStack,
			}
		);
	}

	render() { // renders the text editor part of the application
		return (
			<div className="textEditor">
				<form onSubmit={this.handleSubmit}>
					<TextSubmitTool name="Chapter" onChange={this.onChange} value={this.state.currentTextItems["Chapter"]}/>
					<TextSubmitTool name="Section" onChange={this.onChange} value={this.state.currentTextItems["Section"]}/>
					<TextSubmitTool name="SubSection" onChange={this.onChange} value={this.state.currentTextItems["SubSection"]}/>
					<TextAreaSubmitTool name="Text" onChange={this.onChange} value={this.state.currentTextItems["Text"]}/>
					<button type="submit" className="col s3 btn btn-primary">Add</button>
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