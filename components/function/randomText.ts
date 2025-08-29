
export function randomText() {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    const used = new Set();

    while (result.length < 10) {
        const randomIndex = Math.floor(Math.random() * chars.length);
        const char = chars[randomIndex];

        if (!used.has(char)) {
            used.add(char);
            result += char;
        }
    }

    return result;

}
