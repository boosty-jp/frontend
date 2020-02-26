import React from 'react';
import { connect } from 'react-redux'
import { Collapse, List, Empty, Icon } from 'antd'
import { createPageViewLink } from 'utils/link-generator'
import { Link } from 'gatsby'

const { Panel } = Collapse;

class BookViewMenuSectionsComponent extends React.Component {
    state = { activeSectionIds: [] }

    render() {
        let activeSectionIds = this.state.activeSectionIds;
        this.props.sections.filter(s => {
            if (s.pages.filter(p => p.id === this.props.pageId).length > 0) {
                if (this.state.activeSectionIds.indexOf(s.id) === -1) {
                    activeSectionIds.push(s.id)
                }
            }
        })
        return (
            <div style={{ overflowY: 'auto', maxHeight: '60vh' }}>
                {this.props.sections.length > 0 &&
                    <Collapse activeKey={activeSectionIds} onChange={val => this.setState({ activeSectionIds: val })}>
                        {this.props.sections.map((s, sectionIdx) => {
                            return (
                                <Panel
                                    key={s.id}
                                    header={
                                        <span style={{ fontWeight: '500', fontSize: '16px' }}>{sectionIdx + 1 + ". " + s.title}</span>
                                    }
                                    style={{ padding: '0px' }}
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
                                            const color = page.id === this.props.pageId ? '#2f54eb' : 'black';

                                            return (
                                                <List.Item
                                                    style={{ paddingTop: paddingTop, paddingBottom: paddingBottom }}
                                                    key={page.id}
                                                    extra={
                                                        page.id === this.props.pageId ? <Icon type="arrow-left" style={{ color, marginBottom: '4px' }} /> : <></>
                                                    }
                                                >
                                                    <List.Item.Meta
                                                        title={
                                                            <Link to={createPageViewLink(page.id, this.props.id)} style={{ color }}>
                                                                <span style={{ marginRight: '12px' }}>{sectionIdx + 1}-{pageIdx + 1}. </span>
                                                                {page.title}
                                                            </Link>
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
}

const mapStateToProps = state => ({
    id: state.bookView.id,
    sections: state.bookView.sections,
})

const BookViewMenuSections = connect(mapStateToProps)(BookViewMenuSectionsComponent);
export default BookViewMenuSections