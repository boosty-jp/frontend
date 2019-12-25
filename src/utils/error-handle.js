export const getErrorMessage = (error) => {
    if (!error.message || error.message.match(/INTERNAL SERVER ERROR/g)) {
        return 'エラーが発生しました。お手数ですが、再度お試しください。';
    } else {
        return error.message.replace(/Network error: /g, '');
    }
}