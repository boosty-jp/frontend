import React from "react"
import { Affix } from 'antd';
import style from "styles/lib/navigation/sidebar/multiple-bar.mod.scss";

const MultipleSidebar = ({ firstBar, secondBar }) => {
    return (
        <Affix offsetTop={0}>
            <div className={style.grid}>
                <div className={style.firstBar}>{firstBar}</div>
                <div className={style.secondBar}>{secondBar}</div>
            </div>
        </Affix>
    )
}

export default MultipleSidebar