<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-lx-cascades"></i> 基础表格</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">
                <el-button type="danger" icon="delete" class="handle-del mr10" @click="delAll">批量删除</el-button>
                <el-button type="primary" icon="delete" class="handle-del mr10" @click="diagadd">新增用户</el-button>
                <el-select  placeholder="筛选省份" class="handle-select mr10">
                    <el-option key="1" label="广东省" value="广东省"></el-option>
                    <el-option key="2" label="湖南省" value="湖南省"></el-option>
                </el-select>
                <el-input placeholder="筛选关键词" class="handle-input mr10"></el-input>
                <el-button type="primary" icon="search" @click="">搜索</el-button>
            </div>
            <el-table :data="tableData" border class="table" ref="multipleTable">
                <el-table-column type="selection" width="55" align="center">
                	
                </el-table-column>
               
                <el-table-column 
                	prop="name" 
                	label="姓名"
                	align="center"
                	width="100">
                </el-table-column>
                <el-table-column 
                	prop="age" 
                	label="年龄"
                	sortable 
                	align="center"
                	width="80" >
                </el-table-column>
                <el-table-column 
                	prop="sex" 
                	label="性别"
                	align="center"
                	width="80">
                </el-table-column>
                <el-table-column 
                	prop="phone" 
                	label="手机号"
                	align="center"
                	width="180">
                </el-table-column>
                <el-table-column 
                	prop="address"
                	align="center"
                	label="地址" 
                	:formatter="formatter">
                </el-table-column>
                 <el-table-column 
                	prop="createTime" 
                	label="日期"
                	align="center"
                	sortable 
                	width="280">
                </el-table-column>
                <el-table-column 
                	prop="" 
                	label="显示"
                	align="center"
                	width="80">
                </el-table-column>
                <el-table-column 
                	label="操作" 
                	width="180" 
                	align="center">
                    <template slot-scope="scope">
                        <el-button type="text" icon="el-icon-edit" @click="editUser(scope.row)">编辑</el-button>
                        <el-button type="text" icon="el-icon-delete" class="red" @click ="deleUser(scope.row.id)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination">
                <el-pagination
                  background
			      @size-change="handleSizeChange"
			      @current-change="handleCurrentChange"
			      :current-page="page.curpage"
			      :page-sizes="[5, 10, 15, 20]"
			      :page-size="page.pageSize"
			      layout="total, sizes, prev, pager, next, jumper"
			      :total="page.total">
			    </el-pagination>
            </div>
        </div>


        <!-- 用户新增提示框 -->
				<el-dialog
				  title=""
				  :visible.sync="addDialogVisible"
				  width="30%"
				  :before-close="handleClose">
			         <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
					  <el-form-item label="姓名" prop="name">
					    <el-input v-model="ruleForm.name"></el-input>
					  </el-form-item>
					  <el-form-item label="年龄" prop="age">
					    <el-input v-model="ruleForm.age"></el-input>
					  </el-form-item>
					  <el-form-item label="性别" prop="sex">
					    <el-input v-model="ruleForm.sex"></el-input>
					  </el-form-item>
					  <el-form-item label="手机号" prop="phone">
					    <el-input v-model="ruleForm.phone"></el-input>
					  </el-form-item>
					  <el-form-item label="地址" prop="address">
					    <el-input v-model="ruleForm.address"></el-input>
					  </el-form-item>
					  <el-form-item>
					    <el-button v-if="isBtn1" type="primary" @click="addUserList('ruleForm')">立即创建</el-button>
					    <el-button v-if="isBtn2" type="primary" @click="changeUserList('ruleForm')">保存</el-button>
					  </el-form-item>
					</el-form>
				</el-dialog>
    </div>
</template>

<script>
	import moment from 'moment'
    export default {
        name: 'basetable',
        data() {
            return {

                tableData: [],


                ruleForm: {
                	id:'',
                    name: '',
                    age:'',
                    sex:'',
                    phone: '',
                    address: '',
                    createTime:'',
                },
                
                page:{
                	curpage:1, //当前页
                	pageSize:10,
                },
                
                addDialogVisible:false,

                rules: {
		          name: [
		            { required: true, message: '请输入姓名', trigger: 'blur' },
		          ],
		          age: [
		            { required: true, message: '请输入年龄', trigger: 'blur' }
		          ],
		          sex: [
		            { required: true, message: '请选择性别', trigger: 'blur' }
		          ],
		          phone: [
		            { required: true, message: '请输入手机号', trigger: 'blur' }
		          ],
		          address: [
		            { required: true, message: '请输入地址', trigger: 'blur' }
		          ],
		        },
		        
		        isBtn1:false,
		        isBtn2:false,
            }
        },
        created() {
            this.init()
        },
        computed: {
           
        },
        methods: {
        	//查
           init(){
           	   this.$axios.get("/api/getUserList",this.page)
           	   .then(res=>{
           	   	  console.log(res)
           	   	  this.tableData =res.data.data
           	   	  this.page.total = res.data.total
           	   	  this.page.pageSize=res.data.pageSize
           	   	  this.page.curpage =res.data.curpage
           	   })
           },
           //增
           diagadd(){
           	 this.addDialogVisible =true
           	 this.isBtn2 =false
           	this.isBtn1 =true
           	this.ruleForm={}

           },
           addUserList(formName){
             var time = new Date()
            this.ruleForm.createTime =moment.utc(time).zone(-8).format('YYYY-MM-DD HH:mm:ss')
           	this.$refs[formName].validate((valid) => {
          if (valid) {
          	    
                 this.$axios.get("/api/addUserList",this.ruleForm)
           	   .then(res=>{
           	   	  if(res.data.msg ==="success"){
           	   	  	   this.$message({
				          message: '添加成功',
				          type: 'success'
				        })
           	   	  	   this.addDialogVisible =false
           	   	  	   this.ruleForm ={}
           	   	  	   this.init()
           	   	  }else{
           	   	  	  this.$message({
				          message: '添加失败',
				          type: 'error'
				       })
           	   	  	  this.addDialogVisible =false
           	   	  }
           	   })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
           	  
           },
           //删
           deleUser(id){
           	    this.$axios.get("/api/deleUser",{id:id})
           	   .then(res=>{
           	   	 if(res.data.msg ==="success"){
           	   	  	   this.$message({
				          message: '添加成功',
				          type: 'success'
				        })
           	   	  	   this.addDialogVisible =false
           	   	  	   this.ruleForm ={}
           	   	  	   this.init()
           	   	  }else{
           	   	  	  this.$message({
				          message: '添加失败',
				          type: 'error'
				       })
           	   	  	  this.addDialogVisible =false
           	   	  	  this.ruleForm ={}
           	   	  }
           	   })
           },
           //改
           editUser(row){
           	this.addDialogVisible=true
           	this.isBtn2 =true
           	this.isBtn1 =false
           	this.ruleForm.id =row.id
           	this.ruleForm.name =row.name
           	this.ruleForm.age =row.age
           	this.ruleForm.sex =row.sex
           	this.ruleForm.phone =row.phone
           	this.ruleForm.address =row.address
           },
           
           changeUserList(){
	           	this.$axios.get("/api/changeUserList",this.ruleForm)
	           	   .then(res=>{
	           	   	  this.addDialogVisible=false
	           	   	  this.init()
	           	   })
           },
           
           handleClose(){
           	this.addDialogVisible =false

           },
           handleCurrentChange(val){
           	   this.page.curpage =val
           	   this.init()
           },
           handleSizeChange(val){
           	  this.page.pageSize =val
           	  this.init()
           }
        }
    }

</script>

<style scoped>
    .handle-box {
        margin-bottom: 20px;
    }
    .container{
    	height: 700px;
    }
    .handle-select {
        width: 120px;
    }

    .handle-input {
        width: 300px;
        display: inline-block;
    }
    .del-dialog-cnt{
        font-size: 16px;
        text-align: center
    }
    .table{
        width: 100%;
        font-size: 14px;
    }
    .red{
        color: #ff0000;
    }
</style>
