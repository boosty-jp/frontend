import React from 'react';
import { connect } from 'react-redux'
import { Collapse, List, Empty, Button } from 'antd'
import { createPageViewLink } from 'utils/link-generator'
import { Link } from 'gatsby'

const { Panel } = Collapse;

const cardStyle = {
    backgroundColor: 'white',
    boxShadow: '0 4px 11px 0 rgba(37,44,97,.15), 0 1px 3px 0 rgba(93,100,148,.2)',
    borderRadius: '0.5rem',
    width: '100%',
    padding: '20px',
    fontColor: 'black',
}

const BookSectionsComponent = (props) => {
    const activeKeys = props.sections.map(s => s.id);
    return (
        <div style={{ marginTop: '20px', ...cardStyle }}>
            <p style={{ fontWeight: 'bold', color: 'black', fontSize: '22px', textAlign: 'center', marginBottom: '40px' }}>
                目次
            </p>
            {props.sections.length > 0 &&
                <Collapse activeKey={activeKeys}>
                    {props.sections.map((s, sectionIdx) => {
                        return (
                            <Panel
                                key={s.id}
                                header={
                                    <span style={{ fontWeight: '500', fontSize: '16px' }}>{sectionIdx + 1 + ". " + s.title}</span>
                                }
                            >
                                <List
                                    itemLayout="horizontal"
                                    dataSource={s.pages}
                                    locale={{
                                        emptyText: (<Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="ページがありません" />)
                                    }}
                                    renderItem={(page, pageIdx) => {
                                        const paddingTop = pageIdx === 0 ? "0px" : "16px";
                                        const paddingBottom = pageIdx === s.pages.length - 1 ? "0px" : "16px";
                                        const canRead = page.canPreview || props.purchased;

                                        return (
                                            <List.Item
                                                style={{ paddingTop: paddingTop, paddingBottom: paddingBottom }}
                                                key={page.id}
                                                actions={canRead ? [<Link to={createPageViewLink(page.id, props.id)}><Button type="primary" ghost>読む</Button></Link>] : []}
                                            >
                                                <List.Item.Meta
                                                    title={
                                                        canRead ?
                                                            <Link to={createPageViewLink(page.id, props.id)}>
                                                                <span style={{ marginRight: '12px' }}>{sectionIdx + 1}-{pageIdx + 1}. </span>
                                                                {page.title}
                                                            </Link>
                                                            :
                                                            <>
                                                                <span style={{ marginRight: '12px' }}>{sectionIdx + 1}-{pageIdx + 1}. </span>
                                                                {page.title}
                                                            </>
                                                    }
                                                />
                                            </List.Item>
                                        )
                                    }}
                                />
                            </Panel>
                        )
                    })}
                </Collapse>
            }
        </div>
    );
}

const mapStateToProps = state => ({
    id: state.bookView.id,
    price: state.bookView.price,
    purchased: state.bookView.purchased,
    sections: state.bookView.sections,
})

const BookSections = connect(mapStateToProps)(BookSectionsComponent);
export default BookSections