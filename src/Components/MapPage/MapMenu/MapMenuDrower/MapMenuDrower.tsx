import { CloseOutlined } from '@ant-design/icons'
import { Drawer } from 'antd'
import React, { useEffect, useState } from 'react'
import { CoordinatesType } from '../../../../Redux/mapReducer'
import { InfoWindowDataType } from '../../GoogleMapsReact/GoogleMap'
import AllBrandsForm from '../AllBrandsForm/AllBrandsFormContainer'
import AtmForm from '../AtmForm/AtmFormContainer'
import BrandsCategoryForm from '../BrandsCategoryForm/BrandsCategoryFormContainer'

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

    return (
        <Drawer
            // title="Basic Drawer"
            title={<CloseOutlined onClick={onClose} />}
            placement="left"
            closable={false}
            onClose={onClose}
            visible={!!visible}
            getContainer={false}
            style={{ position: 'absolute', maxWidth: '400px'}}
            width={'100%'}
            bodyStyle={{padding: 12}}
        >
            {/* {console.log('visible key', visible)} */}
            {visible && visible?.split('2-')[1] && // console.log('render BrandsCategoryForm') &&
                <BrandsCategoryForm 
                    setCenter={props.setCenter}
                    onClose={onClose}
                    setRoute={props.setRoute}
                    myCoords={props.myCoords}
                    getRoutes={props.getRoutes}
                />
            }
            {visible === '1' && // console.log('render AllBrandsForm') &&
                <AllBrandsForm 
                    onReload = {props.onReload}
                />
                // <>12456</>
            }

            {visible === '3' && 
                <AtmForm 
                    setCenter={props.setCenter}
                    onClose={onClose}
                    setRoute={props.setRoute}
                    myCoords={props.myCoords}
                    getRoutes={props.getRoutes}
                />
            }
        </Drawer>
    )
}

export default MapMenuDrower

type MapMenuDrowerPropsType = {
    isDrawerVisible: false | string
    getDawerVisible: (isDrawerVisible: false | string) => void
    setCenter: (coordinates: CoordinatesType, data?: InfoWindowDataType) => void
    setRoute: (coordinates: CoordinatesType) => void
    myCoords: CoordinatesType
    getRoutes: (routesResp: any) => void
    onReload: () => void
}