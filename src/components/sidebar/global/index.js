import React from "react"
import FirstSideBar from "components/lib/navigation/sidebar/first-bar";
import SimpleLogoImage from "components/image/logo/simple";
import GlobalUpperItem from "components/sidebar/global/upper-items";
import GlobalLowerItems from "components/sidebar/global/lower-items";
import AccountDropdown from "components/lib/navigation/dropdown/account-dropdown";
import AccountDropdownMenu from "components/sidebar/global/account-dropdown-menu";

const GlobalFirstSideBar = ({ activeKey }) => {
    return (
        <FirstSideBar
            logo={<SimpleLogoImage centered={true} />}
            upperItems={<GlobalUpperItem activeKey={activeKey} />}
            lowerItems={<GlobalLowerItems />}
            account={<AccountDropdown menu={<AccountDropdownMenu />} />}
        />
    )
}

export default GlobalFirstSideBar