import { Col, Input, Row, InputNumber, Select, Space, Button } from 'antd'
import { Field } from 'formik'
import React from 'react'

const FormRow: React.FC<FormRowPropsType> = (props) => {

    const getComponent = () => {
        switch (props.type) {
            case 'input':
                return Input

            case 'inputNumber':
                return InputNumber
        
            case 'select':
                return Select

            default:
                break;
        }
    }

    return (
        <Row>
            <Col xs={24} span={12}>
                {props.label}:
            </Col>
            <Col xs={props.isButton ? 18 : 24} span={12}>
            <Space direction="vertical" style={{ width: '100%' }}>
                <Field
                    component={getComponent()}
                    name={props.name}
                    placeholder={props.placeholder ? props.placeholder : null}
                    type="text"
                    label={props.label}
                    // validate={validateRequired}
                    submitCount={props.submitCount}
                    hasFeedback
                    styled={{ with: '100%' }}
                >
                    {props.type === 'select' ?
                        props.selectOptions ? props.selectOptions : <option value="">Sity list</option>
                        : 
                        null
                    }
                </Field>
                </Space>
            </Col>
            {props.isButton && 
                <Col xs={4}>
                    <Button type='primary'>Add</Button>
                </Col>
            }
        </Row>
    )
}

export default FormRow

type FormRowPropsType = {
    label: string
    name: string
    placeholder?: string
    type: 'input' | 'inputNumber' | 'select' | 'switch' | 'textarea'
    submitCount?: any
    isButton?: boolean
    selectOptions?: any[]
}