import React from "react"
import { connect } from 'react-redux'
import { Row, Col, Icon, Button } from 'antd';
import { createPageViewLink } from "utils/link-generator";

const isBrowser = typeof window !== 'undefined';
const navigate = isBrowser ? require('gatsby').navigate : () => { }

const BookViewMenuButtonsComponents = (props) => {
    let pageIds = [];
    props.sections.forEach(s => s.pages.forEach(p => pageIds.push(p.id)));
    const currentIdx = pageIds.indexOf(props.pageId);
    let previousId = "";
    let nextId = "";
    if (currentIdx >= 0) {
        if (currentIdx > 0) {
            previousId = pageIds[currentIdx - 1];
        }
        if (currentIdx < pageIds.length - 1) {
            nextId = pageIds[currentIdx + 1];
        }
    }

    return (
        <Row gutter={8}>
            <Col span={12}>
                <Button
                    shape="round"
                    block
                    icon="left"
                    disabled={!previousId}
                    onClick={() => navigate(createPageViewLink(previousId, props.id))}
                >
                    前へ
                </Button>
            </Col>
            <Col span={12}>
                <Button
                    shape="round"
                    block
                    disabled={!nextId}
                    onClick={() => navigate(createPageViewLink(nextId, props.id))}
                >
                    次へ<Icon type="right" style={{ marginLeft: '8px' }} />
                </Button>
            </Col>
        </Row>
    )
}


const mapStateToProps = state => ({
    id: state.bookView.id,
    sections: state.bookView.sections,
})

const BookViewMenuButtons = connect(mapStateToProps)(BookViewMenuButtonsComponents);
export default BookViewMenuButtons