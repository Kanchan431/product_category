import React, { Component } from 'react';
import axios from 'axios';
import { Table, Input, Select, Popconfirm, message, Button, Modal, Form, InputNumber, Spin } from 'antd';
import 'antd/dist/antd.css';
const { Option } = Select;

class ProductsList extends Component {
    constructor(props) {
        super(props);
        this.exerciseList = this.exerciseList.bind(this);

        this.state = {
            product_id: null,
            category_id: null,
            isModalVisible: false,
            isEdit: false,
            products: [],
            total: 0,
            category: [],
            product_by_id: {},
            pagination: {
                size: 10,
                page: 0,
            },
        };
    }

    componentDidMount() {
        console.log('componentDidMount');
        setTimeout(() => {
            axios.post('http://localhost:4444/api/v1/ecomm/getProducts', this.state.pagination)
                .then((res) => {
                    this.setState({
                        products: res.data.data,
                        total: res.data.meta[0].total
                    });
                    this.getcategory();
                    console.log('total', this.state.total);
                    console.log('res', res.data);
                })
                .catch((err) => console.log(err));
        }, 200);
    }

    onChange = (pagination) => {
        console.log('on change pagination', pagination);
        const pager = { ...this.state.pagination }; //eslint-disable-line
        pager.page = pagination.current - 1;
        pager.size = 10;
        this.setState({ pagination: pager });
        console.log('pager', pager);
        console.log('state pagination', this.state.pagination);
        axios.post('http://localhost:4444/api/v1/ecomm/getProducts', pager)
            .then((res) => {
                this.setState({
                    products: res.data.data,
                });
            })
            .catch((err) => console.log(err));
    }

    exerciseList = () => {
        return this.state.products.map((currentExercise) => {
            return currentExercise
        })
    }

    getcategory = () => {
        axios.post('http://localhost:4444/api/v1/ecomm/getcategory', { page: 0, size: 500 })
            .then((res) => {
                this.setState({
                    category: res.data.data,
                });
                console.log("category", res.data.data);
                console.log("state", this.state.category[0].category_name);
            })
            .catch((err) => console.log(err));
    }

    confirm = (e) => {
        console.log(e);
        message.success('Product Deleted!');
        axios.post('http://localhost:4444/api/v1/ecomm/deleteProduct', { product_id: this.state.product_id })
            .then(del => {
                axios.post('http://localhost:4444/api/v1/ecomm/getProducts', this.state.pagination)
                    .then((res) => {
                        this.setState({
                            products: res.data.data,
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
            ...values.product
        }
        payload = this.state.isEdit == true ? { ...values.product, product_id: this.state.product_id } : { ...values.product };
        console.log("payload", payload);
        const url = this.state.isEdit == true ? `updateProduct` : `createProduct`;
        axios.post(`http://localhost:4444/api/v1/ecomm/${url}`, payload)
            .then(create => {
                console.log("create", create);
                if (create.data.success == true) {
                    axios.post('http://localhost:4444/api/v1/ecomm/getProducts', this.state.pagination)
                        .then((res) => {
                            this.setState({
                                products: res.data.data,
                            });
                        })
                        .catch((err) => console.log(err));
                    this.setState({ isModalVisible: false, isEdit: false });
                    window.location.reload();
                }
            });
    };

    getbyid = (values) => {
        axios.post('http://localhost:4444/api/v1/ecomm/getProductByID', { product_id: values })
            .then((res) => {
                this.setState({
                    product_by_id: res.data.data,
                });
                console.log("product_by_id", this.state.product_by_id);
                if (this.state.isEdit == true) {
                    this.setState({ isModalVisible: true, product_id: values });
                }
            })
            .catch((err) => console.log(err));
    };

    render() {
        const { product_by_id = {}, isEdit, pagination } = this.state;
        const { page } = pagination;
        const columns = [
            {
                title: 'Sr No',
                key: 'index',
                render: (text, record, index) => index + (page * 10) + 1,
            },
            {
                title: 'Product',
                dataIndex: 'product_name',
            },
            {
                title: 'Category',
                dataIndex: 'category_name',
            },
            {
                title: 'Stock',
                dataIndex: 'stock',
            },
            {
                title: 'Price',
                dataIndex: 'price',
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
                            <span style={{ color: "red" }}
                            >Delete</span>
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
                {(this.state.products.length != 0) ?
                    <div>
                        <div>
                            <Button type="primary" onClick={this.showModal}>
                                Add Product
                            </Button>
                        </div>
                        <Modal title="Basic Modal" visible={this.state.isModalVisible} onOk={this.handleOk} onCancel={this.handleCancel} footer={null} >
                            <div>
                                <Form {...layout} name="nest-messages" onFinish={this.onFinish} validateMessages={validateMessages}
                                >
                                    <Form.Item
                                        name={['product', 'product_name']}
                                        label="Product Name"
                                        initialValue={product_by_id.product_name}
                                        rules={[
                                            {
                                                required: true,
                                            },
                                        ]}
                                    >
                                        <Input />
                                    </Form.Item>
                                    <Form.Item
                                        name={['product', 'product_description']}
                                        label="Description"
                                        initialValue={product_by_id.product_description}
                                    >
                                        <Input />
                                    </Form.Item>
                                    <Form.Item
                                        name={['product', 'stock']}
                                        label="Stock"
                                        initialValue={product_by_id.stock}
                                        rules={[
                                            {
                                                type: 'number',
                                                required: true,
                                            },
                                        ]}
                                    >
                                        <InputNumber />
                                    </Form.Item>
                                    <Form.Item
                                        name={['product', 'price']}
                                        label="Price"
                                        initialValue={product_by_id.price == undefined ? 0 : Number(product_by_id.price).toFixed(2)}
                                        rules={[
                                            {
                                                required: true,
                                            },
                                        ]}
                                    >
                                        <InputNumber />
                                    </Form.Item>
                                    <Form.Item name={['product', 'category_id']} label="Category"
                                        initialValue={product_by_id.category_name}
                                        rules={[
                                            {
                                                required: true,
                                            },
                                        ]}>
                                        <Select onChange={this.onClick} disabled={isEdit == true ? true : false} >
                                            {this.state.category.map((m, i) => {
                                                return <Option value={m.category_id}>{m.category_name}</Option>
                                            })
                                            }
                                        </Select>
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
                            dataSource={this.exerciseList()}
                            onChange={this.onChange}
                            pagination={{ total: this.state.total, pageSize: 10 }}
                            onRow={(record) => {
                                return {
                                    onClick: () => {
                                        console.log("onRow", record);
                                        this.setState({ product_id: record.product_id });
                                        // if (this.state.isEdit == true) {
                                        console.log("edit in table", this.state.isEdit);
                                        this.getbyid(record.product_id);
                                        // }else{
                                        //     this.setState({ isEdit: false });
                                        // }
                                        console.log("id", this.state.product_id);

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


export default ProductsList;


