const DEBUG_MODE = true;

import {
	App,
	Plugin,
	Modal,
	Notice,
	Setting,
	MarkdownView,
	TFile,
	Editor,
} from "obsidian";

const svgson = require("svgson");
const css = require("css");

import {
	generate_default_preset,
	generate_global_svg_preset,
	shrink_style_preset,
	srhink_global_preset,
} from "./src/presets";

let print: any;
if (DEBUG_MODE) {
	print = console.log;
} else {
	print = (_: any) => {}; // empty function if not debugging
}

export default class SvgStyleEditor extends Plugin {
	async onload() {
		this.addCommand({
			id: "svg-styler",
			name: "Change SVG Style | Color | Properties",
			callback: () => {
				const view =
					this.app.workspace.getActiveViewOfType(MarkdownView);
				if (view) {
					const editor = view.editor;
					const selection = editor.getSelection();

					// Regular expression to match ![[filename.svg]]
					const fileNameMatch = selection.match(
						/!\[\[([^\]]+\.svg)(\|[^\]]*)?\]\]/
					);
					if (fileNameMatch && fileNameMatch[1]) {
						const filePath = fileNameMatch[1];

						// Resolve the file path
						const activeFile = this.app.workspace.getActiveFile();
						const linkedFile =
							this.app.metadataCache.getFirstLinkpathDest(
								filePath,
								activeFile?.path || ""
							);

						if (linkedFile && linkedFile.extension === "svg") {
							new SvgStyleEditorModal(
								this.app,
								linkedFile,
								editor
							).open();
						} else {
							new Notice("SVG file not found: " + filePath);
						}
					} else {
						new Notice(
							"Please select an SVG embed in the format ![[filename.svg]]"
						);
					}
				} else {
					new Notice("No active markdown editor found.");
				}
			},
		});
	}

	onunload() {
		// Nothing to unload
	}
}

class SvgStyleEditorModal extends Modal {
	private style_prest: any;
	private global_preset: any;
	private input_svg: any;
	private has_valid_style_tag: any;

	private file: TFile;
	private editor: Editor;

	// Modify the constructor to accept the editor:
	constructor(app: App, file: TFile, editor: Editor) {
		super(app);
		this.file = file;
		this.editor = editor;

		this.style_prest = generate_default_preset();
		this.global_preset = generate_global_svg_preset();
		this.has_valid_style_tag = false;
	}

	async processSvg() {
		const svgContent = await this.app.vault.read(this.file);
		const hasSvgTag = /<svg[\s\S]*?>[\s\S]*?<\/svg>/gi.test(svgContent);

		if (!hasSvgTag) {
			new Notice(`${this.file} has no <svg> </svg> pair tags!`);
			this.close();
		}

		let input_svg = svgson.parseSync(svgContent);
		this.input_svg = input_svg;
		let input_style_tag = null;
		let input_style_tag_css = null;

		const allowed_elements = [
			"path",
			"line",
			"rect",
			"circle",
			"ellipse",
			"polygon",
		];

		// =============================================================
		//                     process global SVG attributes
		// =============================================================

		const editable_global_svg_attributes = Object.keys(this.global_preset);
		for (const attr of Object.keys(input_svg.attributes)) {
			if (editable_global_svg_attributes.includes(attr)) {
				this.global_preset[attr].currentValue =
					input_svg.attributes[attr];
			} else {
				this.global_preset[attr] = {
					currentValue: input_svg.attributes[attr],
				};
			}
		}

		// =============================================================
		//                  check if SVG has a <style> tag
		// =============================================================
		for (let i = 0; i < input_svg.children.length; i++) {
			let element = input_svg.children[i];

			if (element && element.name.trim().toLowerCase() == "style") {
				input_style_tag = element;
				this.has_valid_style_tag = true;
				break;
			}
		}

		// =============================================================
		//                  process CSS inside the <style> tag
		// =============================================================

		let is_style_tag_valid = false;

		if (input_style_tag && input_style_tag.children.length > 0) {
			input_style_tag_css = css.parse(input_style_tag.children[0].value);
			print(input_style_tag_css);

			is_style_tag_valid =
				input_style_tag_css &&
				input_style_tag_css.stylesheet &&
				input_style_tag_css.stylesheet.rules.length > 0;
		}

		if (is_style_tag_valid) {
			// iterate over style rules
			for (const rule of input_style_tag_css.stylesheet.rules) {
				// check if the rule
				if (!rule.declarations.length) {
					print(">>> Rule has no declrations");
					continue;
				}

				// iterate over selectors
				for (let selector of rule.selectors) {
					selector = `${selector}`.trim().toLocaleLowerCase();
					// gaurd if there is a selector (element) we don't support
					if (
						!allowed_elements.includes(
							selector.trim().toLowerCase()
						)
					) {
						print(`>>> Element Selctor Not Allowed: ${selector}`);
						continue;
					}

					// iterate over declrations
					for (let decl of rule.declarations) {
						let decl_prop =
							this.style_prest[selector][decl.property];
						if (!decl_prop) {
							print(
								`>>> Property is not supported: ${decl.property}`
							);
							continue;
						}

						this.style_prest[selector][decl.property].currentValue =
							decl.value;
					}
				}
			}
		}
	}

	async onOpen() {
		const { contentEl } = this;

		await this.processSvg();

		contentEl.createEl("h1", { text: "SVG Style Editor" });

		// =============================================================
		//                 Global SVG Attribute fields
		// =============================================================
		const elem_detail_global = contentEl.createEl("details");
		elem_detail_global.createEl("summary", { text: "Global Attributes" });
		elem_detail_global.createEl("p", {
			text: "Here you can modify some of the attributes found inside the <svg> tag",
		});

		for (const attribute of Object.keys(this.global_preset)) {
			const attr_obj = this.global_preset[attribute];
			if (!attr_obj.key) {
				// if it doen't have a key, then we don't support it, so user can't modify it
				print(`>>> Global Attribute is not editable: ${attribute}`);
				continue;
			}

			const _m = attr_obj.currentValue == null;
			const setting_label = _m ? attr_obj.name : `${attr_obj.name} (✏️)`;
			let element = null;

			if (attr_obj.type == "float") {
				element = new Setting(elem_detail_global)
					.setName(setting_label)
					.addSlider((cb) => {
						cb.setLimits(0.0, 1.0, 0.01)
							.setValue(
								_m
									? Number(attr_obj.placeholder)
									: Number(attr_obj.currentValue)
							)
							.onChange((value) => {
								attr_obj.newValue = `${value}`.trim();
							});
					});

				//TODO: need more investigation
				// if (!_m) {
				// 	element.addExtraButton((cb) => {
				// 		cb.setIcon("eraser").onClick(() => {
				// 			if (!cb.disabled) {
				// 				print(`Unsetting valueL: `, attr_obj);
				// 				cb.setDisabled(true);
				// 			}
				// 		});
				// 	});
				// }
			} else {
				new Setting(elem_detail_global)
					.setName(setting_label)
					.addText((text) => {
						text.setPlaceholder(attr_obj.placeholder)
							.setValue(_m ? "" : `${attr_obj.currentValue}`)
							.onChange((value) => {
								if (value?.trim().length == 0) {
									attr_obj.newValue = null;
								} else {
									attr_obj.newValue = value;
								}
							});
					});
			}
		}

		// =============================================================
		//                    Add a divider
		// =============================================================
		let divider = contentEl.createEl("hr");
		divider.style.margin = "10px 0";

		// =============================================================
		//                    Style Editing Fields
		// =============================================================

		for (const tag_name of Object.keys(this.style_prest)) {
			const tag_obj = this.style_prest[tag_name];
			const elem_detail_style = contentEl.createEl("details");
			elem_detail_style.createEl("summary", {
				text: `<${tag_name}>`,
				attr: {
					style: "font-size: calc(var(--font-ui-medium) + 2px) !important;",
				},
			});

			for (const prop_name of Object.keys(tag_obj)) {
				const prop_obj = tag_obj[prop_name];
				const _m = prop_obj.currentValue == null;
				const setting_label = _m
					? prop_obj.name
					: `${prop_obj.name} (✏️)`;

				if (prop_obj.type == "color") {
					new Setting(elem_detail_style)
						.setName(setting_label)
						.addColorPicker((cb) => {
							cb.setValue(
								_m
									? prop_obj.placeholder
									: prop_obj.currentValue
							).onChange((hex_str) => {
								prop_obj.newValue = hex_str;
							});
						});
				} else if (prop_obj.type == "float") {
					new Setting(elem_detail_style)
						.setName(setting_label)
						.addSlider((cb) => {
							cb.setLimits(0.0, 1.0, 0.01)
								.setValue(
									_m
										? Number(prop_obj.placeholder)
										: Number(prop_obj.currentValue)
								)
								.onChange((value) => {
									prop_obj.newValue = `${value}`.trim();
								});
						});
				} else if (prop_obj.values && prop_obj.values.length > 0) {
					const _options: any = {};
					for (const _opt of prop_obj.values) {
						_options[_opt] = _opt;
					}

					new Setting(elem_detail_style)
						.setName(setting_label)
						.addDropdown((cb) => {
							cb.addOptions(_options)
								.setValue(
									_m
										? prop_obj.placeholder
										: prop_obj.currentValue
								)
								.onChange((value) => {
									prop_obj.newValue = value;
								});
						});
				} else {
					new Setting(elem_detail_style)
						.setName(setting_label)
						.addText((cb) => {
							cb.setPlaceholder(prop_obj.placeholder)
								.setValue(_m ? "" : prop_obj.currentValue)
								.onChange((value) => {
									if (value?.trim().length == 0) {
										prop_obj.newValue = null;
									} else {
										prop_obj.newValue = value;
									}
								});
						});
				}
			}

			contentEl.createDiv().style.margin = "10px 0";
		}

		// =============================================================
		//                    Add Helper text
		// =============================================================

		contentEl.createEl("hr").style.margin = "10px 0";
		contentEl.createEl("p", {
			text: "Fileds with ✏️ have existing values!",
		});
		contentEl.createDiv().style.margin = "10px 0";

		// =============================================================
		//                    Add Action Buttons
		// =============================================================

		const _setting_buttons = new Setting(contentEl)
			.addButton((btn) => {
				btn.setButtonText("Cancel").onClick(async () => {
					this.close();
				});
			})
			.addButton((btn) => {
				btn.setButtonText("Save")
					.setCta()
					.onClick(async () => {
						await this.modifySvg();
						this.close();
					});
			});

		if (this.has_valid_style_tag) {
			_setting_buttons.addButton((btn) => {
				btn.setButtonText("Clear Styles")
					.setWarning()
					.onClick(async () => {
						await this.clearStyles();
						this.close();
					});
			});
		}

		if (DEBUG_MODE) {
			_setting_buttons.addButton((btn) => {
				btn.setButtonText("DEBUG")
					.setWarning()
					.onClick(() => {
						print(this.global_preset);
						print(this.style_prest);
					});
			});
		}
	}

	async modifySvg() {
		try {
			// =============================================================
			//                  Shrink global preset
			// =============================================================
			const globals: any = srhink_global_preset(this.global_preset);
			print(globals);

			// set the new globals
			this.input_svg.attributes = globals;

			// =============================================================
			//                  Srink style tags
			// =============================================================
			const styles: any = shrink_style_preset(this.style_prest);
			print(styles);

			let style_obj = {
				type: "stylesheet",
				stylesheet: {
					parsingErrors: [],
					rules: [],
				},
			};

			for (const prop_name of Object.keys(styles)) {
				const prop = styles[prop_name];

				const _rule = {
					type: "rule",
					selectors: [prop_name],
					declarations: [],
				};
				for (const decl of Object.keys(prop)) {
					const _d = {
						property: decl,
						type: "declaration",
						value: prop[decl],
					};
					_rule.declarations.push(_d);
				}
				style_obj.stylesheet.rules.push(_rule);
			}

			print(style_obj);

			const style_str = css.stringify(style_obj);
			print(style_str);

			const svg_style_tag = {
				name: "style",
				type: "element",
				value: "",
				parent: null,
				attributes: {},
				children: [
					{
						name: "",
						type: "text",
						value: `\n\n${style_str}\n\n`,
						parent: null,
						attributes: {},
						children: [],
					},
				],
			};

			for (let i = 0; i < this.input_svg.children.length; i++) {
				const svg_child = this.input_svg.children[i];
				if (svg_child.name == "style") {
					this.input_svg.children.splice(i, 1);
					break;
				}
			}

			this.input_svg.children = [
				svg_style_tag,
				...this.input_svg.children,
			];

			print(this.input_svg);

			const output_svg_str = svgson.stringify(this.input_svg);

			await this.app.vault.modify(this.file, output_svg_str);
			new Notice("SVG styles updated successfully.");

			// Refresh the editor to reflect changes
			this.refreshEditor();
		} catch (error) {
			if (error instanceof Error) {
				print("Error: ", error.message);
				new Notice("Error modifying SVG file: " + error.message);
			} else {
				new Notice("Error modifying SVG file.");
			}
		}
	}

	async clearStyles() {
		try {
			for (let i = 0; i < this.input_svg.children.length; i++) {
				const svg_child = this.input_svg.children[i];
				if (svg_child.name == "style") {
					this.input_svg.children.splice(i, 1);
					break;
				}
			}
			const output_svg_str = svgson.stringify(this.input_svg);

			await this.app.vault.modify(this.file, output_svg_str);
			new Notice("SVG styles cleared successfully.");

			this.refreshEditor();
		} catch (error) {
			if (error instanceof Error) {
				print("Error: ", error.message);
				new Notice(
					"Error clearing styles from the svg file: " + error.message
				);
			} else {
				new Notice("Error clearing styles from the svg file.");
			}
		}
	}

	refreshEditor() {
		// 	TODO: investigate why the command bellow doen't refresh/repaint the editor?
		/*
			this.editor.refresh();
		*/

		// This is a hack to work around the Obsidian's obscure API!!
		this.app.workspace
			.getActiveViewOfType(MarkdownView)
			?.leaf.rebuildView();
	}

	onClose() {
		const { contentEl } = this;
		contentEl.empty();
		this.input_svg = undefined;
		this.style_prest = undefined;
		this.global_preset = undefined;
	}
}
