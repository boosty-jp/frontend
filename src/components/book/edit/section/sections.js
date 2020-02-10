import React from 'react';
import { Collapse, List, Icon, Empty } from 'antd'
import { Link } from 'gatsby'
import { connect } from 'react-redux'
import DeleteSection from 'components/book/edit/section/delete-section'
import EditSectionForm from 'components/book/edit/section/edit-section'
import AddPageButton from 'components/book/edit/page/add-page'
import DeletePage from 'components/book/edit/page/delete-page'
import ReorderPage from 'components/book/edit/section/reorder-page'
import { createPageEditLink } from 'utils/link-generator';

const { Panel } = Collapse;

const BookEditSectionsComponent = (props) => {
    if (props.sections.length > 0) {
        return (
            <Collapse defaultActiveKey={props.sections.map(s => { return s.id })} >
                {props.sections.map((s, sectionIdx) => {
                    console.log(s);
                    return (
                        <Panel
                            key={s.id}
                            header={sectionIdx + 1 + ". " + s.title}
                            extra={
                                <>
                                    <EditSectionForm sectionTitle={s.title} id={props.id} sectionId={s.id} />
                                    <ReorderPage bookId={props.id} sectionId={s.id} pages={s.pages} />
                                    <DeleteSection id={props.id} sectionId={s.id} />
                                </>
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
                                                <Link to={createPageEditLink(page.id, props.id)}>
                                                    <Icon type="edit" />
                                                </Link>,
                                                <DeletePage id={page.id} />

                                            ]}
                                            style={{ paddingTop: paddingTop, paddingBottom: paddingBottom }}
                                            key={page.id}
                                        >
                                            <List.Item.Meta
                                                title={
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