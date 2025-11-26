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
		for (const l of reactives[name].listeners) {
			l.innerText = v;
		}

		reactives[name].v = v;
	};

	return [reactives[name].getter, reactives[name].setter];
}

function AddToDOM(tagName, getter) {
	const t = document.createElement(tagName);
	t.innerText = getter();
	app.appendChild(t);

	for (const v of Object.values(reactives)) {
		if (v.getter === getter) {
			v.listeners.push(t);
			break;
		}
	}
}

let [getA, setA] = reactive(2);
let [getB, setB] = reactive(5);

AddToDOM("h1", getA);
AddToDOM("h2", getB);

setA(10);

setTimeout(() => {
	setA(20);

	setTimeout(() => {
		setB(30);
	}, 1000);
}, 1000);
