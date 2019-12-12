import React from "react"
import { connect } from 'react-redux'
import { Icon, Input, AutoComplete } from 'antd';
import debounce from "lodash/debounce";
import { updateSkillDraft, clearSkillDraft } from 'modules/article/edit'

const { Option, OptGroup } = AutoComplete;

const searchResults = [
    { id: 's-1', name: 'Java', referedNum: 109 },
    { id: 's-2', name: 'Ruby', referedNum: 8 },
    { id: 's-3', name: 'C++', referedNum: 3981 },
    { id: 's-4', name: 'Python', referedNum: 203 },
];


class SkillForm extends React.Component {
    constructor(props) {
        super(props);
        this.handleSearch = debounce(this.handleSearch, 300);
    }
    state = {
        options: [],
        inputValue: '',
        searchResults: [],
    }

    handleSearch = value => {
        value = value.replace(/\s+/g, "");
        if (!value) {
            this.setState({ options: [] });
            return;
        }
        let options = []
        options[0] = (<OptGroup key="skill-search-result" label="検索結果">
            {searchResults.map(s => (
                <Option key={s.id} value={s.name}>
                    {s.name}
                    <span className="certain-search-item-count">{s.referedNum} 記事</span>
                </Option>
            ))}
        </OptGroup>);
        let idx = -1;
        for (let i = 0; i < searchResults.length; i++) {
            if (searchResults[i].name === value) {
                idx = i;
            }
        }

        // API叩いてスキル作成する
        if (idx === -1) {
            options[1] = (
                <Option disabled key="all" className="show-all">
                    <a onClick={() => this.props.updateSkillDraft({ id: 'created-id', name: value })}>
                        <strong>「{value}」</strong>を新規作成する。
                    </a>
                </Option>
            );
        }

        this.setState({ options })
    };

    render() {
        return (
            <>
                {this.props.skillDraft.name ?
                    <p style={{ fontSize: '16px' }}>
                        {this.props.skillDraft.name}
                        <Icon
                            type="edit"
                            style={{ marginLeft: '8px' }}
                            onClick={() => this.props.clearSkillDraft()}
                        />
                    </p>
                    :
                    <div className="certain-category-search-wrapper" style={{ width: '100%' }}>
                        <AutoComplete
                            className="certain-category-search"
                            dropdownClassName="certain-category-search-dropdown"
                            dropdownStyle={{ width: 300 }}
                            size="large"
                            style={{ width: '100%' }}
                            dataSource={this.state.options}
                            onSelect={(value, option) => {
                                this.props.updateSkillDraft({ id: option.key, name: value })
                            }}
                            onSearch={this.handleSearch}
                            placeholder="スキル名を入力してください"
                            optionLabelProp="value"
                        >
                            <Input suffix={<Icon type="search" className="certain-category-icon" />} />
                        </AutoComplete>
                    </div>
                }
            </>
        );
    }
}


const mapStateToProps = state => ({
    skillDraft: state.articleEdit.skillDraft,
})

const mapDispatchToProps = dispatch => ({
    updateSkillDraft: (skillDraft) => dispatch(updateSkillDraft(skillDraft)),
    clearSkillDraft: () => dispatch(clearSkillDraft()),
})

const ArticleSkillForm = connect(mapStateToProps, mapDispatchToProps)(SkillForm)
export default ArticleSkillForm