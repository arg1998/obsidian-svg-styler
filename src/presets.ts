const generate_default_preset = function () {
	return {
		circle: {
			fill: {
				name: "Fill Color",
				key: "fill",
				placeholder: "#FFFFFF",
				currentValue: null,
				type: "color",
			},
			stroke: {
				name: "Stroke Color",
				key: "stroke",
				placeholder: "#000000",
				currentValue: null,
				type: "color",
			},
			"stroke-width": {
				name: "Stroke Width",
				key: "stroke-width",
				placeholder: "1",
				currentValue: null,
				type: "int",
			},
			"stroke-dasharray": {
				name: "Stroke Dash Array",
				key: "stroke-dasharray",
				placeholder: "5,5",
				currentValue: null,
				type: "string",
			},
			"stroke-dashoffset": {
				name: "Stroke Dash Offset",
				key: "stroke-dashoffset",
				placeholder: "0",
				currentValue: null,
				type: "int",
			},
			opacity: {
				name: "Opacity",
				key: "opacity",
				placeholder: "1",
				currentValue: null,
				type: "float",
			},
			"fill-opacity": {
				name: "Fill Opacity",
				key: "fill-opacity",
				placeholder: "1",
				currentValue: null,
				type: "float",
			},
			"stroke-opacity": {
				name: "Stroke Opacity",
				key: "stroke-opacity",
				placeholder: "1",
				currentValue: null,
				type: "float",
			},
			transform: {
				name: "Transform",
				key: "transform",
				placeholder: "rotate(0)",
				currentValue: null,
				type: "string",
			},
			filter: {
				name: "Filter",
				key: "filter",
				placeholder: "none",
				currentValue: null,
				type: "string",
			},
		},
		rect: {
			fill: {
				name: "Fill Color",
				key: "fill",
				placeholder: "#FFFFFF",
				currentValue: null,
				type: "color",
			},
			stroke: {
				name: "Stroke Color",
				key: "stroke",
				placeholder: "#000000",
				currentValue: null,
				type: "color",
			},
			"stroke-width": {
				name: "Stroke Width",
				key: "stroke-width",
				placeholder: "1",
				currentValue: null,
				type: "int",
			},
			rx: {
				name: "Rx",
				key: "rx",
				placeholder: "0",
				currentValue: null,
				type: "int",
			},
			ry: {
				name: "Ry",
				key: "ry",
				placeholder: "0",
				currentValue: null,
				type: "int",
			},
			"stroke-dasharray": {
				name: "Stroke Dash Array",
				key: "stroke-dasharray",
				placeholder: "5,5",
				currentValue: null,
				type: "string",
			},
			"stroke-dashoffset": {
				name: "Stroke Dash Offset",
				key: "stroke-dashoffset",
				placeholder: "0",
				currentValue: null,
				type: "int",
			},
			opacity: {
				name: "Opacity",
				key: "opacity",
				placeholder: "1",
				currentValue: null,
				type: "float",
			},
			"fill-opacity": {
				name: "Fill Opacity",
				key: "fill-opacity",
				placeholder: "1",
				currentValue: null,
				type: "float",
			},
			"stroke-opacity": {
				name: "Stroke Opacity",
				key: "stroke-opacity",
				placeholder: "1",
				currentValue: null,
				type: "float",
			},
			transform: {
				name: "Transform",
				key: "transform",
				placeholder: "rotate(0)",
				currentValue: null,
				type: "string",
			},
			filter: {
				name: "Filter",
				key: "filter",
				placeholder: "none",
				currentValue: null,
				type: "string",
			},
		},
		line: {
			stroke: {
				name: "Stroke Color",
				key: "stroke",
				placeholder: "#000000",
				currentValue: null,
				type: "color",
			},
			"stroke-width": {
				name: "Stroke Width",
				key: "stroke-width",
				placeholder: "1",
				currentValue: null,
				type: "int",
			},
			strokeLinecap: {
				name: "Stroke Line Cap",
				key: "strokeLinecap",
				placeholder: "butt",
				currentValue: null,
				type: "category",
				values: ["butt", "round", "square"],
			},
			"stroke-dasharray": {
				name: "Stroke Dash Array",
				key: "stroke-dasharray",
				placeholder: "5,5",
				currentValue: null,
				type: "string",
			},
			"stroke-dashoffset": {
				name: "Stroke Dash Offset",
				key: "stroke-dashoffset",
				placeholder: "0",
				currentValue: null,
				type: "int",
			},
			opacity: {
				name: "Opacity",
				key: "opacity",
				placeholder: "1",
				currentValue: null,
				type: "float",
			},
			"stroke-opacity": {
				name: "Stroke Opacity",
				key: "stroke-opacity",
				placeholder: "1",
				currentValue: null,
				type: "float",
			},
			transform: {
				name: "Transform",
				key: "transform",
				placeholder: "rotate(0)",
				currentValue: null,
				type: "string",
			},
			filter: {
				name: "Filter",
				key: "filter",
				placeholder: "none",
				currentValue: null,
				type: "string",
			},
		},
		path: {
			fill: {
				name: "Fill Color",
				key: "fill",
				placeholder: "#FFFFFF",
				currentValue: null,
				type: "color",
			},
			stroke: {
				name: "Stroke Color",
				key: "stroke",
				placeholder: "#000000",
				currentValue: null,
				type: "color",
			},
			"stroke-width": {
				name: "Stroke Width",
				key: "stroke-width",
				placeholder: "1",
				currentValue: null,
				type: "int",
			},
			strokeLinecap: {
				name: "Stroke Line Cap",
				key: "strokeLinecap",
				placeholder: "butt",
				currentValue: null,
				type: "category",
				values: ["butt", "round", "square"],
			},
			"stroke-linejoin": {
				name: "Stroke Line Join",
				key: "stroke-linejoin",
				placeholder: "miter",
				currentValue: null,
				type: "category",
				values: ["miter", "round", "bevel"],
			},
			"stroke-dasharray": {
				name: "Stroke Dash Array",
				key: "stroke-dasharray",
				placeholder: "5,5",
				currentValue: null,
				type: "string",
			},
			"stroke-dashoffset": {
				name: "Stroke Dash Offset",
				key: "stroke-dashoffset",
				placeholder: "0",
				currentValue: null,
				type: "int",
			},
			opacity: {
				name: "Opacity",
				key: "opacity",
				placeholder: "1",
				currentValue: null,
				type: "float",
			},
			"fill-opacity": {
				name: "Fill Opacity",
				key: "fill-opacity",
				placeholder: "1",
				currentValue: null,
				type: "float",
			},
			"stroke-opacity": {
				name: "Stroke Opacity",
				key: "stroke-opacity",
				placeholder: "1",
				currentValue: null,
				type: "float",
			},
			transform: {
				name: "Transform",
				key: "transform",
				placeholder: "rotate(0)",
				currentValue: null,
				type: "string",
			},
			filter: {
				name: "Filter",
				key: "filter",
				placeholder: "none",
				currentValue: null,
				type: "string",
			},
		},
		ellipse: {
			fill: {
				name: "Fill Color",
				key: "fill",
				placeholder: "#FFFFFF",
				currentValue: null,
				type: "color",
			},
			stroke: {
				name: "Stroke Color",
				key: "stroke",
				placeholder: "#000000",
				currentValue: null,
				type: "color",
			},
			"stroke-width": {
				name: "Stroke Width",
				key: "stroke-width",
				placeholder: "1",
				currentValue: null,
				type: "int",
			},
			"stroke-dasharray": {
				name: "Stroke Dash Array",
				key: "stroke-dasharray",
				placeholder: "5,5",
				currentValue: null,
				type: "string",
			},
			"stroke-dashoffset": {
				name: "Stroke Dash Offset",
				key: "stroke-dashoffset",
				placeholder: "0",
				currentValue: null,
				type: "int",
			},
			opacity: {
				name: "Opacity",
				key: "opacity",
				placeholder: "1",
				currentValue: null,
				type: "float",
			},
			"fill-opacity": {
				name: "Fill Opacity",
				key: "fill-opacity",
				placeholder: "1",
				currentValue: null,
				type: "float",
			},
			"stroke-opacity": {
				name: "Stroke Opacity",
				key: "stroke-opacity",
				placeholder: "1",
				currentValue: null,
				type: "float",
			},
			transform: {
				name: "Transform",
				key: "transform",
				placeholder: "rotate(0)",
				currentValue: null,
				type: "string",
			},
			filter: {
				name: "Filter",
				key: "filter",
				placeholder: "none",
				currentValue: null,
				type: "string",
			},
		},
		polygon: {
			fill: {
				name: "Fill Color",
				key: "fill",
				placeholder: "#FFFFFF",
				currentValue: null,
				type: "color",
			},
			stroke: {
				name: "Stroke Color",
				key: "stroke",
				placeholder: "#000000",
				currentValue: null,
				type: "color",
			},
			"stroke-width": {
				name: "Stroke Width",
				key: "stroke-width",
				placeholder: "1",
				currentValue: null,
				type: "int",
			},
			"stroke-linejoin": {
				name: "Stroke Line Join",
				key: "stroke-linejoin",
				placeholder: "miter",
				currentValue: null,
				type: "category",
				values: ["miter", "round", "bevel"],
			},
			"stroke-dasharray": {
				name: "Stroke Dash Array",
				key: "stroke-dasharray",
				placeholder: "5,5",
				currentValue: null,
				type: "string",
			},
			"stroke-dashoffset": {
				name: "Stroke Dash Offset",
				key: "stroke-dashoffset",
				placeholder: "0",
				currentValue: null,
				type: "int",
			},
			opacity: {
				name: "Opacity",
				key: "opacity",
				placeholder: "1",
				currentValue: null,
				type: "float",
			},
			"fill-opacity": {
				name: "Fill Opacity",
				key: "fill-opacity",
				placeholder: "1",
				currentValue: null,
				type: "float",
			},
			"stroke-opacity": {
				name: "Stroke Opacity",
				key: "stroke-opacity",
				placeholder: "1",
				currentValue: null,
				type: "float",
			},
			transform: {
				name: "Transform",
				key: "transform",
				placeholder: "rotate(0)",
				currentValue: null,
				type: "string",
			},
			filter: {
				name: "Filter",
				key: "filter",
				placeholder: "none",
				currentValue: null,
				type: "string",
			},
		},
	};
};

// generates a global attribute for the <svg> tag
const generate_global_svg_preset = function () {
	return {
		width: {
			name: "Width",
			key: "width",
			placeholder: "100",
			currentValue: null,
			type: "int",
		},
		height: {
			name: "Height",
			key: "height",
			placeholder: "100",
			currentValue: null,
			type: "int",
		},
		opacity: {
			name: "Opacity",
			key: "opacity",
			placeholder: "1",
			currentValue: null,
			type: "float",
		},
	};
};

const shrink_style_preset = function (preset: any) {
	const output: any = {};
	for (const tag_name of Object.keys(preset)) {
		const tag = preset[tag_name];

		const tag_obj: any = {};

		for (const prop_name of Object.keys(tag)) {
			const prop = tag[prop_name];

			if ((prop.newValue != null && prop.newValue != undefined) && (prop.newValue != prop.currentValue)) {
				// user has changed the property
				tag_obj[prop_name] = prop.newValue;
				continue;
			}

			if ((prop.newValue == null || prop.newValue == undefined) && prop.currentValue != null) {
				// loaded a property with existing value but user did not change it
				tag_obj[prop_name] = prop.currentValue;
				continue;
			}
		}

		if (Object.keys(tag_obj).length > 0) {
			output[tag_name] = tag_obj;
		}
	}
	return output;
};

const srhink_global_preset = function (preset: any) {
	let output: any = {};
	for (const prop_name of Object.keys(preset)) {
		const prop = preset[prop_name];
		if (!prop.key) {
			// if it doesn't have a "key" then we just put it back unmodified
			output[prop_name] = prop.currentValue;
			continue;
		}

		if ((prop.newValue != null && prop.newValue != undefined) && (prop.newValue != prop.currentValue)) {
			// user has changed the property
			output[prop_name] = prop.newValue;
			continue;
		}

		if ((prop.newValue == null || prop.newValue == undefined) && prop.currentValue != null) {
			// loaded a property with existing value but user did not change it
			output[prop_name] = prop.currentValue;
			continue;
		}
	}
	return output;
};

export {
	generate_default_preset,
	shrink_style_preset,
	generate_global_svg_preset,
	srhink_global_preset,
};
