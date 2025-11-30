import { ButtonComponent } from "./Components/Button.js";
import { Counter } from "./Components/Counter.js";
import { HeaderComponent } from "./Components/Header.js";

const app = document.getElementById("app");

const h = new HeaderComponent({
	textContent: () => "Hello World!",
});

const button = new ButtonComponent({
	textContent: () => "Click me!",
	className: "btn",
	onclick: () => {
		alert("Clicked!");
	},
});

h.mount(app);

button.mount(h);

const counter = new Counter();
counter.mount(app);
