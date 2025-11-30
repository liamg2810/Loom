import { BaseComponent } from "./BaseComponent.js";

export class HeaderComponent extends BaseComponent {
	constructor(props) {
		super(props);

		this.tagName = "h1";

		this.declare(props);
	}

	/**
	 *
	 * @param {import("./BaseComponent.js").PROPS} props
	 */
	declare(props) {
		super.declare(props);
	}
}
