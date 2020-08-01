import React from "react"
import { Divider } from 'antd';
import style from "styles/lib/navigation/sidebar/first-bar.mod.scss";

const FirstSideBar = ({ logo, upperItems, lowerItems, account }) => {
    return (
        <div className={style.firstBar}>
            <div className={style.logo}>
                {logo}
            </div>
            {upperItems}
            <div className={style.lowerItems}>
                <Divider className={style.divider} />
                {lowerItems}
                <div className={style.accountDropdown}>
                    {account}
                </div>
            </div>
        </div>
    )
}

export default FirstSideBar;