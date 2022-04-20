import { Formik } from 'formik'
import React from 'react'
import styled from 'styled-components'
import MainPageFilterForm from './MainPageFilterForm'

const MainPageFilter: React.FC<MainPageFilterPropsType> = (props) => {

    const handleSubmit = () => {
        
    }
    
    console.log('MainPageFilter', props);
    
    return (
        <>
            {/* MainPageFilter   */}
            <Formik
                initialValues={{}}
                // initialValues={initialFormValues}
                onSubmit={handleSubmit}
                enableReinitialize={true}
                // initialStatus={props.selectTargetApp}
            >
                {MainPageFilterForm}
            </Formik>
        </>
    )
}

export default MainPageFilter

type MainPageFilterPropsType = {

}