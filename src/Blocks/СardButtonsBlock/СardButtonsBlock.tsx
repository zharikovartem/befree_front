import { Button } from 'antd'
import React from 'react'
import styled from 'styled-components'
import { url } from '../../Api/API'

export const СardButtonsDiv = styled.div`
    background-color: #ecebeb;
    padding: 20px;
    border-radius: 10px;
`

// export const СardButtonsDiv = styled.div.attrs(props => ({
//     backgroundColor: '#ecebeb',
//     padding: 20,
//     borderRadius: 10
// }))

const СardButtonsBlock: React.FC<СardButtonsBlockPropsType> = (props) => {

    return (
        <СardButtonsDiv>
            <Button
                onClick={() => { props.onGetGoogleLink(props.target) }}
                className='mx-2'
                type="dashed"
                shape="circle"
                icon={<img src={url + "ico_navi/svg/link.svg"} alt="" />}
                size="large"
            />
            <Button
                onClick={() => { props.onNavi(props.target) }}
                className='mx-2' 
                type="ghost" 
                shape="circle" 
                icon={<img src={url + "ico_navi/123/to_map.svg"} alt="" />} 
                size="large" 
            />
            { props.target.brandInfo && props.target.brandInfo.slug &&
                <Button
                    // onClick={() => { window.location.reload('https://befree.com/brand/') }}
                    onClick={() => { window.location.replace('https://befree.com/brand/'+props.target.brandInfo.slug) }}
                    className='mx-2' 
                    type="ghost" 
                    shape="circle" 
                    icon={<img src={url + "ico_navi/123/2_eye.svg"} alt="" />} 
                    size="large" 
                />
            }
        </СardButtonsDiv>
    )
}

export default СardButtonsBlock

type СardButtonsBlockPropsType = {
    target: any
    onGetGoogleLink: (brendObject: any) => void
    onNavi: (brendObject: any) => void
}