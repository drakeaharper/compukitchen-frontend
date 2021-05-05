<template>
    <div class="page-content-holder p-2 m-2">
        <h1>Unprocessed</h1>
        <show-at breakpoint="mediumAndAbove">
            <div class="mx-2 my-3 px-2 pt-2">
                <div class="row">
                    <div class="col-sm font-weight-bold">User</div>
                    <div class="col-sm font-weight-bold">Submission Month</div>
                    <div class="col-sm font-weight-bold">Month Total</div>
                    <div class="col-sm font-weight-bold"></div>
                </div>
            </div>
        </show-at>
        <div class="border border-dark mx-2 my-3 px-3 py-3" v-for="submission of submissions" :key="submission.user_id + submission.month">
            <div class="row">
                <div class="col-sm font-weight-bold">{{ submission.user_name }}</div>
                <div class="col-sm font-weight-bold">{{ submission.month }}</div>
                <div class="col-sm font-weight-bold">${{ submission.month_total.toFixed(2) }}</div>
                <div class="col-sm font-weight-bold">
                    <button @click="processSubmission(submission)" class="btn btn-outline-success font-weight-bold" :disabled="submission.workflow_status === 'Processed'">{{ submission.workflow_status }}</button>
                </div>
            </div>
        </div>
        <h1>Past Submissions</h1>
        <div class="border border-dark my-2 p-2" v-for="month of past_submissions" :key="month[0].month">
            <a
                class="order-history-collapse-anchor"
                data-toggle="collapse"
                :data-target="`#collapse${month[0].month}`"
            >
                <p class="h3 order-history-collapse-anchor-text">
                    {{ month[0].month }}
                    <b-icon icon="chevron-down"></b-icon>
                </p>
            </a>
            <!--<show-at breakpoint="mediumAndAbove">
                <div class="mx-2 my-3 px-2 pt-2">
                    <div class="row">
                        <div class="col-sm font-weight-bold">User</div>
                        <div class="col-sm font-weight-bold">Submission Month</div>
                        <div class="col-sm font-weight-bold">Month Total</div>
                        <div class="col-sm font-weight-bold"></div>
                    </div>
                </div>
            </show-at>-->
            <div
                :id="`collapse${month[0].month}`"
                class="border border-dark mx-2 my-3 px-3 py-3 collapse"
                v-for="submission of month"
                :key="submission.user_id + submission.month"
            >
                <div class="row">
                    <div class="col-sm font-weight-bold">{{ submission.user_name }}</div>
                    <div class="col-sm font-weight-bold">{{ submission.month }}</div>
                    <div class="col-sm font-weight-bold">${{ submission.month_total.toFixed(2) }}</div>
                    <div class="col-sm font-weight-bold">
                        <button class="btn btn-outline-success font-weight-bold" :disabled="submission.workflow_status === 'Processed'">{{ submission.workflow_status }}</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import * as submission_manager from '../../services/SubmissionManagerService'
    import {showAt} from 'vue-breakpoints'

    export default {
        name: 'process_submissions',
        components: { showAt },
        data: function() {
            return {
                submissions: {},
                past_submissions: {}
            }
        },
        beforeRouteEnter(to, from, next) {
            submission_manager.getSubmissionsForProcessing()
            .then(res => {
                return res.data.submissions
            })
            .then(async to_process => {
                let past_subs = await submission_manager.getProcessedSubmissions()
                return {past: past_subs, to_process: to_process}
            })
            .then(submissions => {

                const groupBy = (items, key) =>
                    items.reduce((result, item) => ({
                        ...result,
                        [item[key]]: [
                            ...(result[item[key]] || []),
                            item,
                        ],
                    }),
                    {},
                );

                let grouped = groupBy(submissions.past.data.submissions, 'month')
                next(vm => {
                    vm.submissions = submissions.to_process
                    vm.past_submissions = grouped
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