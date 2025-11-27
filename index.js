const app = document.getElementById("app");

let reactives = {};
let reactiveIndex = 0;
let DOM = {};

function reactive(val) {
	const name = reactiveIndex;

	if (reactives[name] !== undefined) {
		throw new Error("Reactive name already exists");
	}

	reactiveIndex++;

	reactives[name] = {
		v: val,
		listeners: [],
	};

	reactives[name].getter = () => {
		return reactives[name].v;
	};
	reactives[name].setter = (v) => {
		reactives[name].v = v;

		for (const l of reactives[name].listeners) {
			l(v);
		}
	};

	return [reactives[name].getter, reactives[name].setter];
}

/**
 *
 * @param {{
 * tag: string;
 * className?:string;
 * value?: () => string;
 * dependencies?: (() => any)[];
 * eventListeners?: {name: string; callback: () => void}[];
 * parent?: HTMLElement
 * }} element
 */
function CreateElement(element) {
	const t = document.createElement(element.tag);

	if (element.className !== null) {
		t.className = element.className;
	}

	if (element.value !== undefined) {
		const textNode = document.createTextNode(element.value());

		if (element.dependencies !== undefined) {
			for (const v of Object.values(reactives)) {
				if (element.dependencies.includes(v.getter)) {
					v.listeners.push((val) => {
						textNode.data = element.value();
					});
				}
			}
		}

		t.appendChild(textNode);
	}

	if (element.eventListeners !== undefined) {
		for (const listener of element.eventListeners) {
			t.addEventListener(listener.name, listener.callback);
		}
	}

	if (element.parent !== undefined) {
		element.parent.appendChild(t);
	} else {
		app.appendChild(t);
	}

	return t;
}

function effect(getter, callback) {
	for (const v of Object.values(reactives)) {
		if (v.getter === getter) {
			v.listeners.push(callback);
			return;
		}
	}
}

let [getA, setA] = reactive(2);

const d = CreateElement({
	tag: "div",
	value: () => `My value is: ${getA()}`,
	dependencies: [getA],
});

CreateElement({
	tag: "Button",
	className: "btn",
	value: () => "Click me",
	eventListeners: [
		{
			name: "click",
			callback: () => {
				setA(getA() + 1);
			},
		},
	],
	parent: d,
});
