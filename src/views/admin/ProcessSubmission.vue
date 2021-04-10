<template>
    <div class="page-content-holder p-2">
        <h1>This is the PROCESS SUBMISSION view</h1>
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
                })
            })
        },
        methods: {
            processSubmission: async function (sub) {
                sub.workflow_status = "Processed"
                await submission_manager.processSubmission(sub._id, sub)
            }
        }
    }
</script>