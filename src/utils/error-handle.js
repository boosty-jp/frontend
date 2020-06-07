export const getErrorMessage = (error) => {
    if (!error.message || error.message.match(/INTERNAL SERVER ERROR/g)) {
        return 'エラーが発生しました。お手数ですが、再度お試しください。';
    } else {
        return error.message.replace(/Network error: /g, '');
    }
}

export const getLoginErrorMessage = (error) => {
    if (!error.message || error.message.match(/INTERNAL SERVER ERROR/g)) {
        return 'エラーが発生しました。まだアカウントを作成されていない可能性があります。';
    } else {
        return error.message.replace(/Network error: /g, '');
    }
}

export const getStripeErrorMessage = (error) => {
    if (error.type === "rate_limit_error") {
        return 'リクエスト制限に達しました。しばらく経ってから、再度お試しください。';
    } else if (error.type === "invalid_request_error" || error.type === "card_error" || error.type === "validation_error") {
        return '無効なカード情報です。カード情報をご確認ください。';
    } else if (error.type === "idempotency_error") {
        return '無効なリクエストです。リロードして、再度お試しください。';
    } else {
        return 'エラーが発生しました。お手数ですが、再度お試しください。';
    }
}

export const needPurchase = (error) => {
    return error.message && error.message.match(/購入手続きを行ってください/g);
}