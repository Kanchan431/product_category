import React, { Component } from 'react';
import axios from 'axios';
import { Table, Input, Popconfirm, message, Button, Modal, Form, Spin } from 'antd';
import 'antd/dist/antd.css';

class CategoryList extends Component {
    constructor(props) {
        super(props);
        this.categoryList = this.categoryList.bind(this);

        this.state = {
            product_id: null,
            category_id: null,
            isModalVisible: false,
            isEdit: false,
            exercises: [],
            total: 0,
            category: [],
            category_by_id: {},
            pagination: {
                size: 10,
                page: 0,
            },
        };
    }

    componentDidMount() {
        console.log('componentDidMount');
        axios.post('http://localhost:4444/api/v1/ecomm/getcategory', this.state.pagination)
            .then((res) => {
                this.setState({
                    category: res.data.data,
                    total: res.data.meta[0].total
                });
            })
            .catch((err) => console.log(err));
    }

    onChange = (pagination) => {
        console.log('pagination', pagination);
        const pager = { ...this.state.pagination }; //eslint-disable-line
        pager.page = pagination.current - 1;
        pager.size = 10;
        this.setState({ pagination: pager });
        console.log('pager', pager);
        console.log('state pagination', this.state.pagination);
        axios.post('http://localhost:4444/api/v1/ecomm/getcategory', pager)
            .then((res) => {
                this.setState({
                    category: res.data.data,
                });
            })
            .catch((err) => console.log(err));
    }

    categoryList = () => {
        return this.state.category.map((list) => {
            return list
        })
    }

    confirm = (e) => {
        console.log(e);
        axios.post('http://localhost:4444/api/v1/ecomm/deletecategory', { category_id: this.state.category_id })
            .then(del => {
                if (del.data.msg == "Product exist for this Category!") {
                    message.success('Product exist for this Category!!');
                }
                axios.post('http://localhost:4444/api/v1/ecomm/getcategory', this.state.pagination)
                    .then((res) => {
                        this.setState({
                            category: res.data.data,
                        });
                    })
                    .catch((err) => console.log(err));
            });

    }

    cancel = (e) => {
        console.log(e);
        message.error('Clicked on No!');
    }

    onClick = (e) => {
        console.log('menu', e);
        this.setState({ category_id: e.key })
    }


    showModal = () => {
        this.setState({ isModalVisible: true });
    };

    handleOk = () => {
        this.setState({ isModalVisible: false });
    };

    handleCancel = () => {
        this.setState({ isModalVisible: false });
    };

    onFinish = (values) => {
        console.log(values);
        let payload = {
            ...values.category
        }
        payload = this.state.isEdit == true ? { ...values.category, category_id: this.state.category_id } : { ...values.category };
        console.log("payload", payload);
        const url = this.state.isEdit == true ? `updateCategory` : `createCategory`;
        axios.post(`http://localhost:4444/api/v1/ecomm/${url}`, payload)
            .then(create => {
                console.log("create", create);
                if (create.data.success == true) {
                    axios.post('http://localhost:4444/api/v1/ecomm/getCategory', this.state.pagination)
                        .then((res) => {
                            this.setState({
                                category: res.data.data,
                            });
                        })
                        .catch((err) => console.log(err));
                    this.setState({ isModalVisible: false, isEdit: false });
                    window.location.reload();
                }
            });
    };

    getbyid = (values) => {
        axios.post('http://localhost:4444/api/v1/ecomm/getCategoryByID', { category_id: values })
            .then((res) => {
                this.setState({
                    category_by_id: res.data.data,
                });
                console.log("category_by_id", this.state.category_by_id);
                if (this.state.isEdit == true) {
                    this.setState({ isModalVisible: true, category_id: values });
                }
            })
            .catch((err) => console.log(err));
    };

    render() {
        const { category_by_id = {}, isEdit, pagination } = this.state;
        const { page } = pagination;
        const columns = [
            {
                title: 'Sr No',
                key: 'index',
                render: (text, record, index) => index + (page * 10) + 1,
            },
            {
                title: 'Category',
                dataIndex: 'category_name',
            },
            {
                title: 'Description',
                dataIndex: 'category_description',
            },
            {
                title: 'Action',
                dataIndex: 'action',
                render: () => {
                    return <div><span
                        style={{ color: "blue" }}
                        onClick={(e) => {
                            this.setState({ isEdit: true });
                            console.log('isedit in pop', this.state.isEdit);
                        }}
                        >Edit</span> | <Popconfirm
                        title="Are you sure to delete this task?"
                        onClick={(e) => {
                            this.setState({ isEdit: false });
                            console.log('click', e)
                            console.log('isedit', this.state.isEdit);
                        }}
                        onConfirm={this.confirm}
                        onCancel={this.cancel}
                        okText="Yes"
                        cancelText="No"
                    >
                            <a href="#">Delete</a>
                        </Popconfirm></div>;
                },
            }
        ];

        const validateMessages = {
            required: '${label} is required!',
            types: {
                number: '${label} is not a valid number!',
            }
        };

        const layout = {
            labelCol: {
                span: 8,
            },
            wrapperCol: {
                span: 16,
            },
        };

        return (
            <>
                {(this.state.category.length != 0) ?
                    <div>

                        <div>
                            <Button type="primary" onClick={this.showModal}>
                                Add Category
                            </Button>
                        </div>
                        <Modal title="Basic Modal" visible={this.state.isModalVisible} onOk={this.handleOk} onCancel={this.handleCancel} footer={null} >
                            <div>
                                <Form {...layout} name="nest-messages" onFinish={this.onFinish} validateMessages={validateMessages} >
                                    <Form.Item
                                        name={['category', 'category_name']}
                                        label="Category Name"
                                        initialValue={category_by_id.category_name}
                                        rules={[
                                            {
                                                required: true,
                                            },
                                        ]}
                                    >
                                        <Input />
                                    </Form.Item>
                                    <Form.Item
                                        name={['category', 'category_description']}
                                        label="Description"
                                        initialValue={category_by_id.category_description}
                                    >
                                        <Input />
                                    </Form.Item>
                                    <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
                                        <Button type="primary" htmlType="submit" >
                                            Submit
                                        </Button>
                                    </Form.Item>
                                </Form>
                            </div>
                        </Modal>
                        <Table columns={columns}
                            dataSource={this.categoryList()}
                            onChange={this.onChange}
                            pagination={{ total: this.state.total, pageSize: 10 }}
                            onRow={(record) => {
                                return {
                                    onClick: () => {
                                        console.log("onRow", record);
                                        this.setState({ category_id: record.category_id });
                                        // if (this.state.isEdit == true) {
                                        console.log("edit", this.state.isEdit);
                                        this.getbyid(record.category_id);
                                        // }
                                        console.log("id", this.state.category_id);
                                    },
                                };
                            }}
                        />
                    </div>
                    : <Spin />}

            </>
        )
    }
}

export default CategoryList;
