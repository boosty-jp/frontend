import React from "react";
import { Select, Spin, Divider, message, Icon } from "antd";
import { withApollo } from 'react-apollo'
import gql from 'graphql-tag';
import debounce from "lodash/debounce";
import algoliasearch from 'algoliasearch/lite';
import { getErrorMessage } from "utils/error-handle";
import { isAbuseWord } from "utils/abuse-word-checker";

const { Option } = Select;

const CREATE_TAG = gql`
mutation CreateTag ($name: String!) {
  createTag(name: $name){
      id
  }
}
`;

const searchClient = algoliasearch(
    process.env.GATSBY_ALGOLIA_APP_ID,
    process.env.GATSBY_ALGOLIA_SEARCH_ONLY_API_KEY
)

const index = searchClient.initIndex('tag')

class TagSelectForm extends React.Component {
    constructor(props) {
        super(props);
        this.fetchTags = debounce(this.fetchTags, 300);
        this.state = {
            searchResults: [],
            fetching: false,
            inputVal: '',
            open: false,
            loading: false,
        };
    }

    fetchTags = value => {
        value = value.replace(/\s+/g, "");
        if (value.length === 0) {
            //空白文字のときは何も表示しない
            this.setState({ fetching: false, searchResults: [] })
            return;
        }

        this.setState({ searchResults: [], fetching: true, inputVal: value, open: true });

        index.search({ query: value, hitsPerPage: 8 }).then(({ hits }) => {
            const result = hits.map(hit => {
                return { id: hit.objectID, key: hit.objectID, name: hit.name }
            })

            this.setState({ fetching: false, searchResults: result })
        }).catch(() => { this.setState({ fetching: false }) })
    };

    handleChange = values => {
        this.setState({
            searchResults: [],
            fetching: false,
            open: false,
            inputVal: ''
        });
        this.props.updateTags(values.map(v => { return { id: v.key, name: v.label } }));
    };

    addItem = async () => {
        const { inputVal } = this.state;
        this.setState({ loading: true, fetching: true, open: false });
        try {
            if (isAbuseWord(inputVal)) {
                throw new Error("その用語は登録できません");
            }
            const { data } = await this.props.client.mutate({
                mutation: CREATE_TAG,
                variables: { name: inputVal }
            });

            this.props.addTag({ id: data.createTag.id, name: inputVal })

        } catch (err) {
            message.error(getErrorMessage(err), 7)
        }

        this.setState({
            searchResults: [],
            fetching: false,
            open: false,
            inputVal: '',
            loading: false
        });
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
        const { fetching, searchResults, inputVal, open, loading } = this.state;
        return (
            <Spin spinning={loading} tip="更新中です" indicator={<Icon type="loading" style={{ fontSize: 24 }} spin />}>
                <Select
                    size="large"
                    mode="multiple"
                    labelInValue
                    value={this.props.tags.map(t => { return { key: t.id, label: t.name } })}
                    placeholder="タグを選択する"
                    notFoundContent={fetching ? <Spin size="small" /> : null}
                    filterOption={false}
                    onSearch={this.fetchTags}
                    onChange={this.handleChange}
                    style={{ width: "100%" }}
                    open={open}
                    onBlur={() => this.setState({ open: false })}
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
            </Spin>
        );
    }
}

export default withApollo(TagSelectForm)