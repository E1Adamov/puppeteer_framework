export function getCliArg(name: string): string | undefined;
export function getCliArg<T extends string>(name: string, default_: T): string | T;
export function getCliArg<T extends string>(name: string, default_?: T): string | T | undefined {
    const arg = process.argv.find(arg => arg.startsWith(`--${name}=`));
    return arg ? arg.split('=')[1] : default_;
}
