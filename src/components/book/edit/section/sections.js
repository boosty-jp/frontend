import React from 'react';
import { Collapse, List, Empty, Switch } from 'antd'
import { Link } from 'gatsby'
import { connect } from 'react-redux'
import DeleteSection from 'components/book/edit/section/delete-section'
import EditSectionForm from 'components/book/edit/section/edit-section'
import AddPageButton from 'components/book/edit/page/add-page'
import DeletePage from 'components/book/edit/page/delete-page'
import ReorderPage from 'components/book/edit/section/reorder-page'
import { createPageEditLink, createPageViewLink } from 'utils/link-generator';
import { EditOutlined } from '@ant-design/icons';
import TrialReadButton from 'components/book/edit/page/trial-read-button'

const { Panel } = Collapse;

const BookEditSectionsComponent = (props) => {
    if (props.sections.length > 0) {
        return (
            <Collapse defaultActiveKey={props.sections.map(s => { return s.id })} >
                {props.sections.map((s, sectionIdx) => {
                    return (
                        <Panel
                            key={s.id}
                            header={sectionIdx + 1 + ". " + s.title}
                            extra={
                                <div onClick={e => e.stopPropagation()}>
                                    <EditSectionForm sectionTitle={s.title} id={props.id} sectionId={s.id} />
                                    <ReorderPage bookId={props.id} sectionId={s.id} pages={s.pages} />
                                    <DeleteSection id={props.id} sectionId={s.id} />
                                </div>
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

                                    return (
                                        <List.Item
                                            actions={[
                                                <TrialReadButton sectionId={s.id} pageId={page.id} checked={page.canPreview} />
                                                ,
                                                <Link to={createPageEditLink(page.id, props.id)}>
                                                    <EditOutlined style={{ color: "rgb(0, 0, 0, 0.65)" }} />
                                                </Link>,
                                                <DeletePage id={page.id} />

                                            ]}
                                            style={{ paddingTop: paddingTop, paddingBottom: paddingBottom }}
                                            key={page.id}
                                        >
                                            <List.Item.Meta
                                                title={
                                                    <Link to={createPageViewLink(page.id, props.id)}>
                                                        <span style={{ marginRight: '12px' }}>{sectionIdx + 1}-{pageIdx + 1}. </span>
                                                        {page.title}
                                                    </Link>
                                                }
                                            />
                                        </List.Item>
                                    )
                                }}
                            />
                            <div style={{ marginTop: '16px' }}>
                                <AddPageButton pages={s.pages} bookId={props.id} sectionId={s.id} />
                            </div>
                        </Panel>
                    )
                })
                }
            </Collapse >
        );
    } else {
        return <></>
    }
}

const mapStateToProps = state => ({
    sections: state.bookEdit.sections,
})

const BookEditSections = connect(mapStateToProps)(BookEditSectionsComponent)
export default BookEditSections