export function validateInput(
	input: string,
	regex: RegExp,
	onPass: () => void,
	onFail?: () => void
) {
	if (regex.test(input)) onPass()
	else onFail?.()
}
