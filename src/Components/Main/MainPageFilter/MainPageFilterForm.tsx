import { Col, Row } from 'antd'
import { Field, Form, FormikProps } from 'formik'
import React from 'react'
import GreenButton from '../../../Elements/Buttons/GreenButton/GreenButtonContainer'
import SearchInput from '../../../Elements/Inputs/SearchInput/SearchInputContainer'

export type MainPageFilterType = {

}

const MainPageFilterForm: React.FC<FormikProps<MainPageFilterType>> = (props) => {
    return (
        <Form
            className="form-container"
            onSubmit={props.handleSubmit}
        >
            <Row>
                <Col span={19} offset = {1}>
                    <Field
                        component={SearchInput}
                        name="index_filter[name]"
                        placeholder="Name of product, store, product category, brand..."
                        type="text"
                        label="Variant Name"
                        // validate={validateRequired}
                        submitCount={props.submitCount}
                        hasFeedback
                        styled={{with: '100%'}}
                    />
                </Col>
                <Col span={4}>
                    <GreenButton 
                        value='SEARCH'
                    />
                </Col>
            </Row>
            {/* <Field
                component={SearchInput}
                name="variantName"
                type="text"
                label="Variant Name"
                // validate={validateRequired}
                submitCount={props.submitCount}
                hasFeedback
            /> */}
        </Form>
    )
}

export default MainPageFilterForm

type MainPageFilterFormPropsType = {

}