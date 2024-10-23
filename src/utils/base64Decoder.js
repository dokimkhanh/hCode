export function decodeBase64(text) {
    try {
        return atob(text);
    } catch (e) {
        console.error("Lỗi khi giải mã Base64:", e);
        return "Mã Base64 không hợp lệ.";
    }
}
