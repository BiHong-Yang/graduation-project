<template>
  <div v-if="type=='uint'" class="contexts">
    <div v-for="(item, key) in element" :key="key" class="members">
      <div class="l-members-item">
        <span>{{item.name}}</span>
      </div>

      <div v-if="key=='categories'" class="l-members-item">
        <el-select v-model="item.value" placeholder="uint">
          <el-option
            v-for="id in 32"
            :key="id"
            :label="`最大2的 ${8*(33 - id)} 次方`"
            :value="`uint${8*(33 - id)}`"
          ></el-option>
        </el-select>
      </div>

      <div v-else-if="key == 'value' " class="l-members-item">
        <el-input v-model=" item.value " placeholder="请输入一个数字"></el-input>
      </div>

      <div v-else-if="key=='name'" class="l-members-item">
        <el-input v-model=" item.value " placeholder="请输入一串英文字符"></el-input>
      </div>
    </div>

    <Options :contexts=" contexts "></Options>
  </div>

  <div v-else-if="type=='int'" class="contexts">
    <div v-for="(item, key) in element" :key="key" class="members">
      <div class="l-members-item">
        <span>{{item.name}}</span>
      </div>

      <div v-if="key=='categories'" class="l-members-item">
        <el-select v-model="item.value" placeholder="uint">
          <el-option
            v-for="id in 32"
            :key="id"
            :label="`最大2的 ±${8*(33-id)-1} 次方`"
            :value="`int${8*(33-id)}`"
          ></el-option>
        </el-select>
      </div>

      <div v-else-if="key=='value'" class="l-members-item">
        <el-input v-model="item.value" placeholder="请输入一个数字"></el-input>
      </div>

      <div v-else-if="key=='name'" class="l-members-item">
        <el-input v-model="item.value" placeholder="请输入一串英文字符"></el-input>
      </div>
    </div>

    <Options :contexts="contexts"></Options>
  </div>

  <div v-else-if="type=='bool'" class="contexts">
    <div v-for="(item, key) in element" :key="key" class="members">
      <div class="l-members-item">
        <span>{{item.name}}</span>
      </div>

      <div v-if="key=='value'" class="l-members-item">
        <el-radio-group v-model="item.value" size="medium">
          <el-radio-button :label="true"></el-radio-button>
          <el-radio-button :label="false"></el-radio-button>
        </el-radio-group>
      </div>

      <div v-else-if="key=='name'" class="l-members-item">
        <el-input v-model="item.value" placeholder="请输入一串英文字符"></el-input>
      </div>
    </div>
    <Options :contexts="contexts"></Options>
  </div>

  <div v-else-if="type=='address'" class="contexts">
    <div v-for="(item, key) in element" :key="key" class="members">
      <div class="l-members-item">
        <span>{{item.name}}</span>
      </div>

      <Expression v-if="key=='value'" :item="item" :placeholder="'请输入一个地址'"></Expression>

      <div v-else-if="key=='name'" class="l-members-item">
        <el-input v-model="item.value" placeholder="请输入一串英文字符"></el-input>
      </div>
    </div>
    <Options :contexts="contexts"></Options>
  </div>
</template>

<script>
import Options from "./Options";
// import nested from "./nested/nested";
import Expression from "./Expression";
export default {
  props: ["contexts", "type"],
  methods: {
    checkShow: function(el) {
      return el.show;
    },
    doNothing: function() {}
  },
  computed: {
    element() {
      var temp = Object.assign({}, this.contexts);
      for (let x in temp) {
        if (temp[x].show == false) {
          delete temp[x];
        }
      }
      return Object.assign({}, temp);
    }
  },
  components: {
    Options,
    // nested,
    Expression
  }
};
</script>

<style scoped lang="scss">
div {
  &.members {
    flex: 0 0 auto;
    font-family: "微软雅黑";
    font-weight: 900;
    color: #409eff;
    user-select: none;
    display: flex;
    align-items: center;
    padding: 2px 0;
    .l-members-item {
      padding-right: 0.3rem;
    }
  }
}

.contexts {
  display: flex;
  flex-wrap: wrap;
}

.el-collapse {
  border: 1px solid #dcdfe6;
  padding: 0 1px !important;
  border-radius: 3px;
}

.el-collapse-item {
  padding: 0 !important;
  &:last-child {
    margin-bottom: 0px;
  }
}
.el-collapse-item__content {
  padding-bottom: 0 !important;
  background-color: red;
}
</style>