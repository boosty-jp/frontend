import React, { useState, useEffect, useRef } from "react"
import { connect } from 'react-redux'
import TestLayout from 'components/layout/vertical/test'
import withLocation from "components/wrapper/location";
import TestContentComponent from "components/test/view"

const TestDetailPageComponent = (props) => {
    const { id } = props.search
    const [width, setWidth] = useState(0)
    const ref = useRef(null)

    useEffect(() => {
        setWidth(ref.current.clientWidth)
    })

    let mobile = true;
    if (width > 760) {
        mobile = false;
    }

    return (
        <TestLayout>
            <div ref={ref}>
                <div style={{
                    background: '#fff',
                    maxWidth: '740px',
                    width: '100%',
                    margin: '30px auto',
                    boxShadow: '0 4px 11px 0 rgba(37,44,97,.15), 0 1px 3px 0 rgba(93,100,148,.2)',
                    borderRadius: '0.5rem'
                }}>
                    <TestContentComponent id={id} mobile={mobile} />
                </div>
            </div>
        </TestLayout>
    );
}

const mapStateToProps = state => ({
    author: state.articleView.author,
})

const TestDetailPage = connect(mapStateToProps)(TestDetailPageComponent)
export default withLocation(TestDetailPage)