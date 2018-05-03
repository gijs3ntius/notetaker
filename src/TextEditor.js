import React, { Component } from 'react';
import Textarea from "react-textarea-autosize";

class TextEditor extends Component {
	constructor(props) {
		super(props);
	}

	render() { // renders the text editor part of the application
		return (
			<div>
				<TextSubmitTool name="Chapter"/>
				<TextSubmitTool name="Section"/>
				<TextSubmitTool name="Subsection"/>
				<TextAreaSubmitTool name="Text"/>
			</div> 
		);
	}


}

class TextSubmitTool extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="form-group">
				<label>{this.props.name}</label>
				<input type="text" className="form-control" placeholder={"Enter "+this.props.name}/>
			</div>
		);
	}
}

class TextAreaSubmitTool extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="form-group">
				<label>{this.props.name}</label>
				<Textarea />
			</div>
		);
	}
}

export default TextEditor;