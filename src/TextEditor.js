hangedimport React, {Component} from 'react';
// import Textarea from "react-textarea-autosize";

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
				<button type="submit" className="btn btn-primary">Add</button>
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
			<div className="row">
        		<div className="input-field col s12">
          			<input id={this.props.name} type="text" className="validate"/>
          			<label htmlFor={this.props.name}>{this.props.name}</label>
        		</div>
			</div>
		);
	}
}

var textareaStyle = {
	width: '100%',
};

class TextAreaSubmitTool extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="row">
				<div className="input-field col s12">
					<textarea id={this.props.name} className="materialize-textarea"></textarea>
					<label htmlFor={this.props.name}>{this.props.name}</label>
			  	</div>
			</div>
		);
	}
}

export default TextEditor;