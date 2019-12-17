import React from "react"
import { Divider } from 'antd';
import styled from 'styled-components'
import ThirdPartyButtons from "components/auth/third-party-buttons";
import OwnReAuthForm from 'components/auth/reauth/own-reauth-form';

const LoginDivider = styled(Divider)`
  .ant-divider-inner-text {
      fontSize: '14px',
  }
`;

const ReAuthForm = ({ onSuccess }) => {
    return (
        <>
            <OwnReAuthForm onSuccess={() => onSuccess()} />
            <LoginDivider>もしくは</LoginDivider>
            <ThirdPartyButtons />
        </>
    );
}

export default ReAuthForm