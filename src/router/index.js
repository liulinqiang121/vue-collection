// import Vue from 'vue'
// import Router from 'vue-router'
const Home = r => require.ensure([], () => r(require('@/Home')), 'Home')
const Home2 = r => require.ensure([], () => r(require('@/Home2')), 'Home2')
const Login = r => require.ensure([], () => r(require('@/Login')), 'Login')
    // 一、公共部分
    // 1.1 总览页
const dashboard = r => require.ensure([], () => r(require('@/view/dashboard')), 'dashboard')
    // 1.2 无权限界面
const noAuthority = r => require.ensure([], () => r(require('@/view/noAuthority')), 'noAuthority')
    // 1.3 消息提醒
const message = r => require.ensure([], () => r(require('@/view/message')), 'message')
    // 二、系统功能
    // 2.1 用户管理
const user = r => require.ensure([], () => r(require('@/view/sys-func/user/user')), 'user')
    // 2.2  部门管理
const department = r => require.ensure([], () => r(require('@/view/sys-func/department/department')), 'department')
    // 2.3 公司信息
const com_info = r => require.ensure([], () => r(require('@/view/sys-func/com_info')), 'com_info')
    // 2.4 职位管理
const position = r => require.ensure([], () => r(require('@/view/sys-func/permission/position')), 'position')
    // 2.5 角色管理
const role = r => require.ensure([], () => r(require('@/view/sys-func/permission/role')), 'role')
    // 2.4 设置
const sensitive_words = r => require.ensure([], () => r(require('@/view/set-up/sensitive-words/sensitive_words')), 'sensitive_words')
const strategy_design = r => require.ensure([], () => r(require('@/view/set-up/strategy-design/strategy_design')), 'strategy_design')
    // 2.5 全局策略设置
const global_strategy = r => require.ensure([], () => r(require('@/view/set-up/global-strategy/global_strategy')), 'global_strategy')
    // 2.6 智能催收策略设置
const ai_strategy = r => require.ensure([], () => r(require('@/view/set-up/ai-strategy/ai_strategy')), 'ai_strategy')
const ai_rule = r => require.ensure([], () => r(require('@/view/set-up/ai-rule/ai_rule')), 'ai_rule')
    // 2.7 坐席分配
const tel_allot = r => require.ensure([], () => r(require('@/view/sys-func/tel-allot/tel_allot')), 'tel_allot')
const visit_rule = r => require.ensure([], () => r(require('@/view/set-up/visit_rule/visit_rule')), 'visit_rule')
const out_call_rule = r => require.ensure([], () => r(require('@/view/set-up/out-call-rule/out_call_rule')), 'out_call_rule')
    // 三、案件管理
    // 3.1 案件管理
const case_case = r => require.ensure([], () => r(require('@/view/case-manage/case/case')), 'case')
    //  3.2 批次管理
const case_batch = r => require.ensure([], () => r(require('@/view/case-manage/batch/batch')), 'batch')
const case_batch_detail = r => require.ensure([], () => r(require('@/view/case-manage/batch/batch-detail')), 'batch-detail')
const out_visit_manage = r => require.ensure([], () => r(require('@/view/case-manage/out-visit/out_visit')), 'out-visit')
    // 四、还款管理
    // 4.1 还款流水
const assignee_repay_flow = r => require.ensure([], () => r(require('@/view/repay/assignee_repay_flow/assignee_repay_flow')), 'assignee_repay_flow')
    // 4.2 承诺还款
const repay_promise = r => require.ensure([], () => r(require('@/view/repay/repay_promise/repay_promise')), 'repay_promise')
    // 4.3 还款列表
const repay_list = r => require.ensure([], () => r(require('@/view/repay/repay_list/repay_list')), 'repay_list')
    // 五、作业管理
    // 5.1 智能催收
const aiCollection = r => require.ensure([], () => r(require('@/view/collection-manage/ai-collection/ai-collection')), 'ai-collection')
const ai_case_detail = r => require.ensure([], () => r(require('@/view/collection-manage/ai-collection/case_detail')), 'case_detail')
const call_work = r => require.ensure([], () => r(require('@/view/collection-manage/call-work/call_work')), 'call_work')
const call_task = r => require.ensure([], () => r(require('@/view/collection-manage/call-task/call_task')), 'call_task')
const call_task_detail = r => require.ensure([], () => r(require('@/view/collection-manage/call-task/call_task_detail')), 'call_task_detail')
    // 5.2 催收作业
const worker_case_detail = r => require.ensure([], () => r(require('@/view/collection-manage/worker-collection/case_detail')), 'case_detail')
const worker_collection = r => require.ensure([], () => r(require('@/view/collection-manage/worker-collection/worker_collection')), 'worerk_collection')
const more_information = r => require.ensure([], () => r(require('@/view/collection-manage/worker-collection/more-information/more_information')), 'more_information')
    // 六、待办与备忘
    // 6.1 我的审批
const examine_approve = r => require.ensure([], () => r(require('@/view/backlogs-notes/examine-approve/examine_approve')), 'examine_approve')
    // 6.2 我的申请
const apply = r => require.ensure([], () => r(require('@/view/backlogs-notes/apply')), 'apply')
    // 6.3 我的备忘
const notes = r => require.ensure([], () => r(require('@/view/backlogs-notes/notes/notes')), 'notes')
    // 七、呼叫系统
    // 7.1 呼叫记录
const call_record = r => require.ensure([], () => r(require('@/view/call-system/call_record/call_record')), 'call_record')
    // 7.2 短信记录
const message_record = r => require.ensure([], () => r(require('@/view/call-system/message_record/message_record')), 'message_record')
    // 八、录音管理
    // 8.1 录音列表
const soundrecord_list = r => require.ensure([], () => r(require('@/view/soundrecord-manage/soundrecord_list')), 'soundrecord_list')
    // 8.2 甲方投诉
const firstparty_complaint = r => require.ensure([], () => r(require('@/view/soundrecord-manage/firstparty_complaint')), 'firstparty_complaint')
    // 8.3 投诉预警
const complaint_warn = r => require.ensure([], () => r(require('@/view/soundrecord-manage/complaint_warn')), 'complaint_warn')
    // 九、BI报表
    // 9.1 全局案件报表
const case_globalGraph = r => require.ensure([], () => r(require('@/view/bi-report/case-collection/case_globalGraph')), 'case_globalGraph')
    // 9.2 批次回收分析
const batch_analysi = r => require.ensure([], () => r(require('@/view/bi-report/case-collection/batch_analysi')), 'batch_analysi')
    // 9.3 月度回收率分析
const repay_rate = r => require.ensure([], () => r(require('@/view/bi-report/case-collection/repay_rate')), 'repay_rate')
    // 9.4 催收覆盖率分析
const coverage_rate = r => require.ensure([], () => r(require('@/view/bi-report/case-collection/coverage_rate')), 'coverage_rate')
    // 9.5 贷款机构分析
const loanInstitution = r => require.ensure([], () => r(require('@/view/bi-report/case-collection/loanInstitution')), 'loanInstitution')
    // 9.6 个人绩效
const person_kpi = r => require.ensure([], () => r(require('@/view/bi-report/kpi/person_kpi')), 'person_kpi')
    // 9.7 部门绩效
const department_kpi = r => require.ensure([], () => r(require('@/view/bi-report/kpi/department_kpi')), 'department_kpi')
    // 9.8 只能催收分析报表
const response_effect = r => require.ensure([], () => r(require('@/view/bi-report/response-effect/response_effect')), 'response_effect')
    // 十、公告系统
const announce_list = r => require.ensure([], () => r(require('@/view/announce/announce_list')), 'announce_list')
const announce_send = r => require.ensure([], () => r(require('@/view/announce/announce_send')), 'announce_send')
const announce_detail = r => require.ensure([], () => r(require('@/view/announce/announce_detail')), 'announce_detail')
    // 十1、工单系统
    // 10.1我的工单
const my_work_list = r => require.ensure([], () => r(require('@/view/work-list/my_work_list')), 'my_work_list')
    // 10.2提交工单
const submit_work_list = r => require.ensure([], () => r(require('@/view/work-list/submit_work_list')), 'submit_work_list')
    // Vue.use(Router)

let router = new VueRouter({
    routes: [
        // {
        //     path: '/',
        //     // name: 'login',
        //     component: Login,
        //     redirect: '/login'
        // },
        {
            path: '/login',
            name: 'login',
            component: Login
        },
        {
            path: '/',
            name: 'Home',
            component: Home,
            redirect: '/assignee_dashboard',
            meta: {
                requireAuth: true
            },
            children: [
                // 一、 公共部分
                {
                    path: '/assignee_dashboard',
                    name: '总览页',
                    component: dashboard,
                    meta: {
                        requireAuth: true
                    }
                },
                {
                    path: '/noAuthority',
                    name: '无权限',
                    component: noAuthority,
                    meta: {
                        requireAuth: true
                    }
                },
                {
                    path: '/message',
                    name: '消息提醒',
                    component: message,
                    meta: {
                        requireAuth: true
                    }
                },

                // 二、系统功能
                {
                    path: '/assignee_department',
                    name: '部门管理',
                    component: department,
                    meta: {
                        requireAuth: true
                    }
                },
                {
                    path: '/assignee_user',
                    name: '用户管理',
                    component: user,
                    meta: {
                        requireAuth: true
                    }
                },
                {
                    path: '/assignee_info',
                    name: '公司信息',
                    component: com_info,
                    meta: {
                        requireAuth: true
                    }
                },
                {
                    path: '/assignee_role',
                    name: '角色管理',
                    component: role,
                    meta: {
                        requireAuth: true
                    }
                },
                {
                    path: '/assignee_position',
                    name: '职位管理',
                    component: position,
                    meta: {
                        requireAuth: true
                    }
                },
                {
                    path: '/assignee_sensitive_words',
                    name: '敏感词设置',
                    component: sensitive_words,
                    meta: {
                        requireAuth: true
                    }
                },
                {
                    path: '/assignee_global_strategy',
                    name: '全局策略设置',
                    component: global_strategy,
                    meta: {
                        requireAuth: true
                    }
                },
                {
                    path: '/assignee_ai_strategy',
                    name: '智能催收策略设置',
                    component: ai_strategy,
                    meta: {
                        requireAuth: true
                    }
                },
                {
                    path: '/assignee_ai_rule',
                    name: '智能催收规则设置',
                    component: ai_rule,
                    meta: {
                        requireAuth: true
                    }
                },
                {
                    path: '/assignee_strategy_design',
                    name: '策略配置',
                    component: strategy_design,
                    meta: {
                        requireAuth: true
                    }
                },
                {
                    path: '/assignee_tel_allot',
                    name: '坐席分配',
                    component: tel_allot,
                    meta: {
                        requireAuth: true
                    }
                },
                {
                    path: '/assignee_visit_rule',
                    name: '外访守则',
                    component: visit_rule,
                    meta: {
                        requireAuth: true
                    }
                },
                {
                    path: '/assignee_outCall_rule',
                    name: '外呼规则',
                    component: out_call_rule,
                    meta: {
                        requireAuth: true
                    }
                },
                //  三、案件管理
                {
                    path: '/assignee_case_manage',
                    name: '案件管理',
                    component: case_case,
                    meta: {
                        requireAuth: true
                    }
                },
                {
                    path: '/assignee_case_batch',
                    name: '批次管理',
                    component: case_batch,
                    meta: {
                        requireAuth: true
                    }
                },
                {
                    path: '/assignee_batch_detail',
                    name: '案件清单',
                    component: case_batch_detail,
                    meta: {
                        requireAuth: true
                    }
                },
                {
                    path: '/assignee_out_visit',
                    name: '外访管理',
                    component: out_visit_manage,
                    meta: {
                        requireAuth: true
                    }
                },
                // 四、还款管理
                {
                    path: '/assignee_repay_flow',
                    name: '还款流水',
                    component: assignee_repay_flow,
                    meta: {
                        requireAuth: true
                    }
                },
                // {
                //     path: '/assignee_repay_flow_case',
                //     name: 'assignee_repay_flow_case',
                //     component: assignee_repay_flow,
                //     meta: {
                //         requireAuth: true
                //     }
                // },
                {
                    path: '/assignee_repay_promise',
                    name: '承诺还款列表',
                    component: repay_promise,
                    meta: {
                        requireAuth: true
                    }
                },
                {
                    path: '/assignee_repay_list',
                    name: '实际还款列表',
                    component: repay_list,
                    meta: {
                        requireAuth: true
                    }
                },
                // 五、作业管理
                {
                    path: '/assignee_ai_collection',
                    name: '人工智能催收',
                    component: aiCollection,
                    meta: {
                        requireAuth: true
                    }
                },
                {
                    path: '/assignee_worker_collection',
                    name: '催收作业',
                    component: worker_collection,
                    meta: {
                        requireAuth: true
                    }
                },
                {
                    path: '/assignee_call_work',
                    name: '预测试外呼作业',
                    component: call_work,
                    meta: {
                        requireAuth: true
                    }
                },
                {
                    path: '/assignee_call_task',
                    name: '预测试外呼任务',
                    component: call_task,
                    meta: {
                        requireAuth: true
                    }
                }, {
                    path: '/assignee_call_task_detail',
                    name: '预测试外呼任务详情页',
                    component: call_task_detail,
                    meta: {
                        requireAuth: true
                    }
                },
                // 六、待办与备忘
                {
                    path: '/assignee_examine_approve',
                    name: '我的审批',
                    component: examine_approve,
                    meta: {
                        requireAuth: true
                    }
                },
                {
                    path: '/assignee_apply',
                    name: '我的申请',
                    component: apply,
                    meta: {
                        requireAuth: true
                    }
                },
                {
                    path: '/assignee_notes',
                    name: '我的备忘',
                    component: notes,
                    meta: {
                        requireAuth: true
                    }
                },
                // 七、呼叫系统
                {
                    path: '/assignee_call_record',
                    name: '呼叫记录',
                    component: call_record,
                    meta: {
                        requireAuth: true
                    }
                },
                {
                    path: '/assignee_message_record',
                    name: '短信记录',
                    component: message_record,
                    meta: {
                        requireAuth: true
                    }
                },
                // 八、录音管理
                {
                    path: '/assignee_soundrecord_list',
                    name: '录音列表',
                    component: soundrecord_list,
                    meta: {
                        requireAuth: true
                    }

                },
                {
                    path: '/assignee_firstparty_complaint',
                    name: '甲方投诉',
                    component: firstparty_complaint,
                    meta: {
                        requireAuth: true
                    }

                },
                {
                    path: '/assignee_complaint_warn',
                    name: '投诉预警',
                    component: complaint_warn,
                    meta: {
                        requireAuth: true
                    }

                },
                // 九、 报表
                {
                    path: '/assignee_case_globalGraph',
                    name: '全局报表',
                    component: case_globalGraph,
                    meta: {
                        requireAuth: true
                    }
                },
                {
                    path: '/assignee_batch_analysi',
                    name: '批次回收分析',
                    component: batch_analysi,
                    meta: {
                        requireAuth: true
                    }
                },
                {
                    path: '/assignee_repay_rate',
                    name: '月度回收率分析',
                    component: repay_rate,
                    meta: {
                        requireAuth: true
                    }
                },
                {
                    path: '/assignee_coverage_rate',
                    name: '催收覆盖率分析',
                    component: coverage_rate,
                    meta: {
                        requireAuth: true
                    }
                },
                {
                    path: '/assignee_loanInstitution',
                    name: '贷款机构分析',
                    component: loanInstitution,
                    meta: {
                        requireAuth: true
                    }
                },
                {
                    path: '/assignee_person_kpi',
                    name: '个人绩效查看',
                    component: person_kpi,
                    meta: {
                        requireAuth: true
                    }
                },
                {
                    path: '/assignee_department_kpi',
                    name: '部门绩效排行',
                    component: department_kpi,
                    meta: {
                        requireAuth: true
                    }
                },
                {
                    path: '/assignee_response_effect',
                    name: '响应效果分析',
                    component: response_effect,
                    meta: {
                        requireAuth: true
                    }
                },
                // 十、公告系统
                {
                    path: '/assignee_announce',
                    name: '公告系统',
                    component: announce_list,
                    meta: {
                        requireAuth: true
                    }
                },
                {
                    path: '/announce_send',
                    name: '发布公告',
                    component: announce_send,
                    meta: {
                        requireAuth: true
                    }
                },
                {
                    path: '/announce_detail',
                    name: '公告详情',
                    component: announce_detail,
                    meta: {
                        requireAuth: true
                    }
                },
                {
                    path: '/assignee_my_work_list',
                    name: '我的工单',
                    component: my_work_list,
                    meta: {
                        requireAuth: true
                    }
                },
                {
                    path: '/assignee_submit_work_list',
                    name: '提交工单',
                    component: submit_work_list,
                    meta: {
                        requireAuth: true
                    }
                },

            ]
        },
        {
            path: '/home2',
            name: 'Home2',
            component: Home2,
            meta: {
                requireAuth: true
            },
            // 案件详情
            children: [{
                    path: '/ai_case_detail',
                    name: 'AI案件详情',
                    component: ai_case_detail,
                    meta: {
                        requireAuth: true
                    }
                },
                {
                    path: '/worker_case_detail',
                    name: '作业案件详情',
                    component: worker_case_detail,
                    meta: {
                        requireAuth: true
                    }
                },
                {
                    path: '/assignee_more_infomation',
                    name: '更多信息',
                    component: more_information,
                    meta: {
                        requireAuth: true
                    }
                }
            ]
        }

    ]

})

//  判断是否需要登录权限 以及是否登录
router.beforeEach((to, from, next) => {
    // console.log(to)
    if (to.matched.some(res => res.meta.requireAuth)) { // 判断是否需要登录权限
        if (localStorage.getItem('username')) { // 判断是否登录
            next()
        } else { // 没登录则跳转到登录界面
            next({
                path: '/login'
                    // query: {
                    //     redirect: to.fullPath
                    // } // 将跳转的路由path作为参数，登录成功后跳转到该路由
            })
        }
    } else {
        next()
    }
})
export default router