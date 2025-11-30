export function reactive(val) {
	/**
	 * @type {{
	 * v: any;
	 * listeners: (() => void)[];
	 * getter: () => any;
	 * setter: (v: any) => void;
	 * }}
	 */
	const r = {
		v: val,
		listeners: [],
	};

	r.getter = () => {
		return r.v;
	};

	r.setter = (v) => {
		r.v = v;

		for (const l of r.listeners) {
			l(v);
		}
	};

	return r;
}
