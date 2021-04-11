import React, { Component } from 'react';
import './App.css';
import facedraw from './facedraw.png';
import {randomNumber, randomizeColor} from './Functions.js';

/************************************************************
* This class is responsible of building the business logic  *
* The class build the header, body and footer of the mosaic *
************************************************************/
export default class App extends Component {
	constructor(props) {
		super(props);
		this.numberCells = 20;
		this.numberShapes = 3;
		this.forceRandom = this.forceRandom.bind (this);
		this.state = {
			newRendering: false
		};
	}

	/*********************************************
	* Function to create a table with:           *
	*		The shape                            *
	*		Code to print in the foreground      *
	*********************************************/
	createTable () {
		let table = [];

		for (let i = 1; i < (this.numberCells*this.numberCells + 1); i++) {
			let randShape = randomNumber(0, this.numberShapes);
			let randCode = randomNumber(65, 91);
			let randLetter = String.fromCharCode (randCode);
			let indexString = i.toString();
			let shapeForm = 'shape' + randShape.toString();
			table.push(<Shape
					key = {indexString}
					id = {indexString}
					name = {shapeForm}
					size = {this.numberCells}
					value = {randLetter} />);
		}
		return table;
	}

	/******************************************************
	* Function to refresh the complete mosaic with random *
	* shapes, characters and colors                       *
	******************************************************/
	forceRandom() {
		const newRendering = this.state.newRendering;
		if (newRendering) {
			this.setState ({newRendering: false});
		} else {
			this.setState ({newRendering: true});
		}
	}
	
	render() {
		let table = this.createTable ();
		return (
			<div className='base'>
				<div className='header'>
					<button
						className='circle1'
						style={{backgroundColor: 'red', color: 'red'}}
					></button>
					<button
						className='circle1'
						style={{backgroundColor: 'green', color: 'green'}}
					></button>
					<button
						className='circle1'
						style={{backgroundColor: 'yellow', color: 'yellow'}}
					></button>
				</div>
				<div className='mosaic'>
					{table}
				</div>
				<div className='footer'>
					<button
						className='randbutton'
						onClick={this.forceRandom}
					>
						Randomize!
					</button>
				</div>
			</div>
		);
	}
}

/********************************************************************
* This class is responsible for building every cell of the mosaic   *
* The class receive the shape and the foreground character to print *
* and calculate random color codes for these elements               *
********************************************************************/
class Shape extends Component {
	constructor(props) {
		super(props);
		this.refButton = React.createRef();
		this.clickShape = this.clickShape.bind (this);
		this.state = {
			value: null,
			innerHTML: null,
		};
	}

	/***********************************************************
	* Function to update a single shape. Everytime is accessed *
	* the character is swapped to an image and when accessed   *
	* again, recovers the character associated to the shape    *
	* Shape and colors are not updated                         *
	***********************************************************/
/*	clickShape = () => { */
	clickShape () {
/*		console.log (this.refButton);*/
		if (this.refButton.current.innerText === "") {
			this.refButton.current.innerHTML = this.innerHTML;
		} else {
			/* Computes the relative size of the facedraw */
			const shapeSizeInt = 100. / this.props.size;
			const charSizeInt = 1.1*shapeSizeInt / 2;
			const imageWidth = charSizeInt.toString() + "vmin";
			this.innerHTML = this.refButton.current.innerHTML;
			this.refButton.current.innerHTML = 
				"<img class='image' src='" + facedraw + "' style='width:" + imageWidth + "' alt='5'/>";
		}
	}

	render() {
		const baseColor = "#dddddd";
		const backColor = randomizeColor (baseColor);
		const fontColor = randomizeColor (backColor);
		const characterInside = this.props.value;
		const keyValue = this.props.id;
		const className = this.props.name;
		/* Computes the relative size of the shapes and characters */
		const shapeSizeInt = 100. / this.props.size;
		const charSizeInt = 1.128*shapeSizeInt / 2;
		const shapeSizeStr = shapeSizeInt.toString() + "%";
		const charSizeStr = charSizeInt.toString() + "vmin";
		console.log (charSizeStr);
		return (
			<button
				key={keyValue}
				ref={this.refButton}
				id={keyValue}
				value={characterInside.toString()}
				className={className}
				style={{backgroundColor: backColor, color: fontColor, 
						width: shapeSizeStr, height: shapeSizeStr,
						fontSize: charSizeStr}}
				onClick={this.clickShape}
			>
				{characterInside}
			</button>
		);
	}
}
