import React from "react"
import { Icon } from 'antd';
import { Link } from "gatsby";

const VerticalFooter = () => {
    var now = new Date();
    var thisYear = now.getFullYear();
    return (
        <div style={{ padding: '20px', textAlign: 'center' }}>
            <div style={{ marginBottom: '12px' }}>
                <Link to='/terms'>
                    <span style={{ color: 'rgba(0,0,0,.65)', marginRight: '20px' }}>利用規約</span>
                </Link>
                <Link to='/terms'>
                    <span style={{ color: 'rgba(0,0,0,.65)', marginRight: '20px' }}>プライバシーポリシー</span>
                </Link>
                <a href="/#"><Icon type='twitter' style={{ color: 'rgba(0,0,0,.65)', marginRight: '8px' }} /></a>
            </div>
            <div>Copyright <Icon type="copyright" />{thisYear} wever Inc.</div>
        </div>
    )
}
export default VerticalFooter;