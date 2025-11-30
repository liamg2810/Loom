import { BaseComponent } from "./BaseComponent.js";

export class ButtonComponent extends BaseComponent {
	constructor(props) {
		super(props);

		this.tagName = "button";

		this.declare(props);
	}
}
