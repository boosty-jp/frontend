import React from "react";
import { Select, Spin, Icon, Divider } from "antd";
import debounce from "lodash/debounce";

const { Option } = Select;

export default class TagSelect extends React.Component {
    constructor(props) {
        super(props);
        this.fetchTags = debounce(this.fetchTags, 300);
    }

    state = {
        searchResults: [],
        value: [],
        fetching: false,
        inputVal: ''
    };

    fetchTags = value => {
        console.log(value)
        this.setState({ searchResults: [], fetching: true, inputVal: value });

        // Algoliaの検索後
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
        console.log(value)
        this.setState({
            value,
            searchResults: [],
            fetching: false
        });
    };

    addItem = () => {
        const { value } = this.state;
        // ここでタグ追加APIを叩く
        // 追加成功したらstoreに連携する
        this.setState({
            value: [...value, { key: "hoge", label: "ho", id: "" }]
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

        return false;
    }

    render() {
        const { fetching, searchResults, value, inputVal } = this.state;
        return (
            <Select
                mode="multiple"
                labelInValue
                value={value}
                placeholder="Select users"
                notFoundContent={fetching ? <Spin size="small" /> : null}
                filterOption={false}
                onSearch={this.fetchTags}
                onChange={this.handleChange}
                style={{ width: "100%" }}
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
