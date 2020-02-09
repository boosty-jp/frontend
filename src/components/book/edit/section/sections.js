import React from 'react';
import { Collapse, List, Icon, Empty, Button } from 'antd'
import { connect } from 'react-redux'
import DeleteSection from 'components/book/edit/section/delete-section'
import EditSectionForm from 'components/book/edit/section/edit-section'
import AddPageButton from 'components/book/edit/page/add-page'

const { Panel } = Collapse;

const BookEditSectionsComponent = (props) => {
    if (props.sections.length > 0) {
        return (
            <Collapse defaultActiveKey={[...Array(props.sections.length).keys()]} >
                {props.sections.map((s, sectionIdx) => {
                    return (
                        <Panel
                            key={s.id}
                            header={sectionIdx + 1 + ". " + s.title}
                            extra={
                                <>
                                    <EditSectionForm sectionTitle={s.title} id={props.id} sectionId={s.id} />
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
                                                <Icon type="eye" />
                                            ]}
                                            style={{ paddingTop: paddingTop, paddingBottom: paddingBottom }}
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