require("dotenv").config({
    path: `.env.${process.env.NODE_ENV}`,
})


// Firebaseのエラー回避
// https://github.com/firebase/firebase-js-sdk/issues/2222#issuecomment-538072948
exports.onCreateWebpackConfig = ({
    stage,
    actions,
    getConfig
}) => {
    if (stage === 'develop-html') {
        actions.setWebpackConfig({
            externals: getConfig().externals.concat(function (context, request, callback) {
                const regex = /^@?firebase(\/(.+))?/;
                // exclude firebase products from being bundled, so they will be loaded using require() at runtime.
                if (regex.test(request)) {
                    return callback(null, 'umd ' + request);
                }
                callback();
            })
        });
    }
};