import { CloseOutlined } from '@ant-design/icons'
import { Drawer } from 'antd'
import React, { useEffect, useState } from 'react'
import AllBrandsForm from '../../MapMenu/AllBrandsForm/AllBrandsFormContainer'
import BrandsCategoryForm from '../../MapMenu/BrandsCategoryForm/BrandsCategoryFormContainer'

const MapMenuDrower: React.FC<MapMenuDrowerPropsType> = (props) => {

    const [visible, setVisible] = useState<false | string>(props.isDrawerVisible)
    const [draverIndex, setDraverIndex] = useState<string>()

    useEffect(() => {
        setVisible(props.isDrawerVisible)
    }, [props.isDrawerVisible]);

    const onClose = () => {
        console.log('onClose');
        setVisible(false)
        props.getDawerVisible(false)
    }

    // console.log('MapMenuDrower', visible);

    return (
        <Drawer
            // title="Basic Drawer"
            title={<CloseOutlined onClick={onClose} />}
            placement="left"
            closable={false}
            onClose={onClose}
            visible={!!visible}
            getContainer={false}
            style={{ position: 'absolute' }}
        >
            {visible && visible?.split('2-')[1] && // console.log('render BrandsCategoryForm') &&
                <BrandsCategoryForm />
            }
            {visible === '1' && // console.log('render AllBrandsForm') &&
                <AllBrandsForm />
                // <>12456</>
            }
        </Drawer>
    )
}

export default MapMenuDrower

type MapMenuDrowerPropsType = {
    isDrawerVisible: false | string
    getDawerVisible: (isDrawerVisible: false | string) => void
}