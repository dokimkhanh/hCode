// Decode Hex string
export function decodeHex(hexString) {
    const cleanedHex = hexString.replace(/[^0-9a-fA-F]/g, '');

    let result = '';
    for (let i = 0; i < cleanedHex.length; i += 2) {
        const hexPair = cleanedHex.substring(i, i + 2);
        const charCode = parseInt(hexPair, 16);
        result += String.fromCharCode(charCode);
    }

    return result;
}
