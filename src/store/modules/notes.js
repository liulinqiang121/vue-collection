import * as types from '../mutation-types'

// import Vue from 'vue'

import axios from 'axios'
import {
    MessageBox
} from 'element-ui'
import * as util from '../../util/util.js'
// initial state
const state = {
    oldNotes: [],
    newNotes: [],

    hasExpired: false,
    timer: null
}

// getters
const getters = {
    oldNotes: state => state.oldNotes,
    newNotes: state => state.newNotes,
    oldNotesDialogVisible: state => {
        return state.oldNotes.length > 0
    },
    newNotesDialogVisible: state => {
        return !!(state.newNotes.length > 0 && state.hasExpired)
    },
    newIds: state => {
        return state.newNotes.map(item => item.id)
    },
    oldIds: state => {
        return state.oldNotes.map(item => item.id)
    }

}

// actions
const actions = {
    // ceshi({}, _this) {
    //     let res = {
    //         data: {
    //             data: 'ceshi',
    //             code: 61019
    //         }
    //     }
    //     util.failCallback(res.data, _this)
    // },
    // 登录后获取过期备忘
    getOldNotes({
        commit,
        state
    }, _this) {
        axios.post('/api/assignee/memo/getRepetitionMemo', {}).then((res) => {
            if (res.data.code == 0 && res.data.data) {
                // this.notes = res.data.data
                commit(types.RECEIVE_OLD_NOTES, {
                    note: res.data.data
                })
            } else {
                util.failCallback(res.data, _this)
            }
        }).catch((err) => {
            console.log(err)
        })
    },

    removeNotes({
        commit,
        state
    }) {
        commit(types.REMOVE_OLD_NOTES)
    },
    // 登录后获取最新备忘
    getNewNotes({
        commit,
        state,
        dispatch
    }, _this) {
        axios.post('/api/assignee/memo/nextInfo', {}).then((res) => {
            if (res.data.code == 0) {
                // this.notes = res.data.data
                if (res.data.data.has == true) {
                    commit(types.RECEIVE_NEW_NOTES, {
                            note: res.data.data.info
                        })
                        // this.$store.dispatch('timerChange', {interval:res.data.data.timeForRemind,_this:this})
                    dispatch('timerChange', { interval: res.data.data.timeForRemind, _this: _this })

                    // 新建定时任务
                    // let timer = setTimeout(function() {
                    //     commit(types.EXPIRE)
                    // }, res.data.data.timeForRemind)

                    // commit(types.SET_TIMER, {
                    //     timer: timer
                    // })
                }
            } else {
                util.failCallback(res.data, _this)
            }
        }).catch((err) => {
            console.log(err)
        })
    },
    // 最新备忘更新
    newNotesChange({
        commit,
        state
    }, notes) {
        commit(types.RECEIVE_NEW_NOTES, {
            note: notes
        })
    },
    // 定时任务更新
    timerChange({
        commit,
        state,
        dispatch
    }, { interval, _this }) {

        // 清除上一个定时任务
        commit(types.REMOVE_TIMER)
        let timer = setTimeout(function() {
                // 判断是否会话超时
                axios.get('/api/login').then((res1) => {
                    if (res1.data.code == 0) {
                        // 弹备忘
                        // 1、弹框
                        // 1、1 拼接内容
                        let content = []
                        state.newNotes.forEach(function(note) {
                                let noteHtml = '';
                                // 从案件来的备忘
                                if (note.type == 1) {
                                    let url = util.goDetail(note);
                                    noteHtml =
                                        `<div class="note-main">
                                            <div class="el-card is-always-shadow">
                                                <div class="el-card__body">
                                                    <div class="note">
                                                        <p class="note-time">提醒时间：${note.remindDate}</p>
                                                        <i class="el-icon-bell note-icon"></i>
                                                        <span class="note-title">${note.title}</span>
                                                        <p class="note-content">
                                                            <a href="javascript:void(0)" onclick="window.open('${url}')"
                                                            style="text-decoration:underline;" class="el-button--text el-button--small">${note.content}</a>
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>`
                                        // 普通备忘
                                } else if (note.type == 0) {
                                    noteHtml =
                                        `<div class="note-main">
                                        <div class="el-card is-always-shadow">
                                            <div class="el-card__body">
                                                <div class="note">
                                                    <p class="note-time">提醒时间：${note.remindDate}</p>
                                                    <i class="el-icon-bell note-icon"></i>
                                                    <span class="note-title">${note.title}</span>
                                                    <p class="note-content">
                                                        ${note.content}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>`
                                }
                                content.push(noteHtml)
                            })
                            // 1、2 弹框
                        MessageBox.alert(content.join(''), '备忘提醒', {
                                confirmButtonText: '确定',
                                callback: action => {

                                },
                                dangerouslyUseHTMLString: true
                            })
                            // 2、备忘确认
                        axios.post('/api/assignee/memo/hasRemined', {
                            ids: state.newNotes.map(item => item.id)
                        }).then((res2) => {
                            if (res2.data.code == 0) {
                                if (res2.data.data.has == true) {
                                    // 2、替换note
                                    dispatch('newNotesChange', res2.data.data.info)
                                        // 1、取消之前的定时任务，新建新的定时任务
                                    dispatch('timerChange', { interval: res2.data.data.timeForRemind, _this: _this })
                                } else {

                                }
                            } else {
                                util.failCallback(res2.data, _this)
                            }
                        }, (err) => {
                            console.log(err)
                        })
                    } else {
                        util.failCallback(res1.data, _this)
                    }
                }).catch((err) => {
                    console.log(err)
                })
            }, interval)
            // 保存新的定时任务
        commit(types.SET_TIMER, {
            timer: timer
        })
    }

}

// mutations
const mutations = {
    // 过期备忘
    [types.RECEIVE_OLD_NOTES](state, {
        note
    }) {
        state.oldNotes = note
    },
    // 最新备忘
    [types.RECEIVE_NEW_NOTES](state, {
        note
    }) {
        state.newNotes = note
    },
    // 清空过期备忘
    [types.REMOVE_OLD_NOTES](state) {
        state.oldNotes = []
    },
    // 废除
    [types.EXPIRE](state) {
        state.hasExpired = true
    },
    // 废除
    [types.UNEXPIRE](state) {
        state.hasExpired = false
    },
    // 设置最新备忘定时任务
    [types.SET_TIMER](state, {
        timer
    }) {
        state.timer = timer
    },
    // 清空最新定时任务
    [types.REMOVE_TIMER](state) {
        clearTimeout(state.timer)
        state.timer = null
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}