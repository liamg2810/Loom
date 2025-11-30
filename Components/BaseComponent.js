import { reactive } from "../State/Reactive.js";

/**
 * Component props
 * @global
 * @typedef {{
 * className?: string;
 * onclick?: () => void;
 * style?: string;
 * textContent?: () => string;
 * [Key: string]: any;
 * }} PROPS
 */

export class BaseComponent {
	states = [];

	/** @type {HTMLElement} */
	element;

	/** @type {PROPS} */
	props;

	/** @type {Text?} */
	textNode;

	tagName = "div";

	/**
	 *
	 * @param {PROPS} props
	 * @description Constructor not to be used from inheritance. Initialisation is managed by declare().
	 */
	constructor(props) {
		this.props = props;
	}

	/**
	 *
	 * @param {PROPS} props
	 *
	 */
	declare(props) {
		this.element = document.createElement(this.tagName);

		if (props.textContent !== undefined) {
			this.textNode = document.createTextNode(props.textContent());
			this.element.appendChild(this.textNode);
		}

		if (props.style) this.element.style = props.style;

		if (props.className) this.element.className = props.className;

		if (props.onclick)
			this.element.addEventListener("click", props.onclick);
	}

	/**
	 *
	 * @param {any} value
	 * @returns {[() => any, (v: any) => void]}
	 */
	state(value) {
		const r = reactive(value);

		this.states.push(r);

		if (this.textNode !== undefined) {
			r.listeners.push(() => {
				this.textNode.textContent = this.props.textContent();
			});
		}

		return [r.getter, r.setter];
	}

	/**
	 *
	 * @param {HTMLElement | BaseComponent} parent The parent element of this component
	 */
	mount(parent) {
		if (parent instanceof BaseComponent) {
			parent.element.appendChild(this.element);
		} else {
			parent.appendChild(this.element);
		}
	}
}
