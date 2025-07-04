export type SelectorType = 'xpath' | 'css'

export function detectSelectorType(selector: string): SelectorType {
    const trimmed = selector.trim();

    if (
        trimmed.startsWith('/') ||
        trimmed.startsWith('(') || 
        trimmed.startsWith('./') ||
        trimmed.startsWith('..') ||
        trimmed.startsWith('//')
    ) {
        return 'xpath';
    }

    return 'css';
}