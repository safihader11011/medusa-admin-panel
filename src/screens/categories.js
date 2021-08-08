import React, {useEffect, useState} from 'react';
import Sidebar from "../components/sidebar";
import Header from "../components/header";

import Table from "../components/partials/react_table";
import { getAllCategories } from '../shared/services/categories';

const Categories = (props) => {

    const [categoriesData, setCategoriesData] = useState(null);

    const columns = [
        {
            Header: 'S.No',
            accessor: 'no', // accessor is the "key" in the data
        },
        {
            Header: 'Category',
            accessor: 'category',
        },
        {
            Header: 'Sub Category',
            accessor: 'subcategory',
        },
        {
            Header: 'Action',
            accessor: 'action',
            Cell: (props) => {
                return (
                    ''
                )
            },
        },
    ]

    let getData = async () => {
        let res = await getAllCategories();

        if(!res.error){
            let data, data1 = [];

            data = res.map((category, index) => {
                return [
                    {
                        no: index + 1,
                        category: category._id? category._id.name : 'Others',
                        subcategory: '-'
                    },
                    ...category.subcategories.map((subcategory, index1) => {
                        return {
                            no: index + 1 + '.' + index1,
                            category: category._id? category._id.name : 'Others',
                            subcategory: subcategory.name
                        }
                    })
                ]
            });

            data.forEach(d => {
                data1 = data1.concat(d);
            })
            setCategoriesData(data1);
        }
    }

    useEffect(()=>{
        getData();
    }, [])

    return (
        <div>
            <Sidebar />
            <Header title="Categories" />
            <div className="main">
                <div class="d-flex p-2 bd-highlight justify-content-between align-items-center">
                    <div style={{ fontSize: "24px", fontWeight: '600' }}>Categories List</div>
                    <div><i class="fa fa-plus-circle" style={{ fontSize: '25px', color: '#0052bb', cursor: 'pointer' }}></i></div>
                </div>
                {categoriesData?
                    <Table
                        data={categoriesData}
                        columns={columns}
                    />
                    :
                    null
                }
            </div>
        </div>
    );
}

export default Categories;