export function deleteItemById<T>(
	array: T[],
	idKey: string,
	idToDelete: string | number
): T[] {
	return array.filter((item) => item[idKey] !== idToDelete)
}

export function truncateText(text: string, maxLength: number, ellipsis: string = "..."): string {
	if (text.length <= maxLength) {
			return text;
	} else {
			return text.substring(0, maxLength - ellipsis.length) + ellipsis;
	}
}
