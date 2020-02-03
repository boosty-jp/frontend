import React from "react"
import { connect } from 'react-redux'
import TestLayout from 'components/layout/vertical/test'
import withLocation from "components/wrapper/location";
import TestContentComponent from "components/test/view"

const TestDetailPageComponent = (props) => {
    const { id } = props.search

    return (
        <TestLayout>
            <TestContentComponent id={id} />
        </TestLayout>
    );
}

const mapStateToProps = state => ({
    author: state.articleView.author,
})

const TestDetailPage = connect(mapStateToProps)(TestDetailPageComponent)
export default withLocation(TestDetailPage)