export function deleteItemById<T>(
	array: T[],
	idKey: string,
	idToDelete: string | number
): T[] {
	return array.filter((item) => item[idKey] !== idToDelete)
}
