import React from "react"
import { connect } from 'react-redux'
import { message, Modal, Icon, Button, Rate, List, Radio, Badge } from 'antd';
import SkillSelect from "components/search/skill-form";
import { addSkill, deleteSkill, clearSkillDraft } from 'modules/article/edit'
import { isAbuseWord } from "utils/abuse-word-checker";
import { presetPalettes } from '@ant-design/colors'

class SkillForm extends React.Component {
    state = { visible: false, skillLevel: 2 };

    showDrawer = () => {
        this.setState({
            visible: true,
        });
    };

    onClose = () => {
        this.setState({
            visible: false,
        });
    };

    addSkill = () => {
        if (!this.validSkill()) {
            return;
        };
        this.props.addSkill({ id: this.props.skillDraft.id, name: this.props.skillDraft.name, level: this.state.skillLevel });
        this.onClose();
        this.props.clearSkillDraft();
        this.setState({ skillLevel: 2 });
    }

    validSkill = () => {
        if (!this.props.skillDraft.name.match(/\S/g)) {
            message.error('スキル名を入力してください', 5)
            return false;
        }

        if (isAbuseWord(this.props.skillDraft.name)) {
            message.error('このスキル名は追加できません', 5)
            return false;
        }

        if (this.props.skills.length >= 3) {
            message.error('追加できるスキルは3つまでです', 5)
            return false;
        }

        let exists = false;
        for (let i = 0; i < this.props.skills.length; i++) {
            if (this.props.skills[i].id === this.props.skillDraft.id) {
                exists = true;
            }
        }

        if (exists) {
            message.error('選択されたスキルはすでに含まれています', 5)
            return false;
        }

        if (this.state.skillLevel < 1 || this.state.skillLevel > 3) {
            message.error('スキルレベルを選択してください', 5);
            return false;
        }

        return true;
    }

    render() {
        return (
            <>
                <div style={{ marginTop: '10px', fontSize: '16px' }}>
                    <List
                        bordered
                        dataSource={this.props.skills}
                        itemLayout="horizontal"
                        locale={{
                            emptyText: (
                                <a onClick={this.showDrawer}><Icon type="plus-circle" style={{ marginRight: '8px' }} />追加する</a>
                                // <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="スキルが設定されていません">
                                //     <Button onClick={this.showDrawer}><Icon type="plus" />追加する</Button>
                                // </Empty>
                            )
                        }}
                        renderItem={s => (
                            <List.Item
                                actions={[
                                    <Rate value={s.level} count={3} disabled />
                                    , <a key="list-delete" onClick={() => this.props.deleteSkill(s.id)}>削除</a>
                                ]}
                            >
                                {s.name}
                            </List.Item>
                        )}
                    />
                </div>
                {this.props.skills.length > 0 &&
                    <Button type="dashed" style={{ width: '100%', marginTop: '10px' }} onClick={this.showDrawer}><Icon type="plus-circle" style={{ marginRight: '8px' }} />追加する</Button>
                }
                <Modal
                    title="スキルを追加する"
                    width={450}
                    cancelText="キャンセル"
                    okText="追加する"
                    onCancel={this.onClose}
                    onOk={this.addSkill}
                    visible={this.state.visible}
                >
                    <p style={{ fontWeight: '500', fontSize: '16px' }}>スキル選択: </p>
                    <SkillSelect />
                    <p style={{ fontWeight: '500', fontSize: '16px', marginTop: '16px' }}>レベル: </p>
                    <div>
                        <Radio.Group
                            value={this.state.skillLevel}
                            onChange={(e) => this.setState({ skillLevel: e.target.value })}
                            defaultValue={2}
                        >
                            <Radio.Button value={1}><Badge color={presetPalettes.geekblue[3]} text="初級" /></Radio.Button>
                            <Radio.Button value={2}><Badge color={presetPalettes.geekblue[5]} text="中級" /></Radio.Button>
                            <Radio.Button value={3}><Badge color={presetPalettes.geekblue[7]} text="上級" /></Radio.Button>
                        </Radio.Group>
                    </div>
                </Modal>
            </>
        )
    }
}

const mapStateToProps = state => ({
    skills: state.articleEdit.skills,
    skillDraft: state.articleEdit.skillDraft,
})

const mapDispatchToProps = dispatch => ({
    addSkill: (skill) => dispatch(addSkill(skill)),
    deleteSkill: (id) => dispatch(deleteSkill(id)),
    clearSkillDraft: () => dispatch(clearSkillDraft()),
})

const ArticleSkillForm = connect(mapStateToProps, mapDispatchToProps)(SkillForm)
export default ArticleSkillForm