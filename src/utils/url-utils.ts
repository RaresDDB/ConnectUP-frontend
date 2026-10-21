class UrlUtils {
    public static getTokenFromUrl() {
        const params = new URLSearchParams(window.location.search);
        return params.get('token');
    }
}

export default UrlUtils;