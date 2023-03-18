import JSConfetti from "js-confetti";
const jsConfetti = new JSConfetti();
export function shootConfetti() {
	jsConfetti.addConfetti({
		confettiColors: [
			"#e5be4f",
			"#662018",
			"#aac7e3",
			"#f2ede4",
			"#bcb969",
			"#403f09",
			"#cba29a",
		],
		confettiRadius: 6,
		confettiNumber: 500,
	});
}
