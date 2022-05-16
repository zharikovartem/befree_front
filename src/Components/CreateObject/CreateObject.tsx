import { Button, Modal } from 'antd'
import { Formik } from 'formik'
import React, { useState } from 'react'
import { CreateObjectPropsType } from './CreateObjectContainer'
import CreateObjectForm from './CreateObjectForm/CreateObjectForm'

const CreateObject: React.FC<CreateObjectPropsType> = (props) => {

    const [isModalVisible, setIsModalVisible] = useState<boolean>(true)

    const showModal = () => {
        setIsModalVisible(true);
    }

    const handleOk = () => {
        setIsModalVisible(false)
    }

    const handleCancel = () => {
        setIsModalVisible(false)
    }

    const handleSubmit = () => {

    }

    return (
        <>
            <Button type="primary" onClick={showModal}>
                Open Modal
            </Button>

            <Modal width={'90%'} title="Create new brend object" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                <Formik
                    initialValues={{}}
                    // initialValues={initialFormValues}
                    onSubmit={handleSubmit}
                    enableReinitialize={true}
                // initialStatus={props.selectTargetApp}
                >
                    {CreateObjectForm}
                </Formik>
            </Modal>
        </>
    )
}

export default CreateObject