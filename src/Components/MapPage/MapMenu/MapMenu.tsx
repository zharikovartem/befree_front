import React, { useEffect, useState } from 'react'
import { MapMenuPropsType } from './MapMenuContainer'
import { Menu } from 'antd';
import { PieChartOutlined } from '@ant-design/icons';
import { url } from '../../../Api/API';

const MapMenu: React.FC<MapMenuPropsType> = (props) => {

    const [collapsed, setCollapsed] = useState<boolean>(true)

    useEffect(() => {
        props.getActiveCategoryes()
    }, []);

    console.log(props);


    return (
        <div
            style={{
                // width: 60, 
                zIndex: 100,
                marginTop: 'auto',
                marginBottom: 'auto',
            }}
        >
            <Menu
                defaultSelectedKeys={['1']}
                defaultOpenKeys={['sub1']}
                mode="inline"
                // theme="dark"
                inlineCollapsed={collapsed}
            >
                {/* <Menu.Item
                    className='mb-4'
                    key="1"
                    icon={<PieChartOutlined style={{fontSize: 24}}/>}
                    onClick={props.showDrawer}
                >
                    All
                </Menu.Item> */}



                {props.categoryesList && props.categoryesList.map((category) => {
                    return (
                        <Menu.Item
                            className='mb-2'
                            key={'2-' + category.id}
                            icon={<img style={{width: 24, height: 24}} src={url + category.logoFileName} />}
                            onClick={props.showDrawer}
                        >
                            {category.title}
                        </Menu.Item>
                    )
                })}

                <Menu.Item
                    key="3"
                    icon={<img src={url+'/aside-panel-icon-8.svg'} />}
                    onClick={props.showDrawer}
                    className='mb-4'
                >
                    ATM
                </Menu.Item>
                {/* <Menu.Item
                    key="4"
                    icon={<PieChartOutlined />}
                    onClick={props.showDrawer}
                >
                    Pin
                </Menu.Item>
                <Menu.Item
                    key="5"
                    icon={<PieChartOutlined />}
                    onClick={props.showDrawer}
                >
                    Like
                </Menu.Item> */}
            </Menu>

        </div>
    )
}

export default MapMenu