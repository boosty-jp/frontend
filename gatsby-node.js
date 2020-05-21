const path = require("path")
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
    if (stage === 'develop-html' || stage === 'build-html') {
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

const notificationQuery = `
  query AllNotifications {
    allContentfulNotification(sort: {fields: updatedAt, order: DESC}) {
      edges {
        node {
          title
          type
          slug
          body{
             body
          }
          updatedAt(locale: "ja-JP", formatString: "YYYY年MM月DD日")
        }
      }
    }
  }
`

exports.createPages = async ({ graphql, actions: { createPage } }) => {
    const result = await graphql(notificationQuery)
    if (result.errors || !result.data) {
        throw result.errors
    }
    const { edges } = result.data.allContentfulNotification

    edges.forEach(edge => {
        createPage({
            path: `/notification/${edge.node.slug}/`,
            component: path.resolve("./src/templates/notification.js"),
            context: { notification: edge.node, next: edge.next, previous: edge.previous, notifications: edges }
        })
    });
}