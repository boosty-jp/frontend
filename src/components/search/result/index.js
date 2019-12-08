import React from "react"
import { Drawer, Tabs, Icon, Radio } from 'antd';
import CurriculumSearchResults from "./course";
import ArticleSearchResults from "./articles";

const { TabPane } = Tabs;

const listData = [];
for (let i = 0; i < 50; i++) {
    listData.push({
        href: 'http://ant.design',
        title: `ant design part para para i pasdp pi aifa papa ${i}`,
        user: {
            image: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
            name: 'tomokiya',
        },
        image: 'http://www.13and9design.com/wp-content/uploads/150324_139forWeverDucre_EUROLUCE_fb_titelbild.jpg',
        tags: [{ id: 1, title: 'ruby' }, { id: 2, title: 'gatsby' }]
    });
}

class SearchResults extends React.Component {
    state = { visible: false, sortValue: "relative" };

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

    onChange = e => {
        console.log('radio checked', e.target.value);
        this.setState({
            sortValue: e.target.value,
        });
    };

    render() {
        const radioStyle = {
            display: 'block',
            height: '30px',
            lineHeight: '30px',
        };

        return (
            <div style={{ padding: '16px 20px 30px 20px', backgroundColor: 'white' }}>
                <Tabs tabBarExtraContent={
                    <Icon type="setting" style={{ fontSize: '20px', marginRight: '4px' }} onClick={this.showDrawer} />
                }>
                    <TabPane tab="コース" key="1">
                        <CurriculumSearchResults />
                    </TabPane>
                    <TabPane tab="記事" key="2">
                        <ArticleSearchResults />
                    </TabPane>
                </Tabs>
                <Drawer
                    title="検索オプション"
                    placement="right"
                    closable={true}
                    onClose={this.onClose}
                    visible={this.state.visible}
                >
                    <Radio.Group onChange={this.onChange} value={this.state.sortValue}>
                        <Radio style={radioStyle} value="relative">関連度が高い順</Radio>
                        <Radio style={radioStyle} value="like">いいね数が高い順</Radio>
                        <Radio style={radioStyle} value="learned">学習された数が多い順</Radio>
                    </Radio.Group>
                </Drawer>
            </div>
        )
    }
}


export default SearchResults