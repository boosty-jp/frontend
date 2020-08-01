import React from "react"
import withLocation from "components/wrapper/location";
import { connect } from 'react-redux'
import ArticleEditPageLayout from "components/article/edit/layout";
import { clearPage } from 'modules/page/edit/index'

const isBrowser = typeof window !== 'undefined';
const navigate = isBrowser ? require('gatsby').navigate : () => { }

class ArticleEditPageComponent extends React.Component {

    render() {
        const { id } = this.props.search
        if (!id) navigate("/404");
        this.props.clearPage();

        return (
            <ArticleEditPageLayout>
                hoge
            </ArticleEditPageLayout>
        )
    }
}

const mapDispatchToProps = dispatch => ({
    clearPage: (page) => dispatch(clearPage(page)),
})

const ArticleEditPage = connect(null, mapDispatchToProps)(ArticleEditPageComponent)
export default withLocation(ArticleEditPage)