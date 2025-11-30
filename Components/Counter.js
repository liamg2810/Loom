import { BaseComponent } from "./BaseComponent.js";
import { ButtonComponent } from "./Button.js";
import { HeaderComponent } from "./Header.js";

export class Counter extends BaseComponent {
	/** @type {HeaderComponent} */
	count;
	/** @type {ButtonComponent} */
	incrementer;
	/** @type {ButtonComponent} */
	decrementer;

	constructor(props) {
		if (props === undefined) props = {};

		super(props);

		this.tagName = "div";

		this.declare(props);
	}

	declare(props) {
		this.count = new HeaderComponent({
			textContent: () => "Count: 0",
		});

		const [getC, setC] = this.count.state(0);

		this.incrementer = new ButtonComponent({
			textContent: () => "Increment",
			onclick: () => {
				setC(getC() + 1);
			},
		});
		this.decrementer = new ButtonComponent({
			textContent: () => "Decrement",
			onclick: () => {
				setC(getC() - 1);
			},
		});

		this.count.props = {
			textContent: () => `Count: ${getC()}`,
		};

		super.declare(props);
	}

	mount(parent) {
		parent.appendChild(this.element);

		this.count.mount(this);
		this.decrementer.mount(this);
		this.incrementer.mount(this);
	}
}
