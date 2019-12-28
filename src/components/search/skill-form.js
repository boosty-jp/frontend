import React from "react"
import { connect } from 'react-redux'
import { Icon, Input, AutoComplete, Spin, message } from 'antd';
import debounce from "lodash/debounce";
import { updateSkillDraft, clearSkillDraft } from 'modules/article/edit'
import { withApollo } from 'react-apollo'
import gql from 'graphql-tag';
import algoliasearch from 'algoliasearch/lite';
import { getErrorMessage } from "utils/error-handle";

const { Option, OptGroup } = AutoComplete;

const CREATE_SKILL = gql`
mutation CreateSkill ($name: String!) {
  createSkill(name: $name){
      id
  }
}
`;

const searchClient = algoliasearch(
    process.env.GATSBY_ALGOLIA_APP_ID,
    process.env.GATSBY_ALGOLIA_SEARCH_ONLY_API_KEY
)

const index = searchClient.initIndex('skill')

class SkillForm extends React.Component {
    constructor(props) {
        super(props);
        this.handleSearch = debounce(this.handleSearch, 300);
        this.state = {
            options: [],
            inputValue: '',
            loading: false,
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
                <OptGroup key="skill-search-result" label="検索結果">
                    {hits.map(s => (
                        <Option key={s.id} value={s.name}>
                            {s.name}
                            <span className="certain-search-item-count">{s.referedNum} 記事</span>
                        </Option>
                    ))}
                </OptGroup>);

            let idx = -1;
            for (let i = 0; i < hits.length; i++) {
                if (hits[i].name === value) {
                    idx = i;
                }
            }

            // API叩いてスキル作成する
            if (idx === -1) {
                options[1] = (
                    <Option key={value} className="show-all">
                        <a onClick={() => this.addSkill(value)}>
                            <strong>「{value}」</strong>を新規作成する。
                    </a>
                    </Option>
                );
            }

            this.setState({ options })

        }).catch(() => {
            options[0] = (<></>);
            options[1] = (
                <Option key={value} className="show-all">
                    <a onClick={() => this.addSkill(value)}>
                        <strong>「{value}」</strong>を新規作成する。
                    </a>
                </Option>
            );

            this.setState({ options })
        })
    };

    addSkill = async (value) => {
        this.setState({ loading: true });
        try {
            const { data } = await this.props.client.mutate({
                mutation: CREATE_SKILL,
                variables: { name: value }
            });

            this.props.updateSkillDraft({ id: data.createSkill.id, name: value })
        } catch (err) {
            message.error(getErrorMessage(err), 7)
        }

        this.setState({ loading: false });
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
                    <Spin spinning={this.state.loading} tip="更新中です" indicator={<Icon type="loading" style={{ fontSize: 24 }} spin />}>
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
                    </Spin>
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
export default withApollo(ArticleSkillForm)