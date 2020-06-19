import React from 'react';
import { connect } from 'react-redux'
import { Collapse, List, Empty, Dropdown, Menu, Divider, message } from 'antd'
import { createPageEditLink } from 'utils/link-generator'
import { Link } from 'gatsby'
import { MenuOutlined, EditOutlined, DeleteOutlined, RetweetOutlined } from '@ant-design/icons';
import EditSectionModal from 'components/book/edit/section/edit-section-modal'
import ReorderPageModal from 'components/book/edit/section/reorder-page-modal'
import { reorderPages } from 'modules/book/edit'
import DeleteSection from "components/book/edit/section/delete-section"
import AddPageButton from 'components/book/edit/page/add-page'
import DeletePage from 'components/book/edit/page/delete-page'

const { Panel } = Collapse;

class EditTitle extends React.Component {
    state = { visible: false }

    closeModal = e => {
        if (e) e.stopPropagation();
        this.setState({
            visible: false,
        });
    };

    showModal = e => {
        if (e) e.stopPropagation();
        this.setState({
            visible: true,
        });
    };

    render() {
        return (
            <div onClick={this.showModal}>
                <EditOutlined style={{ marginRight: '8px' }} />タイトル編集
                <EditSectionModal
                    bookId={this.props.bookId}
                    sectionId={this.props.sectionId}
                    sectionTitle={this.props.sectionTitle}
                    closeModal={this.closeModal}
                    visible={this.state.visible}
                />
            </div>
        )
    }
}

class ReorderPageComponent extends React.Component {
    state = { visible: false, beforeReorderPages: [] }

    closeModal = e => {
        if (e) e.stopPropagation();
        this.setState({
            visible: false,
        });
        this.props.reorderPages(this.state.beforeReorderPages);
    };

    showModal = e => {
        if (e) e.stopPropagation();
        if (!this.props.pages || this.props.pages.length === 0) {
            message.error("ページがありません。", 7)
            return;
        }

        this.setState({
            visible: true,
            beforeReorderPages: this.props.pages
        });
    };

    render() {
        return (
            <div onClick={this.showModal}>
                <RetweetOutlined rotate={90} style={{ marginRight: '8px' }} />並び替え
                <ReorderPageModal
                    bookId={this.props.bookId}
                    sectionId={this.props.sectionId}
                    closeModal={this.closeModal}
                    visible={this.state.visible}
                    pages={this.props.pages}
                />
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => ({
    reorderPages: (sectionId, pages) => dispatch(reorderPages(sectionId, pages)),
})

const ReorderPage = connect(null, mapDispatchToProps)(ReorderPageComponent);

const sectionEditMenu = (bookId, sectionId, sectionTitle, pages) => {
    return (
        <Menu>
            <Menu.Item key="0">
                <EditTitle bookId={bookId} sectionId={sectionId} sectionTitle={sectionTitle} />
            </Menu.Item>
            <Menu.Item key="1">
                <ReorderPage bookId={bookId} sectionId={sectionId} pages={pages} />
            </Menu.Item>
            <Menu.Divider />
            <Menu.Item key="2">
                <DeleteSection id={bookId} sectionId={sectionId}>
                    <div onClick={e => e.stopPropagation()}>
                        <DeleteOutlined style={{ marginRight: "8px" }} />削除
                    </div>
                </DeleteSection>
            </Menu.Item>
        </Menu>
    );
}

const SectionEditDropdown = ({ bookId, sectionId, sectionTitle, pages }) => {
    return (
        <Dropdown
            trigger={['click']}
            placement="bottomRight"
            onClick={e => e.stopPropagation()}
            overlay={sectionEditMenu(bookId, sectionId, sectionTitle, pages)}
        >
            <MenuOutlined />
        </Dropdown>
    )
}

class BookEditMenuSectionsComponent extends React.Component {
    state = { activeSectionIds: [] }

    confirmMove = (e, pageId) => {
        if (!this.props.saved) {
            if (typeof window) {
                if (!window.confirm("内容を保存せずにページ移動しますか？")) {
                    e.preventDefault();
                }
            }
        }
        if (pageId === this.props.currentEditPageId) {
            e.preventDefault();
        }
    }

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
                        expandIconPosition="left"
                        onChange={val => this.setState({ activeSectionIds: val })}
                        style={{ background: this.props.background ? this.props.background : "white" }}
                    >
                        {this.props.sections.map((s, sectionIdx) => {
                            return (
                                <Panel
                                    key={s.id}
                                    className="book-menu-section-panel"
                                    header={<span style={{ fontSize: '16px' }}>{sectionIdx + 1 + ". " + s.title}</span>}
                                    extra={<SectionEditDropdown bookId={this.props.id} sectionId={s.id} sectionTitle={s.title} pages={s.pages} />}
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
                                                <Link
                                                    style={{ fontWeight: '400' }}
                                                    onClick={e => this.confirmMove(e, page.id)}
                                                    to={createPageEditLink(page.id, this.props.id)}
                                                >
                                                    <List.Item
                                                        className="book-menu-page-item"
                                                        style={{ padding: '4px 0px 0px 8px', border: 'none', background }}
                                                        key={page.id}
                                                    >
                                                        <List.Item.Meta
                                                            title={
                                                                <p style={{ marginBottom: '0px', color }}>
                                                                    <span style={{ marginRight: '8px' }}>{sectionIdx + 1}.{pageIdx + 1} </span>
                                                                    {page.title}
                                                                    <span className="page-edit-delete-button"><DeletePage id={page.id} /></span>
                                                                </p>
                                                            }
                                                        />
                                                    </List.Item>
                                                </Link>
                                            )
                                        }}
                                    />
                                    <div style={{ marginTop: '10px' }}>
                                        <AddPageButton pages={s.pages} bookId={this.props.id} sectionId={s.id} pageEdit={true} />
                                    </div>
                                    <Divider style={{ margin: '4px 0px' }} />
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
    id: state.bookEdit.id,
    sections: state.bookEdit.sections,
    currentEditPageId: state.pageEdit.id,
    saved: state.pageEdit.saved
})


const BookEditMenuSections = connect(mapStateToProps)(BookEditMenuSectionsComponent);
export default BookEditMenuSections