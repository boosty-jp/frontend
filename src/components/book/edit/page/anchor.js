import React from "react"
import { connect } from 'react-redux'
import { Row, Col, Anchor } from 'antd';
const { Link } = Anchor;

const PageMenu = (props) => {
    if (!props.anchors) return <></>

    var header2List = [];
    var header3List = [];
    var parentId = '';

    props.anchors.forEach(a => {
        if (a.level === 2) {
            parentId = a.id;
            header2List.push(a.id);
        }
        if (a.level === 3) {
            header3List.push({ id: a.id, parentId: parentId });
        }
    })

    return (
        <div style={{ position: "fixed", right: '0px', textAlign: 'left', height: '0px', padding: '20px', width: 'calc((100% - 900px) / 2)' }}>
            <Anchor
                offsetTop={140}
                style={{ backgroundColor: 'transparent' }}
            >
                {header2List.map(h2 => {
                    return (
                        <Link href={"#" + h2} title={h2} >
                            {header3List.map(h3 => {
                                if (h3.parentId === h2) {
                                    return <Link href={"#" + h3.id} title={h3.id} />
                                }
                                return <></>
                            })}
                        </Link>
                    )
                })}
            </Anchor>
        </div>
    )
}

const mapStateToProps = state => ({
    anchors: state.pageEdit.anchors,
    previewMode: state.pageEdit.previewMode,
})

const PageAnchor = connect(mapStateToProps)(PageMenu)

const PageEditAnchorMenu = (props) => {
    if (!props.previewMode) return <></>;

    return (
        <Row >
            <Col xs={0} sm={0} md={0} lg={0} xl={24} xxl={24}>
                <PageAnchor />
            </Col>
        </Row>
    )
}

export default connect(mapStateToProps)(PageEditAnchorMenu)