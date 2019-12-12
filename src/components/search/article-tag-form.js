import React from "react";
import { connect } from 'react-redux'
import { Select, Spin, Divider } from "antd";
import debounce from "lodash/debounce";
import { updateTags, addTag } from 'modules/course/edit/base'

const { Option } = Select;

class ArticleTagSelectComponent extends React.Component {
    constructor(props) {
        super(props);
        this.fetchTags = debounce(this.fetchTags, 300);
    }

    state = {
        searchResults: [],
        fetching: false,
        inputVal: '',
        open: false,
    };

    fetchTags = value => {
        this.setState({ searchResults: [], fetching: true, inputVal: value, open: true });

        // Algoliaの検索後
        // TODO: すでに入力済みのものは検索結果から消す
        this.setState({
            searchResults: [
                { id: 'res-1', name: "検索結果1" },
                { id: 'res-2', name: "検索結果2" }
            ],
            fetching: false
        });
    };

    handleChange = value => {
        // 追加成功したらstoreに連携する
        this.setState({
            searchResults: [],
            fetching: false,
            open: false,
            inputVal: ''
        });

        this.props.updateTags(value);
    };

    addItem = () => {
        const { inputVal } = this.state;
        // ここでタグ追加APIを叩く
        // 追加成功したらstoreに連携する
        this.setState({
            searchResults: [],
            fetching: false,
            open: false,
            inputVal: ''
        });
        this.props.addTag({ key: "key-" + inputVal, label: inputVal, id: "id-" + inputVal })
    };

    displayCreationForm = () => {
        if (!this.state.inputVal) return false;
        // 検索候補にあるかどうか？
        return !this.alreadyExists();
    }

    alreadyExists = () => {
        const searchResultsNames = this.state.searchResults.map((tag) => {
            return tag.name
        });

        for (var i = 0; i < searchResultsNames.length; i++) {
            if (searchResultsNames[i] === this.state.inputVal) {
                return true;
            }
        }

        const selectedTagsLabels = this.props.tags.map((tag) => {
            return tag.label
        });

        for (var i = 0; i < selectedTagsLabels.length; i++) {
            if (selectedTagsLabels[i] === this.state.inputVal) {
                return true;
            }
        }

        return false;
    }

    render() {
        const { fetching, searchResults, inputVal, open } = this.state;
        return (
            <Select
                size="large"
                mode="multiple"
                labelInValue
                value={this.props.tags}
                placeholder="タグを選択する"
                notFoundContent={fetching ? <Spin size="small" /> : null}
                filterOption={false}
                onSearch={this.fetchTags}
                onChange={this.handleChange}
                style={{ width: "100%" }}
                open={open}
                dropdownRender={menu => (
                    this.displayCreationForm() ?
                        <div>
                            {menu}
                            <Divider style={{ margin: "4px 0" }} />
                            <div
                                style={{ padding: "4px 8px", cursor: "pointer" }}
                                onMouseDown={e => e.preventDefault()}
                                onClick={this.addItem}
                            >
                                <strong>「{inputVal}」</strong>を追加する
                            </div>
                        </div>
                        :
                        <>
                            {menu}
                        </>
                )}
            >
                {
                    searchResults.map(d => (
                        <Option key={d.id}>{d.name}</Option>
                    ))
                }
            </Select >
        );
    }
}

const mapStateToProps = state => ({
    tags: state.courseEditBase.tags,
})

const mapDispatchToProps = dispatch => ({
    updateTags: (tags) => dispatch(updateTags(tags)),
    addTag: (tag) => dispatch(addTag(tag)),
})

const ArticleTagSelect = connect(mapStateToProps, mapDispatchToProps)(ArticleTagSelectComponent)
export default ArticleTagSelect