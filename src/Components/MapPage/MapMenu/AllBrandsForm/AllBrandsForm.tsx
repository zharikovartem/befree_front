import React, { useEffect, useState } from 'react'
import { url } from '../../../../Api/API'
import { AllBrandsFormPropsType } from './AllBrandsFormContainer'
import { Checkbox, Col, List, Row, Typography } from 'antd';
import { categoryTpe } from '../../../../Redux/categoryReducer';

const setSelectedCategoryIdsInit = (categoryesList: any[] | null, categoryFilter: number[]) => {
    if(categoryFilter && categoryFilter.length !== 0) {
        return categoryFilter
    } else {
        if (categoryesList) {
            return  categoryesList.length !== 0 ? categoryesList.map( (cat) => cat.id) : []
        }
        return []
    }
}

const AllBrandsForm: React.FC<AllBrandsFormPropsType> = (props) => {

    const [selectedCategoryIds, setSelectedCategoryIds] = useState<number[]>(setSelectedCategoryIdsInit(props.categoryesList, props.categoryFilter))

    useEffect(() => {
        props.changeCategoryFilter(selectedCategoryIds)
        props.onReload()
    }, [selectedCategoryIds]);

    console.log('AllBrandsForm', props);
    

    const onCheckboxChange = (ev: any) => {
        if(ev.target.checked) {
            setSelectedCategoryIds([...selectedCategoryIds, ev.target.value])
        } else {
            setSelectedCategoryIds([...selectedCategoryIds.filter(i=>i !== ev.target.value)])
        }
        
    }

    return (
        <>
            <h3>All categories</h3>

            {props.categoryesList && props.categoryesList.map((category) => {
                return (
                    <FilterRow 
                        onCheckboxChange={onCheckboxChange}
                        category={category}
                        // isActive={selectedCategoryIds.length === 0 ? true : selectedCategoryIds.includes( category.id )}
                        isActive={selectedCategoryIds.includes( category.id )}
                    />
                )
            })}

            {/* <FilterRow 
                onCheckboxChange={onCheckboxChange}
                category={{
                    id: 0,
                    logoFileName: url+'/aside-panel-icon-8.svg',
                    title: 'ATM'
                }}
                isActive={true}
            /> */}
        </>
    )
}

export default AllBrandsForm

type FilterRowPropsType = {
    category: categoryTpe
    onCheckboxChange: (ev: any) => void
    isActive: boolean
}

const FilterRow: React.FC<FilterRowPropsType> = (props) => {
    return (
        <Row>
            <Col span={4}>
                {
                    props.category.title === 'ATM' ? 
                    <img src={props.category.logoFileName} />
                    : 
                    <img style={{width: 24, height: 24}} src={url + props.category.logoFileName} />
                }
                
            </Col>
            <Col className="d-flex flex-wrap align-content-start" span={16}>
                <h5>{props.category.title}</h5>
            </Col>
            <Col className="d-flex flex-wrap align-content-start" span={4}>
                <Checkbox value={props.category.id} onChange={props.onCheckboxChange} checked={props.isActive}></Checkbox>
            </Col>
        </Row>
    )
}