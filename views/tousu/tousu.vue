<template>
    <div>
        <Row>
            <Col span="24">
                <Card>
                    <Row type="flex" justify="center" align="middle" >
                        <Table :columns="orderColumns" :data="orderData" style="width: 100%;"></Table>
                    </Row>
                </Card>
            </Col>
        </Row>
    </div>
</template>

<script>
export default {
    name: 'mutative-router',
    data () {
        return {
            orderColumns: [
                {
                    type: 'index',
                    title: '序号',
                    width: 80
                },
                {
        title: '时间',
        align: 'center',
        key: 'shijian',
        editable: true
    },
    {
        title: '地点',
        align: 'center',
        key: 'didian',
        editable: true
    },
    {
        title: '投诉来源',
        align: 'center',
        key: 'laiyuan',
        editable: true
    },
    {
        title: '负责单位',
        align: 'center',
        key: 'dangwei'
    },
    {
        title: '时限',
        align: 'center',
        key: 'shixian',
        editable: true
    },
    {
                    title: '详情',
                    key: 'show_more',
                    align: 'center',
                    render: (h, params) => {
                        return h('Button', {
                            props: {
                                type: 'text',
                                size: 'small'
                            },
                            on: {
                                click: () => {
                                    let argu = { order_id: params.row.order_id };
                                    this.$router.push({
                                        name: 'order-info',
                                        params: argu
                                    });
                                }
                            }
                        }, '了解详情');
                    }
                }
            ],
            orderData: [
                {
                    shijian: "2018年3月1日",
      didian: "丰庄路35号",
      laiyuan: "居民",
      dangwei: "上海士明保洁服务有限公司",
      shixian: "2018年3月1日 下午15:00"
                }
            ]
        };
    }
};
</script>