<template>
  <div>
    <!-- 登录备忘提醒 -->
    <el-dialog title="过期备忘" :visible.sync="oldNotesDialogVisible" :close-on-click-modal="false" :show-close="false">
      <div class="note-wrap" v-for="note in oldNotes" style="display:block;" :key="note.id">
        <div class="note-main">
          <el-card>
            <div>
              <p class="note-time">提醒时间：{{note.remindDate}}</p>
              <i class="el-icon-bell note-icon"></i>
              <span class="note-title">{{note.title}}</span>
              <p class="note-content" v-if="note.type == 1">
                <a href="javascript:void(0)" @click="goDetail(note)" 
                style="text-decoration:underline;" class="el-button--text el-button--small">{{note.content}}</a>
              </p>
              <p class="note-content" v-else-if="note.type == 0">
                {{note.content}}
              </p>
              
            </div>
          </el-card>
        </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click.native.prevent="closeOldNotesDialog()">确 定</el-button>
      </div>
    </el-dialog>
  </div>

</template>

<script>
  import {
    mapGetters,
    mapActions,
    mapMutations
  } from 'vuex'
  export default {
    computed: mapGetters({
      // newNotes: 'newNotes',
      // newNotesDialogVisible: 'newNotesDialogVisible',
      // newNotesIds: 'newIds',

      // oldNotes: 'oldNotes',
      // oldNotesDialogVisible: 'oldNotesDialogVisible',
      oldNotesIds: 'oldIds',
    }),
    data() {
      return {
        currentNote: {},
        // 调试代码
        oldNotes:[
            {
                "id": 110,
                "collectionMarkId": null,
                "title": "承诺还款",
                "remindDate": "2018/05/18 13:58",
                "repetitionWay": 0,
                "repetitionWayName": "永不",
                "content": "用户【吴光强】承诺还款，还款时间【2018-05-30 00:00:00】，还款金额【1222】，对应案件【18000020】。",
                "createDate": "2018/05/16 15:51",
                "updateDate": null,
                "memorandumStatus": 0,
                "caseId": 438,
                "caseManageId": 217,
                "caseCode": "1800000110",
                "type": 1
            },{
                "id": 110,
                "collectionMarkId": null,
                "title": "承诺还款",
                "remindDate": "2018/05/18 13:58",
                "repetitionWay": 0,
                "repetitionWayName": "永不",
                "content": "用户【吴光强】承诺还款，还款时间【2018-05-30 00:00:00】，还款金额【1222】，对应案件【18000020】。",
                "createDate": "2018/05/16 15:51",
                "updateDate": null,
                "memorandumStatus": 0,
                "caseId": 438,
                "caseManageId": 217,
                "caseCode": "1800000110",
                "type": 1
            }
        ],
        oldNotesDialogVisible: false,
        currentNoteDialogVisible: false
      }
    },
    created() {
      //   this.initWebSocket()
      // this.connect()

    },
    methods: {
      goDetail(note) {
        // url编码
        let caseCode = this.$util.encrypt(note.caseCode + '_' + note.caseId.toString() + '_' + note.caseManageId.toString(),
          'caseDetail');
        let url = (window.location.origin ? window.location.origin : '') + '/#/worker_case_detail?id=' + caseCode;
        window.open(url);
      },
      closeNewNotesDialog() {
        this.$store.commit('UNEXPIRE')
        this.$nextTick(function () {
          this.checkNotes(this.newNotesIds)
        })


      },
      closeOldNotesDialog(){
        this.checkNotes(this.oldNotesIds)
        this.$store.dispatch('removeNotes')
      },
      checkNotes(ids) {
        this.$axios.post('/api/assignee/memo/hasRemined', {
          ids: ids
        }).then((res) => {
          if (res.data.code == 0) {
            if (res.data.data.has == true) {
              // 1、取消之前的定时任务，新建新的定时任务
              this.$store.dispatch('timerChange', {interval:res.data.data.timeForRemind,_this:this})
              // 2、替换note
              this.$store.dispatch('newNotesChange', res.data.data.info)
            } else {

            }

          } else {
            this.$util.failCallback(res.data, this)
          }
        }, (err) => {
          console.log(err)
        })
      },


    }

  }

</script>

