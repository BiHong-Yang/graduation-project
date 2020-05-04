<template>
  <div class="c-logic-panel">
    <div class="c-logic-panel__classes">
      <el-menu :default-openeds="['1']">
        <el-menu-item
          v-for="(item, id) in logicMenu"
          :key="id"
          @click="showwitch = id"
          :index="id.toString()"
        >
          <span>{{ item.name }}</span>
        </el-menu-item>
      </el-menu>
    </div>

    <div class="c-logic-panel__items">
      <div v-for="(item, id) in logicMenu" :key="id" v-show="showwitch == id">
        <draggable
          class="dragArea list-group"
          :list="item.elements"
          :group="item.group"
          @change="log"
          tag="el-menu"
          :clone="CloneItem"
          :sort="false"
        >
          <el-menu-item
            class="list-group-item"
            v-for="element in item.elements"
            :key="element.type"
          >
            <span class="o-item__name">
              {{ element.name }}
            </span>
            <Hint :content="element.hint"></Hint>
          </el-menu-item>
        </draggable>
      </div>
    </div>

    <!-- <el-container>
    <el-aside width="40%">
      <el-menu :default-openeds="['1']">
        <el-menu-item
          v-for="(item, id) in logicMenu"
          :key="id"
          @click="showwitch = id"
          :index="id.toString()"
        >
          <span>{{ item.name }}</span>
        </el-menu-item>
      </el-menu>
    </el-aside> -->

    <!-- <el-aside width="60%">
      <div class="col-3">
        <draggable
          class="dragArea list-group"
          :list="list1"
          :group="{ name: 'logic', pull: 'clone', put: false }"
          @change="log"
          tag="el-menu"
          :clone="CloneItem"
          :move="onMove"
        >
          <el-menu-item
            class="list-group-item"
            v-for="element in list1"
            :key="element.id"
          >{{ element.name }}</el-menu-item>
        </draggable>
      </div>
    </el-aside>-->

    <!-- <el-aside width="60%">
      <div v-for="(item, id) in logicMenu" :key="id" v-show="showwitch == id">
        <draggable
          class="dragArea list-group"
          :list="item.elements"
          :group="item.group"
          @change="log"
          tag="el-menu"
          :clone="CloneItem"
          :sort="false"
        >
          <el-menu-item
            class="list-group-item"
            v-for="element in item.elements"
            :key="element.type"
          >
            <span class="o-item__name">
              {{ element.name }}
            </span>
            <Hint :content="element.hint"></Hint>
          </el-menu-item>
        </draggable>
      </div>
    </el-aside>
  </el-container> -->
  </div>
</template>

<script>
import draggable from "vuedraggable";
import Hint from "./Hint";
export default {
  name: "clone",
  display: "Clone",
  order: 2,
  components: {
    draggable,
    Hint,
  },
  data() {
    return {
      showwitch: 1,
    };
  },
  methods: {
    log: function (evt) {
      window.console.log(evt);
    },
    CloneItem: function (item) {
      this.$store.dispatch("logic/incGlobalId", 1);
      let temp = Object.assign({}, item);
      for (let x in temp.content) {
        delete x.name;
        delete x.hint;
      }
      delete temp.hint;
      console.log(temp);
      temp.id = this.$store.state.logic.globalId;
      return JSON.parse(JSON.stringify(temp));
    },
  },
  computed: {
    logicMenu() {
      return this.$store.state.logic.transformer;
    },
  },
};
</script>

<style lang="scss" scoped>
.c-logic-panel {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: stretch;
  .c-logic-panel__classes {
    width: 40%;
    flex: 0 0 auto;
  }
  .c-logic-panel__items {
    flex: 1 1 auto;
    overflow: auto;
    &::-webkit-scrollbar {
      display: none;
    }
  }
}
span {
  user-select: none;
}

.list-group-item {
  border: 1px solid rgb(238, 241, 246);
  user-select: none;
  display: flex;
  align-items: center;
  .o-item__name {
    flex: 1 1 auto;
  }
}

.list-group-item {
  .l-header__item {
    color: #c0c4cc !important;
    font: 400 13.3333px Arial;
    padding-left: 0.5rem;
    width: 100%;
    height: 100%;
    padding: 0.7rem 0;
    flex: 1 1 auto;
  }
  .l-header__button {
    height: 100%;
    color: #303133;
    padding: 0.7rem 0;
    flex: 0 0 auto;
  }
}
.el-aside {
  overflow: auto;
  height: 100%;
}
</style>
