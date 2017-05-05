<template>
  
  <div class="router-view">

      <div class="el-btn-wrap">
          <el-button type="danger">新建</el-button>
          <el-button type="info" @click="batchDelete">删除</el-button>
      </div>


      <div class="el-table-wrap">          
          <el-table
            :data="tableData3"
            border
            max-height="500"

            @select-all="tableSelectAllFn"
            @select = "tableselectFN"
            @selection-change = "tableSelectChange"
            @row-click = "rowClickFn"

            >

            <el-table-column
              fixed
              type="selection"
              width="55">
            </el-table-column>

            <el-table-column
              prop="date"
              label="日期">
            </el-table-column>
            <el-table-column
              prop="name"
              label="姓名">
            </el-table-column>
            <el-table-column
              prop="province"
              label="省份">
            </el-table-column>
            <el-table-column
              prop="city"
              label="市区">
            </el-table-column>
            <el-table-column
              prop="address"
              label="地址">
            </el-table-column>
            <el-table-column
              prop="zip"
              label="邮编">
            </el-table-column>


            <el-table-column
              fixed="right"
              label="操作"
              width="100">

              <template scope="scope">
                <el-button type="text" @click="deleteRow(scope.$index, tableData3)" size="small">删除</el-button>
                <el-button type="text" @click="dialogFormVisible = true" size="small">编辑</el-button>
              </template>

            </el-table-column>

          </el-table>
      </div>


      <el-dialog title="信息" v-model="dialogFormVisible">

        <el-form label-width="80px">
          <el-form-item label="姓名">
            <el-input v-model="form.name"></el-input>
          </el-form-item>

          <el-form-item label="日期">
            <el-date-picker type="date" placeholder="选择日期" v-model="form.date" :picker-options="pickerOptions" style="width: 100%;"></el-date-picker>
          </el-form-item>

          <el-form-item label="省份">
            <el-input v-model="form.province"></el-input>
          </el-form-item>
          <el-form-item label="市区">
            <el-input v-model="form.city"></el-input>
          </el-form-item>
          <el-form-item label="地址">
            <el-input v-model="form.address"></el-input>
          </el-form-item>
          <el-form-item label="邮编">
            <el-input v-model="form.zip"></el-input>
          </el-form-item>
        </el-form>

        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="fromConfirm">确 定</el-button>
        </div>
      </el-dialog>


      <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-size="20"
      layout="total, prev, pager, next, jumper"
      :total="taskListCount">
      </el-pagination>

  </div>

</template>


<style>
  
  .el-btn-wrap {
      padding-bottom: 15px;
  }

  .el-pagination {
      padding: 30px 0;
      text-align: center;
  }


  .loadingClass {
      background-color: rgba(0,0,0,0.1);
  }

</style>

<script>
  
  import "../static/dateFormat.js" // 日期格式化


  import Lodash from 'lodash' 


  import $ from 'jquery/dist/jquery.min.js'
  import Mock from 'mockjs/dist/mock-min.js'
  // table的所有数据
  let taskListObj = Mock.mock({
      'taskList|200': [{
          'date': '@date',
          'name': '@name',
          'province': '@province',
          'city': '@city',
          'address': '@county(true)',
          'zip': 200333,
          'id': '009'
      }]
  });
  // 这种写法在可删除的table中有瑕疵而且每一页的条数必须固定
  let chunkArr = _.chunk(taskListObj.taskList, 20);// 拆页
  _.forEach(chunkArr, function(value, index) {
      Mock.mock('http://g.cn?page='+ (parseInt(index) + 1), chunkArr[index]);
  })
  Mock.mock('http://taskListCountPageCount.cn', {
      taskListCount: taskListObj.taskList.length,
      pageCount: chunkArr.length
  });



  export default {
    methods: {

      // 导航完成之后获取数据
      fetchData(page) {
          let _this = this;
          $.ajax({
              url: 'http://g.cn?page=' + page,
              dataType:'json',
              type: "GET"
          }).done(function(dataObj, status, xhr){
              _this.tableData3.length = 0;
              _this.tableData3 = _this.tableData3.concat(dataObj)
          })
      },

      // 分页
      paginationFn() {
          let _this = this;
          $.ajax({
              url: 'http://taskListCountPageCount.cn',
              dataType:'json',
              type: "GET"
          }).done(function(dataObj, status, xhr){
              _this.taskListCount = dataObj.taskListCount;
              _this.pageCount = dataObj.pageCount;
          })
      },

      // 删除行
      deleteRow(index, rows) {

        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {

            let loadingInstance = this.$loading({ 
              fullscreen: true,
              customClass: 'loadingClass'
            });

            let _this = this;
            _.delay(function(){

                rows.splice(index, 1);
                _this.$message({
                  type: 'success',
                  message: '删除成功!'
                });
                loadingInstance.close();

            },3000)
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });  
        });

      },

      // 全选(参数为tableData)
      tableSelectAllFn(rows) {
        //for(let i = 0; i < rows.length; i++) {
          //console.log(rows[i].date);
        //}

        //console.log(rows.length);

      },

      // 单选
      tableselectFN(selection, rows) {
        
      },


      // change
      tableSelectChange(selection) {
        this.selected = selection;
        //for(let i = 0; i < selection.length; i++) {
          //console.log(selection[i].date);
        //}
      },
      // row-click
      rowClickFn(row, event, column) {
         // console.log('row-click');
      },

      batchDelete() {

        if(this.selected.length <= 0) {
            this.$message({
              type: 'info',
              message: '请选择要删除的内容！'
            }); 
            return;
        }

        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {

          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'

        }).then(() => {

            let loadingInstance = this.$loading({ 
              fullscreen: true,
              customClass: 'loadingClass'
            });

            let _this = this;

            // 第一种方法(一般不会删除很多，所以觉得这种更好)
            _.delay(function() {
                _.forEach(_this.selected,function(value) {
                    let index = _.findIndex(_this.tableData3, value);
                    if (index > -1) {
                      _this.tableData3.splice(index, 1);
                    }
                })

                // 第二种方法
                //_this.tableData3 = _.difference(_this.tableData3, _this.selected)


                _this.$message({
                  type: 'success',
                  message: '删除成功!'
                });
                loadingInstance.close();
            },3000)

        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });


      },

      // 保存表单
      fromConfirm () {

          let loadingInstance = this.$loading({ 
            fullscreen: true,
            customClass: 'loadingClass'
          });

          let _this = this;
          $.ajax({
              type: 'POST',
              url: 'http://g.cn?page=1',
              dataType:'json'
          }).done(function(data, status, xhr){

              _.delay(function() {
                _this.dialogFormVisible = false;
                _this.tableData3.unshift({
                  date: _this.form.date.format("yyyy-MM-dd"),
                  name: _this.form.name,
                  province: _this.form.province,
                  city: _this.form.city,
                  address: _this.form.address,
                  zip: _this.form.zip
                });
                _this.$message({
                  type: 'success',
                  message: '保存成功'
                })
                _this.form.date = '';
                _this.form.name = '';
                _this.form.name = '';
                _this.form.province = '';
                _this.form.city = '';
                _this.form.address = '';
                _this.form.zip = '';
                loadingInstance.close();
            }, 3000)

          });
     
      },

      handleSizeChange(val) {
        this.fetchData(val)
      },
      handleCurrentChange(val) {
        this.currentPage = val;
        this.fetchData(val);
      }

    },
    data() {

      return {
        selected: [],
        dialogFormVisible: false,
        form: {
          name: '',
          province: '',
          date: '',
          city: '',
          address: '',
          zip: '',
          id: ''
        },
        formLabelWidth: '120px',
        idIndex: 20,
        tableData3: [],


        currentPage: 1,
        taskListCount: 0,
        pageCount: 0,
        pickerOptions: {
          disabledDate(time) {
            return time.getTime() < Date.now() - 8.64e7;
          }
        },

        fullscreenLoading: false
      }

    },
    created() {
        this.fetchData(1);// 导航完成之后获取数据
        this.paginationFn();
    }
}
</script>