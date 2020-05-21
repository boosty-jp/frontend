import React from 'react';
import { connect } from 'react-redux'
import { Collapse, List, Empty } from 'antd'
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
            <div style={{ overflowY: 'auto', maxHeight: '100%' }}>
                {this.props.sections.length > 0 &&
                    <Collapse
                        bordered={false}
                        activeKey={activeSectionIds}
                        expandIconPosition="right"
                        onChange={val => this.setState({ activeSectionIds: val })}
                        style={{ background: this.props.background ? this.props.background : "white" }}
                    >
                        {this.props.sections.map((s, sectionIdx) => {
                            return (
                                <Panel
                                    key={s.id}
                                    header={
                                        <span style={{ fontSize: '16px' }}>{sectionIdx + 1 + ". " + s.title}</span>
                                    }
                                    className="book-menu-section-panel"
                                >
                                    <List
                                        itemLayout="horizontal"
                                        dataSource={s.pages}
                                        locale={{
                                            emptyText: (<Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="ページがありません" />)
                                        }}
                                        renderItem={(page, pageIdx) => {
                                            const color = page.id === this.props.pageId ? '#2f54eb' : '';
                                            const background = page.id === this.props.pageId ? '#d6e4ff' : '';

                                            return (
                                                <Link to={createPageViewLink(page.id, this.props.id)} style={{ fontWeight: '400' }} >
                                                    <List.Item
                                                        className="book-menu-page-item"
                                                        style={{ padding: '4px 8px 0px 8px', border: 'none', background }}
                                                        key={page.id}
                                                    >
                                                        <List.Item.Meta
                                                            title={
                                                                <p style={{ marginBottom: '0px', color }}>
                                                                    <span style={{ marginRight: '8px' }}>{sectionIdx + 1}.{pageIdx + 1} </span>
                                                                    {page.title}
                                                                </p>
                                                            }
                                                        />
                                                    </List.Item>
                                                </Link>
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