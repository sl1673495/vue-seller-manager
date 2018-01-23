<template>
  <div class="good-form">
    <el-dialog
      title="编辑商品"
      :visible.sync="editGoodFormVisible.visible"
      width="50%">
      <span>
        <div class="addGoodDialog">
          <el-form :model="good" :rules="rules" ref="editGoodForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="商品名称" prop="name">
              <el-input v-model="good.name"></el-input>
            </el-form-item>
            <el-form-item label="上传图片" prop="editImageUrl">
              <el-upload
                class="avatar-uploader"
                action="https://jsonplaceholder.typicode.com/posts/"
                :show-file-list="false"
                :on-success="handleAvatarSuccess">
                <img v-if="good.image" :src="good.image" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </el-form-item>
            <el-form-item label="商品价格" prop="price">
               <el-input v-model.number="good.price"></el-input>
            </el-form-item>
            <el-form-item label="简介" prop="description">
               <el-input v-model="good.description"></el-input>
            </el-form-item>
            <el-form-item label="描述" prop="info">
               <el-input type="textarea" v-model="good.info"></el-input>
            </el-form-item>
              <div class="form-btn-group">
                <el-button type="primary"
                           @click="submitForm('editGoodForm')">确认修改</el-button>
                <el-button @click="editGoodFormVisible.visible =false,editImageUrl = ''">取消</el-button>
              </div>
          </el-form>
        </div>
      </span>
    </el-dialog>
  </div>
</template>

<script type="text/ecmascript-6">
  import {bus} from '../../bus';

  export default {
    props: {
      editGoodFormVisible: {
        type: Object
      },
      editGood: {
        type: Object
      }
    },
    data() {
      return {
        editImageUrl: this.editGood.image,
        rules: {
          addName: [
            {required: true, message: '请输入商品名称', trigger: 'change'}
          ],
          addPrice: [
            {required: true, message: '请输入商品价格'},
            {type: 'number', message: '价格必须是数字'}
          ]
        }
      }
    },
    computed: {
      //深拷贝一份，返回的是一个指向不同地址的obj，所以不会影响外部的对象
      good: function () {
        let obj=Object.assign({}, this.editGood);
        return obj
      }
    },
    methods: {
      handleAvatarSuccess(res, file) {
        this.editGood.image = URL.createObjectURL(file.raw);
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$message.success("修改商品成功");
            this.editGoodFormVisible.visible = false;
            bus.$emit('editSuccess',this.good);
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">

</style>
