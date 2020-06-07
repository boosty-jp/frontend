import React from "react"
import { connect } from 'react-redux'
import { Row, Col } from 'antd';

const PageCharctorCountAnchor = (props) => {
    const fontColor = props.text.length > 30000 ? "#f5222d" : "#595959"
    return (
        <Row>
            <Col xs={0} md={0} lg={24} xl={24} xxl={24}>
                <div style={{ textAlign: 'right', position: 'fixed', right: '20px', bottom: '20px', color: fontColor }}>
                    <p style={{ marginBottom: '8px' }}>
                        <span style={{ fontSize: '16px', marginRight: '4px' }}>{props.text.length}</span>文字
                    </p>
                    {props.text.length > 30000 &&
                        <p>最大文字数は30000文字です</p>
                    }
                </div>
            </Col>
        </Row>
    )
}

const mapStateToProps = state => ({
    text: state.pageEdit.text,
})


export default connect(mapStateToProps)(PageCharctorCountAnchor)