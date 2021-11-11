const calculator = (() => {
	const add = (a, b) => a + b;
	function add_two(a, b) {
		return a + b;
	}
	const sub = (a, b) => a - b;
	function sub_two(a, b) {
		return a - b;
	}
	const mul = (a, b) => a * b;
	function mul_two(a, b) {
		return a * b;
	}
	const div = (a, b) => a / b;
 	let myCalculatorFunctionDefinitions = {
		add: add,
		sub: sub,
		mul: mul,
		div: div,
	};
	return myCalculatorFunctionDefinitions;
})();
