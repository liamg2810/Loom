export function reactive(val) {
	const name = reactiveIndex;

	reactiveIndex++;

	return (reactive = {
		v: val,
		listeners: [],
		getter: () => {
			return reactives[name].v;
		},
		setter: (v) => {
			reactives[name].v = v;

			for (const l of reactives[name].listeners) {
				l(v);
			}
		},
	});
}
