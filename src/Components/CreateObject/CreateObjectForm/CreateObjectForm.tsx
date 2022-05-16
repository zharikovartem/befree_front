import { Button, Col, Input, Row, Select, Switch } from 'antd'
import TextArea from 'antd/lib/input/TextArea'
import { Field, Form, FormikProps } from 'formik'
import React from 'react'
import AddressForm from './AddressForm'

const CreateObjectForm: React.FC<FormikProps<CreateObjectFormPropsType>> = (props) => {

    return (
        <Form
            className="form-container"
            onSubmit={props.handleSubmit}
        >
            <Row>
                <Col xs={24} span={12}>
                    Brend
                </Col>
                <Col xs={18} span={12}>
                    <Field
                        component={Select}
                        name="Brend"
                        placeholder="Please, choise the brend"
                        // type="text"
                        label="Variant Name"
                        // validate={validateRequired}
                        submitCount={props.submitCount}
                        hasFeedback
                        styled={{ with: '100%' }}
                    > 
                        <option value="">Brend list</option>
                    </Field>
                </Col>
                <Col xs={4}>
                    <Button type='primary'>Add</Button>
                </Col>
            </Row>

            {/* <Row>
                <Col xs={24} span={12}>
                    Brend object name
                </Col>
                <Col xs={24} span={12}>
                    <Field
                        component={Input}
                        name="Brend"
                        placeholder="Please, choise the brend"
                        type="text"
                        label="Variant Name"
                        // validate={validateRequired}
                        submitCount={props.submitCount}
                        hasFeedback
                        styled={{ with: '100%' }}
                    /> 
                </Col>
            </Row> */}

            <Row>
                <Col xs={24} span={12}>
                    Brend object descriptions
                </Col>
                <Col xs={24} span={12}>
                    <Field
                        component={TextArea}
                        name="additionalInformation"
                        placeholder="Please, choise the brend"
                        type="text"
                        label="Variant Name"
                        // validate={validateRequired}
                        submitCount={props.submitCount}
                        hasFeedback
                        styled={{ with: '100%' }}
                    /> 
                </Col>
            </Row>

            <Row>
                <Col xs={24} span={12}>
                    Is active
                </Col>
                <Col xs={24} span={12}>
                    <Field
                        component={Switch}
                        name="additionalInformation"
                        placeholder="Please, choise the brend"
                        label="Variant Name"
                        // validate={validateRequired}
                        submitCount={props.submitCount}
                        hasFeedback
                        styled={{ with: '100%' }}
                    /> 
                </Col>
            </Row>

            <AddressForm submitCount={props.submitCount}/>

            <Row>
                <Col xs={24} span={12}>
                    Email
                </Col>
                <Col xs={24} span={12}>
                    <Field
                        component={Input}
                        name="Brend"
                        placeholder="Please, choise the brend"
                        type="text"
                        label="Variant Name"
                        // validate={validateRequired}
                        submitCount={props.submitCount}
                        hasFeedback
                        styled={{ with: '100%' }}
                    /> 
                </Col>
            </Row>

        </Form>
    )
}

export default CreateObjectForm

type CreateObjectFormPropsType = {

}