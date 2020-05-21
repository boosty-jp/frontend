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
        <Anchor
            offsetTop={50}
            style={{ backgroundColor: 'transparent', textAlign: 'left', maxWidth: '250px' }}
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
    )
}

const mapStateToProps = state => ({
    anchors: state.pageView.anchors,
})

const PageAnchor = connect(mapStateToProps)(PageMenu)

const PageViewAnchorMenu = () => {
    return (
        <PageAnchor />
    )
}

export default PageViewAnchorMenu;