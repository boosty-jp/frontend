import React from 'react'
import LogoImage from 'images/logo_notext.png'
import { Link } from 'gatsby'

const NoTextLogo = () => {
    return (
        <Link to="/">
            < img alt="ロゴ" src={LogoImage} style={{ width: "40px", marginBottom: '0px' }} />
        </Link>
    )
}

export default NoTextLogo