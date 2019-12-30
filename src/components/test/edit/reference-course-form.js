import React from "react"
import { connect } from 'react-redux'
import { Icon, Input, AutoComplete, Row, Col } from 'antd';
import debounce from "lodash/debounce";
import styled from 'styled-components'
import { updatereferenceCourse } from 'modules/test/edit/base'
import algoliasearch from 'algoliasearch/lite';
import { getErrorMessage } from "utils/error-handle";
import ThumbnailImage from "components/image/thumbnail";

const { Option, OptGroup } = AutoComplete;

const RoundSearch = styled(AutoComplete)`
  .ant-input {
    border-radius: 500rem;
  }
`;

const searchClient = algoliasearch(
    process.env.GATSBY_ALGOLIA_APP_ID,
    process.env.GATSBY_ALGOLIA_SEARCH_ONLY_API_KEY
)

const index = searchClient.initIndex('course')

class ReferenceCourseFormComponent extends React.Component {
    constructor(props) {
        super(props);
        this.handleSearch = debounce(this.handleSearch, 300);
        this.state = {
            options: [],
            inputValue: '',
        }

    }

    handleSearch = value => {
        value = value.replace(/\s+/g, "");
        if (!value) {
            this.setState({ options: [] });
            return;
        }

        let options = []
        index.search({ query: value, hitsPerPage: 8 }).then(({ hits }) => {
            options[0] = (
                <OptGroup key="course-search-result" label="検索結果">
                    {hits.map(s => {
                        return (
                            <Option key={s.objectID} value={s.title} imageUrl={s.imageUrl}>
                                {s.title}
                            </Option>
                        )
                    }
                    )}
                </OptGroup>);
            this.setState({ options })
        }).catch(() => {
            options[0] = (<OptGroup key="course-search-result" label="検索結果"></OptGroup>);
            this.setState({ options })
        })
    };

    updateCourse = (id, name, imageUrl) => {
        if (this.props.questions.length > 0) {
            // すでに問題作成中だった場合は
            // 問題をすべてクリアすることになるので警告を出す。
        }
        this.props.updateReferenceCourse({ id: id, name: name, imageUrl: imageUrl })
    }

    render() {
        return (
            <>
                {this.props.referenceCourse.id ?
                    <div
                        style={{
                            borderColor: "#69c0ff",
                            backgroundColor: '#e6f7ff',
                            borderWidth: '2px',
                            borderStyle: 'solid',
                            borderRadius: '0.5rem',
                            padding: this.props.referenceCourse.imageUrl ? '0px 10px 10px 10px' : '0px 10px 0px 10px',
                        }}>
                        {this.props.referenceCourse.imageUrl &&
                            <div style={{ textAlign: 'right' }}>
                                <Icon
                                    type="close"
                                    style={{ color: "#69c0ff", fontSize: '16px' }}
                                    onClick={() => this.updateCourse('', '', '')}
                                />
                            </div>
                        }
                        <Row align={this.props.referenceCourse.imageUrl ? "top" : "middle"} type="flex" justify="space-between">
                            <Col xs={18} sm={18} md={18} lg={18} xl={18} xxl={18}>
                                <p style={{ fontSize: '16px', marginBottom: '0px', lineHeight: '22px', fontWeight: '500' }}>
                                    {this.props.referenceCourse.name}
                                </p>
                            </Col>
                            <Col xs={6} sm={6} md={6} lg={6} xl={6} xxl={6}>
                                {this.props.referenceCourse.imageUrl ?
                                    <ThumbnailImage imageUrl={this.props.referenceCourse.imageUrl} />
                                    :
                                    <div style={{ textAlign: 'right' }}>
                                        <Icon
                                            type="close"
                                            style={{ color: "#69c0ff", fontSize: '16px' }}
                                            onClick={() => this.updateCourse('', '', '')}
                                        />
                                    </div>
                                }
                            </Col>
                        </Row>
                    </div>
                    :
                    <div className="certain-category-search-wrapper" style={{ width: '100%' }}>
                        <RoundSearch
                            className="certain-category-search"
                            dropdownClassName="certain-category-search-dropdown"
                            dropdownStyle={{ width: 300 }}
                            size="large"
                            style={{ width: '100%' }}
                            dataSource={this.state.options}
                            onSelect={(value, option) => {
                                this.props.updateReferenceCourse({ id: option.key, name: value, imageUrl: option.props.imageUrl })
                            }}
                            onSearch={this.handleSearch}
                            placeholder="コース名を入力してください"
                            optionLabelProp="value"
                        >
                            <Input suffix={<Icon type="search" className="certain-category-icon" />} />
                        </RoundSearch>
                    </div>
                }
            </>
        );
    }
}


const mapStateToProps = state => ({
    referenceCourse: state.testEditBase.referenceCourse,
    questions: state.testEditQuestions.questions,
})

const mapDispatchToProps = dispatch => ({
    updateReferenceCourse: (referenceCourse) => dispatch(updatereferenceCourse(referenceCourse)),
})

const ReferenceCourseForm = connect(mapStateToProps, mapDispatchToProps)(ReferenceCourseFormComponent)
export default ReferenceCourseForm