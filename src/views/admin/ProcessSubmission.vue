<template>
    <div>
        <h1>This is the PROCESS SUBMISSION view</h1>
        <!--<div class="border mx-2 my-3 px-2 pt-2" v-for="month of order_history" v-bind:key="month.month_name">
            {{ month.month_name }} {{ month.year }} - {{ month.user }}
            <div class="border mx-3 my-3 px-2 pt-2" v-for="order of month.orders" v-bind:key="order.order_date">
                <div>{{ order.order_date }}</div>
                <div class="row mx-3 my-2">
                    <div class="col-sm font-weight-bold">
                        Name
                    </div>
                    <div class="col-sm font-weight-bold">
                        Price
                    </div>
                    <div class="col-sm font-weight-bold">
                        Item Quantity
                    </div>
                </div>
                <div v-for="item of order.food_items" v-bind:key="item.name">
                    <div class="row mx-3 my-2">
                        <div class="col-sm">
                            {{ item.name }}
                        </div>
                        <div class="col-sm">
                            ${{ item.price.toFixed(2) }}
                        </div>
                        <div class="col-sm">
                            {{ item.quantity }}
                        </div>
                    </div>
                </div>
            </div>
            <div class="d-flex flex-row-reverse">
                <button type="button" class="mb-3 mr-3 btn btn-outline-success font-weight-bold">
                    Process
                </button>
            </div>
        </div>-->

        <div class="mx-2 my-3 px-2 pt-2">
            <div class="row">
                <div class="col-sm font-weight-bold">User</div>
                <div class="col-sm font-weight-bold">Submission Month</div>
                <div class="col-sm font-weight-bold">Month Total</div>
                <div class="col-sm font-weight-bold"></div>
            </div>
        </div>
        <div class="border mx-2 my-3 px-3 py-3" v-for="submission of submissions" :key="submission.user_id + submission.month">
            <div class="row">
                <div class="col-sm font-weight-bold">{{ submission.user_name }}</div>
                <div class="col-sm font-weight-bold">{{ submission.month }}</div>
                <div class="col-sm font-weight-bold">${{ submission.month_total.toFixed(2) }}</div>
                <div class="col-sm font-weight-bold">
                    <button @click="processSubmission(submission)" class="btn btn-outline-success font-weight-bold">{{ submission.workflow_status }}</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import * as submission_manager from '../../services/SubmissionManagerService'

    export default {
        name: 'manage_roles',
        currentQuizId: null,
        data: function() {
            return {
                submissions: {},
                order_history: {
                    January2021: {
                        user: "User1",
                        month_name: "January",
                        year: "2021",
                        orders: [
                            {
                                order_date: "1/5/2021",
                                food_items: [
                                    {
                                        name: 'taco',
                                        price: 2.5,
                                        quantity: 5
                                    },
                                    {
                                        name: 'burrito',
                                        price: 2.5,
                                        quantity: 5
                                    }
                                ]
                            },
                            {
                                order_date: "1/12/2021",
                                food_items: [
                                    {
                                        name: 'taco',
                                        price: 2.5,
                                        quantity: 5
                                    },
                                    {
                                        name: 'hot dogo',
                                        price: 2.5,
                                        quantity: 5
                                    }
                                ]
                            },
                            {
                                order_date: "1/15/2021",
                                food_items: [
                                    {
                                        name: 'burrito',
                                        price: 2.5,
                                        quantity: 5
                                    },
                                    {
                                        name: 'hot dogo',
                                        price: 2.5,
                                        quantity: 5
                                    }
                                ]
                            }
                        ]
                    },
                    February2021: {
                        user: "User2",
                        month_name: "February",
                        year: "2021",
                        orders: [
                            {
                                order_date: "1/6/2021",
                                food_items: [
                                    {
                                        name: 'taco',
                                        price: 2.5,
                                        quantity: 5
                                    },
                                    {
                                        name: 'burrito',
                                        price: 2.5,
                                        quantity: 5
                                    }
                                ]
                            },
                            {
                                order_date: "1/14/2021",
                                food_items: [
                                    {
                                        name: 'taco',
                                        price: 2.5,
                                        quantity: 5
                                    },
                                    {
                                        name: 'hot dogo',
                                        price: 2.5,
                                        quantity: 5
                                    }
                                ]
                            },
                            {
                                order_date: "1/26/2021",
                                food_items: [
                                    {
                                        name: 'burrito',
                                        price: 2.5,
                                        quantity: 5
                                    },
                                    {
                                        name: 'hot dogo',
                                        price: 2.5,
                                        quantity: 5
                                    }
                                ]
                            }
                        ]
                    }
                }
            }
        },
        beforeRouteEnter(to, from, next) {
            submission_manager.getSubmissionsForProcessing()
            .then(res => {
                next(vm => {
                    vm.submissions = res.data.submissions
                    console.log(res.data)
                });
            });
        },
        methods: {
            processSubmission: async function (sub) {
                sub.workflow_status = "Processed"
                await submission_manager.processSubmission(sub._id, sub)
            }
        }
    }
</script>