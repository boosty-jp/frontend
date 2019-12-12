import React from "react"
import { connect } from 'react-redux'
import { Empty, notification, Drawer, Icon, Button, Rate, List } from 'antd';
import SkillSelect from "components/search/skill-form";
import { addSkill, deleteSkill, clearSkillDraft } from 'modules/article/edit'

const rateDescription = ['初級', '中級', '上級'];
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
            notification['error']({
                message: '追加に失敗しました',
                description:
                    'スキル名を入力してください',
            });
            return false;
        }

        if (this.props.skills.length >= 3) {
            notification['error']({
                message: '追加に失敗しました',
                description:
                    '追加できるスキルは3つまでです',
            });
            return false;
        }

        let exists = false;
        for (let i = 0; i < this.props.skills.length; i++) {
            if (this.props.skills[i].id === this.props.skillDraft.id) {
                exists = true;
            }
        }

        if (exists) {
            notification['error']({
                message: '追加に失敗しました',
                description:
                    '選択されたスキルはすでに含まれています',
            });
            return false;
        }

        if (this.state.skillLevel < 1 || this.state.skillLevel > 3) {
            notification['error']({
                message: '追加に失敗しました',
                description:
                    'スキルレベルを選択してください',
            });
            return false;
        }

        return true;
    }

    render() {
        return (
            <>
                <p style={{ fontWeight: '400', fontSize: '16px', margin: '0px' }}>スキル: </p>
                <div style={{ marginTop: '10px', fontSize: '16px' }}>
                    <List
                        bordered
                        dataSource={this.props.skills}
                        itemLayout="horizontal"
                        locale={{
                            emptyText: (
                                <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="スキルが設定されていません">
                                    <Button onClick={this.showDrawer}><Icon type="plus" />追加する</Button>
                                </Empty>
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
                    <Button type="dashed" style={{ width: '100%', marginTop: '10px' }} onClick={this.showDrawer}><Icon type="plus" />追加する</Button>
                }
                <Drawer
                    title="スキルを追加する"
                    width={400}
                    onClose={this.onClose}
                    visible={this.state.visible}
                    bodyStyle={{ paddingBottom: 80 }}
                >
                    <p style={{ fontWeight: '500', fontSize: '16px' }}>スキル選択: </p>
                    <SkillSelect />
                    <p style={{ fontWeight: '500', fontSize: '16px', marginTop: '16px' }}>レベル: </p>
                    <div>
                        <Rate
                            tooltips={rateDescription}
                            value={this.state.skillLevel}
                            allowClear={false}
                            onChange={(level) => this.setState({ skillLevel: level })}
                            count={3}
                        />
                        {this.state.skillLevel ?
                            <span className="ant-rate-text">{rateDescription[this.state.skillLevel - 1]}</span>
                            :
                            ''
                        }
                    </div>
                    <div
                        style={{
                            position: 'absolute',
                            right: 0,
                            bottom: 0,
                            width: '100%',
                            borderTop: '1px solid #e9e9e9',
                            padding: '10px 16px',
                            background: '#fff',
                            textAlign: 'right',
                        }}
                    >
                        <Button onClick={this.onClose} style={{ marginRight: 8 }}>キャンセル</Button>
                        <Button onClick={this.addSkill} type="primary">追加する</Button>
                    </div>
                </Drawer>
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