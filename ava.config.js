export default {
	files: [
		"out/test/**/*",
		"!test/"
	],
	concurrency: 5,
	failFast: true,
	failWithoutAssertions: false,
	verbose: true,
	nodeArguments: [
		"--trace-deprecation",
		"--napi-modules"
	]
}