export class TypeChecker {
	static isString(input: unknown): input is string {
		return typeof input === 'string'
	}
}
