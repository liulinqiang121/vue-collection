<template>
  <div>
    <div class="content-body">
      <!-- 顶部，包括标题，操作按钮-->
      <div class="bd-top">
        <div class="md clearfix">
          <!-- 1、左边标题 -->
          <div class="md-left">
            <h5>案件批次分析</h5>
          </div>
          <!-- 2、右边操作按钮 -->
          <div class="md-right">
          </div>
        </div>
      </div>
      <div class="bd-main">
        <el-form :inline="true" size="mini">
          <el-form-item label="委案时间" prop="batchCode">
            <el-date-picker size="mini" v-model="countDate" start-placeholder="开始日期" end-placeholder="结束日期" type="daterange" @change="countDateChange"
              value-format="yyyy-MM-dd" format="yyyy/MM/dd" placeholder="选择日期" clearable>
            </el-date-picker>
          </el-form-item>
          <el-form-item label="贷款机构" prop="loanInstitution">
            <el-select placeholder="请选择贷款机构" v-model="conditionForm.loanInstitution" @change="getbatchCode" clearable>
              <el-option v-for="option in loanInstitution" :label="option.name" :value="option.code" :key="option.code"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="批次号" prop="batchCode">
            <el-select placeholder="" v-model="conditionForm.batchCode" filterable clearable>
              <el-option v-for="option in batchCode" :label="option.name" :value="option.code" :key="option.code"></el-option>
            </el-select>
          </el-form-item>

          <div class="el-col btnGroup">
            <el-form-item>
              <el-button size="mini" type="primary" @click="search">
                搜索
              </el-button>
              <el-button size="mini" @click="reset">
                重置
              </el-button>
            </el-form-item>
          </div>
        </el-form>
        <p class="exportTable"><a class="el-icon-upload2" @click="downloadTable">导出EXCEL文件</a></p>
        <el-table ref="multipleTable" height="700" :data="tb.data" tooltip-effect="dark" v-loading="loading" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading"
          empty-text="暂无数据">
          <el-table-column type="index" width="50" label="排名" align="center" :index="indexMethod">
          </el-table-column>
          <el-table-column v-for="field in tb.fields" :align="field.align||'left'" :prop="field.key" :label="field.label" :width="field.width" :key="field.id">
          </el-table-column>
        </el-table>
        <!-- <el-pagination small @current-change="changePage" :current-page.sync="conditionForm.currentPage" :page-size="conditionForm.pageSize"
        layout="sizes,total, prev, pager, next,jumper"  @size-change="changeSize"  :page-sizes="[15, 50, 100]" :total="total" >
        </el-pagination> -->
         <el-pagination small @current-change="changePage" :current-page.sync="conditionForm.currentPage" :page-size="conditionForm.pageSize"
        layout="sizes,total, prev, pager, next,jumper"  @size-change="changeSize"  :page-sizes="[15, 50, 100]" :total="total" >
        </el-pagination>
      </div>
    </div>

  </div>
</template>

<script>
  const fields = [
    // {
    //   key: 'id',
    //   label: '编号',
    //   width: 'auto',
    //   id: '0'
    // },
    {
      key: 'batchCode',
      label: '批次号',
      width: '',
      id: '2'
    },
    {
      key: 'commitDate',
      label: '委案时间',
      width: '150',
      id: '3'
    },
    {
      key: 'loanInstitution',
      label: '贷款机构',
      width: '',
      id: '10'
    },
    {
      key: 'commitMoney',
      label: '委案金额',
      width: '',
      id: '4',
      align:'right'
    },
    {
      key: 'repayMoney',
      label: '回收金额',
      width: '',
      id: '5',
      align:'right'
    },
    {
      key: 'commitCount',
      label: '案件数量',
      width: '',
      id: '6',
      align:'right'
    },
    {
      key: 'repayCount',
      label: '回收案件数',
      width: '',
      id: '7',
      align:'right'
    },
    {
      key: 'batchRecovery',
      label: '金额回收率',
      width: 'auto',
      id: '9',
      align:'right'
    },

  ]
  import tableComponent from '../../public-components/table'
  import pagination from '../../public-components/pagination'
  export default {
    components: {},
    data() {
      return {

        batchCode: [],
        loanInstitution: [],
        countDate: [],

        tb: {
          data: [],
          fields: fields,
        },
        total: 0,
        pageSize: 15,
        currentPage: 1,
        loading: false,
        conditionForm: {
          countDateMin: "",
          countDateMax: "",
          batchCode: '',
          loanInstitution: '',
          pageSize: 15,
          currentPage: 1,
        },
        searchForm: {},
        total: 0,
        hasSearch: false,
      }
    },
    components: {
      tableComponent,
      pagination,
    },
    methods: {
      indexMethod(index) {
        return this.conditionForm.pageSize*(this.conditionForm.currentPage-1)+index+1;
      },
      reset() {
        this.countDate = []
        this.conditionForm.countDateMin = '';
        this.conditionForm.countDateMax = '';
        this.conditionForm.batchCode = '';
        this.conditionForm.loanInstitution = '';
        if (this.conditionForm.currentPage == 1) {
          this.getList(this.conditionForm);
        } else {
          this.conditionForm.currentPage = 1;
          this.hasSearch = true;
        }
        this.getList()
      },
      // 搜搜
      search() {
        // this.$refs.conditionForm.validate((valid) => {
        // if (valid) {
        this.searchForm = Object.assign({}, this.conditionForm);
        if (this.conditionForm.currentPage == 1) {
          this.getList(this.conditionForm);
        } else {
          this.conditionForm.currentPage = 1;
          this.hasSearch = true;
        }
        // }
        // })
      },
      getloanInstitution() {
        this.$axios.post('/api/assignee/caseCollection/batch/getLoanInstitution', {}).then((res) => {
          if (res.data.code == 0) {
            this.loanInstitution = res.data.data;
            this.loanInstitution.unshift({code: '',name: 'All'})
          } else {
            this.$util.failCallback(res.data, this)
          }
        }).catch((err) => {
          console.log(err);
        })
      },
      getbatchCode() {
        this.$axios.post('/api/assignee/caseCollection/batch/getBatchCode', {
          loanInstitution: this.conditionForm.loanInstitution
        }).then((res) => {
          if (res.data.code == 0) {
            this.batchCode = res.data.data
            this.batchCode.unshift({code: '',name: 'All'})
          } else {
            this.$util.failCallback(res.data, this)
          }
        }).catch((err) => {
          console.log(err);
        })
      },
      
      // 获取案件详情数据
      getList(data) {
        var queryParams;
        if (data) {
          queryParams = data
        } else {
          queryParams = this.conditionForm
        }
        this.loading = true;
        this.$axios.post('/api/assignee/caseCollection/batch/getBatchData', 
          queryParams
        ).then((res) => {
          if (res.data.code == 0) {
            this.tb.data = res.data.data.items;
            this.total = res.data.data.totalNum
          } else {
            this.$util.failCallback(res.data, this)
          }
          this.loading = false;
        }).catch((err) => {
          console.log(err);
          this.loading = false;
        })
      },
      // 改变页数
      changeSize(index) {
        this.conditionForm.pageSize = index;
        this.searchForm.pageSize = index;
        if(this.conditionForm.currentPage == 1) {
          this.getList(this.conditionForm)
        } else {
          this.conditionForm.currentPage = 1;
        }
      },
      // 翻页
      changePage(index) {
        this.conditionForm.currentPage = index;
        this.getList();
      },
      countDateChange(data) {
        if (!data) {
          this.conditionForm.countDateMin = ''
          this.conditionForm.countDateMax = ''
        } else {

          this.conditionForm.countDateMin = data[0]
          this.conditionForm.countDateMax = data[1]
        }

        // this.getList();
      },
      // 下载列表
      downloadTable() {
        var data = Object.assign({},this.conditionForm);
        data.pageSize = this.total;
        data.currentPage = 1;
        this.$axios({ // 用axios发送post请求
            method: 'post',
            url: '/api/assignee/caseCollection/batch/getBatchDataDownload', // 请求地址
            data: data,
            responseType: 'blob' // 表明服务器返回的数据类型
          })
          .then(res => {
            // if(res.data.code == 0){}
            if (res.data.type != 'application/json') {
              const content = res.data;
              const blob = new Blob([content]);
              const fileName = decodeURI(res.headers["content-disposition"].split("=")[1]);
              if ('download' in document.createElement('a')) { // 非IE下载
                const elink = document.createElement('a')
                elink.download = fileName
                elink.style.display = 'none'
                elink.href = URL.createObjectURL(blob)
                document.body.appendChild(elink)
                elink.click()
                URL.revokeObjectURL(elink.href) // 释放URL 对象
                document.body.removeChild(elink)
              } else { // IE10+下载
                navigator.msSaveBlob(blob, fileName)
              }
            } else {
              this.$message({
                type: 'error',
                message: '导出失败'
              })
            }
          })
          .catch(err => {
            console.log(err)
          })
      }

    },
    created() {
      this.searchForm = Object.assign({}, this.conditionForm);
      this.getList()
      this.getloanInstitution()
      this.getbatchCode()
    }
  }

</script>

<style lang="scss">
.btnGroup {
  width: 180px;
  display: inline-block;
  .el-form-item__content {

  }
}

</style>
