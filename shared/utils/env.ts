export function requiredEnv(varName: string): string {
    const value = process.env[varName];
    if (!value) {
        throw new Error(`Environment variable ${varName} is required but not set.`);
    }
    return value;
}