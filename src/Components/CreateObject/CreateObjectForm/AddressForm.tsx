import { Button, Collapse } from 'antd'
import React from 'react'
import FormRow from '../../../Utils/FormRow/FormRow'

const { Panel } = Collapse

const AddressForm: React.FC<AddressFormPropsType> = (props) => {

    const callback = (key: string | string[]) => {

    }

    return (
        <Collapse defaultActiveKey={[]} onChange={callback} ghost>
            <Panel header="Address data" key="1">
                <FormRow
                    label='Street'
                    name='street'
                    type='select'
                    placeholder='Please, select sity'
                    submitCount={props.submitCount}
                />
                <FormRow
                    label='Street'
                    name='street'
                    type='input'
                    submitCount={props.submitCount}
                />
                <FormRow
                    label='Building'
                    name='building'
                    type='input'
                    submitCount={props.submitCount}
                />
                <FormRow
                    label='Apartment'
                    name='apartment'
                    type='input'
                    submitCount={props.submitCount}
                />

                <Button className='m-2' type='primary'>Get coordinates from address</Button>

                <FormRow
                    label='Latitude'
                    name='latitude'
                    type='inputNumber'
                    submitCount={props.submitCount}
                />
                <FormRow
                    label='Latitude'
                    name='latitude'
                    type='inputNumber'
                    submitCount={props.submitCount}
                />

                <Button className='m-2' type='primary'>Get address from coordinates</Button>
            </Panel>
        </Collapse>
    )
}

export default AddressForm

type AddressFormPropsType = {
    submitCount?: any
}