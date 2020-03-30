<template>
  <div v-if="type=='uint'" class="contexts">
    <div v-for="(item, key) in element" :key="key" class="members">
      <div class="name">
        <span>{{item.name}}</span>
      </div>

      <div v-if="key=='categories'">
        <el-select v-model="item.value" placeholder="uint">
          <el-option
            v-for="id in 32"
            :key="id"
            :label="`最大2的 ${8*(33 - id)} 次方`"
            :value="`uint${8*(33 - id)}`"
          ></el-option>
        </el-select>
      </div>

      <div v-else-if="key == 'value'">
        <el-input v-model=" item.value " placeholder="请输入一个数字"></el-input>
      </div>

      <div v-else-if="key=='name'">
        <el-input v-model=" item.value " placeholder="请输入一串英文字符"></el-input>
      </div>
    </div>

    <Options :contexts=" contexts "></Options>
  </div>

  <div v-else-if="type=='int'" class="contexts">
    <div v-for="(item, key) in element" :key="key" class="members">
      <div class="name">
        <span>{{item.name}}</span>
      </div>

      <div v-if="key=='categories'">
        <el-select v-model="item.value" placeholder="uint">
          <el-option
            v-for="id in 32"
            :key="id"
            :label="`最大2的 ±${8*(33-id)-1} 次方`"
            :value="`int${8*(33-id)}`"
          ></el-option>
        </el-select>
      </div>

      <div v-else-if="key=='value'">
        <el-input v-model="item.value" placeholder="请输入一个数字"></el-input>
      </div>

      <div v-else-if="key=='name'">
        <el-input v-model="item.value" placeholder="请输入一串英文字符"></el-input>
      </div>
    </div>

    <Options :contexts="contexts"></Options>
  </div>

  <div v-else-if="type=='bool'" class="contexts">
    <div v-for="(item, key) in element" :key="key" class="members">
      <div class="name">
        <span>{{item.name}}</span>
      </div>

      <div v-if="key=='value'">
        <el-radio-group v-model="item.value" size="medium">
          <el-radio-button :label="true"></el-radio-button>
          <el-radio-button :label="false"></el-radio-button>
        </el-radio-group>
      </div>

      <div v-else-if="key=='name'">
        <el-input v-model="item.value" placeholder="请输入一串英文字符"></el-input>
      </div>
    </div>
  </div>

  <div v-else-if="type=='address'" class="contexts">
    <div v-for="(item, key) in element" :key="key" class="members">
      <div class="name">
        <span>{{item.name}}</span>
      </div>

      <div class="expression-container" v-if="key=='value'">
        <el-collapse @change="item.useEle=!item.useEle">
          <el-collapse-item>
            <template slot="title">
              <div @click.stop>
                <el-input v-show="!item.useEle" v-model="item.value" placeholder="请输入一个地址"></el-input>
              </div>

              <span class="hint" v-show="item.useEle">请在下框中填入表达式</span>
            </template>
            <Nested class="nested" v-model="item.elements" />
          </el-collapse-item>
        </el-collapse>
      </div>

      <div v-else-if="key=='name'">
        <el-input v-model="item.value" placeholder="请输入一串英文字符"></el-input>
      </div>
    </div>
  </div>
</template>

<script>
import Options from "./Options";
import Nested from "./nested/nested.vue";
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
    Nested
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
    div {
      padding-right: 0.3rem;
    }
  }
}

.hint {
  color: #c0c4cc !important;
  font: 400 13.3333px Arial;
  padding-left: 0.5rem;
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
  .el-collapse-item__wrap .el-collapse-item__content {
    padding-bottom: 0 !important;
    background-color: red;
  }
}

.expression-container {
  display: flex;
}

.expression-container-item {
  min-width: 14.55rem;
  height: 5rem;
  border: 1px solid #dcdfe6;
  border-radius: 3px;
  box-sizing: border-box;
  padding: 0px;
}
</style>