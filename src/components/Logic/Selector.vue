<template>
  <!-- uint 类型 -->
  <el-select
    v-if="mode == 'uint' && donothing()"
    v-model="item.value"
    @change="refreshVars()"
  >
    <el-option
      v-for="id in 32"
      :key="id"
      :label="`${8 * (33 - id)}位`"
      :value="`uint${8 * (33 - id)}`"
    ></el-option>
  </el-select>

  <!-- int 类型 -->
  <el-select
    v-else-if="mode == 'int'"
    v-model="item.value"
    @change="refreshVars()"
  >
    <el-option
      v-for="id in 32"
      :key="id"
      :label="`${8 * (33 - id)}位`"
      :value="`int${8 * (33 - id)}`"
    ></el-option>
  </el-select>

  <!-- byteArray 类型 -->
  <el-select
    v-else-if="mode == 'byteArray' && donothing()"
    @change="refreshVars()"
    v-model="item.value"
  >
    <el-option :label="`变长字节数组`" :value="`bytes`"></el-option>

    <el-option
      v-for="id in 32"
      :key="id"
      :label="`最长 ${33 - id} 字节的字节数组`"
      :value="`byte${33 - id}`"
    ></el-option>
  </el-select>

  <!-- 外部可见性 -->
  <el-select
    v-else-if="mode == 'visibility' && donothing()"
    @change="refreshVars()"
    v-model="item.value"
  >
    <el-option :label="'默认'" :value="``">
      <span class="l-option-label">默认</span>
      <Hint content="只可以该合约或该合约的子合约内部调用"> </Hint>
    </el-option>
    <el-option :label="'内部函数'" :value="`internal`">
      <span class="l-option-label">内部函数</span>
      <Hint content="只可以该合约或该合约的子合约内部调用"> </Hint>
    </el-option>
    <el-option :label="`外部函数`" :value="`external`">
      <span class="l-option-label">外部函数</span>
      <Hint content="用于在该合约外调用"> </Hint>
    </el-option>
    <el-option :label="`公共函数`" :value="`public`">
      <span class="l-option-label">公共函数</span>
      <Hint content="任何用户或者合约都能调用和访问"> </Hint>
    </el-option>
    <el-option :label="`私有函数`" :value="`privite`">
      <span class="l-option-label">私有函数</span>
      <Hint
        content="只能在其所在的合约中调用和访问，即使是其子合约也没有权限访问"
      >
      </Hint>
    </el-option>
  </el-select>

  <!-- 外部可见性简化版 -->
  <el-select
    v-else-if="mode == 'visibility-simple' && donothing()"
    @change="refreshVars()"
    v-model="item.value"
  >
    <el-option :label="'默认模式'" :value="``">
      <span class="l-option-label">默认模式</span>
      <Hint content="只可以该合约或该合约的子合约内部调用"> </Hint>
    </el-option>
    <el-option :label="'内部函数'" :value="`internal`">
      <span class="l-option-label">内部函数</span>
      <Hint content="只可以该合约或该合约的子合约内部调用"> </Hint>
    </el-option>
    <el-option :label="`公共函数`" :value="`public`">
      <span class="l-option-label">公共函数</span>
      <Hint content="任何用户或者合约都能调用和访问"> </Hint>
    </el-option>
  </el-select>

  <!-- 外部可见性简化版 变量 -->
  <el-select
    v-else-if="mode == 'visibility-var' && donothing()"
    @change="refreshVars()"
    v-model="item.value"
  >
    <el-option :label="'默认'" :value="``">
      <span class="l-option-label">默认</span>
      <Hint content="只可以该合约或该合约的子合约内部调用"> </Hint>
    </el-option>
    <el-option :label="'内部'" :value="`internal`">
      <span class="l-option-label">内部</span>
      <Hint content="只可以该合约或该合约的子合约内部调用"> </Hint>
    </el-option>
    <el-option :label="`公共`" :value="`public`">
      <span class="l-option-label">公开</span>
      <Hint content="任何用户或者合约都能调用和访问"> </Hint>
    </el-option>
  </el-select>

  <!-- 调用行为 -->
  <el-select
    v-else-if="mode == 'behavior' && donothing()"
    @change="refreshVars()"
    v-model="item.value"
  >
    <el-option :label="'默认模式'" :value="``">
      <span class="l-option-label">默认模式</span>
      <Hint content="不可支付，但可读取/修改合约存储"> </Hint>
    </el-option>
    <el-option :label="`可支付`" :value="`payable`">
      <span class="l-option-label">可支付</span>
      <Hint content="可支付、读取/修改合约存储"> </Hint>
    </el-option>
    <el-option :label="`仅查看`" :value="`view`">
      <span class="l-option-label">仅查看</span>
      <Hint
        content="不可支付、修改合约存储，可读取合约存储（调用开销小于默认模式）"
      >
      </Hint>
    </el-option>
    <el-option :label="`纯调用`" :value="`pure`">
      <span class="l-option-label">纯调用</span>
      <Hint content="不可支付、不可读取/修改合约存储（调用开销小于查看模式）">
      </Hint>
    </el-option>
  </el-select>

  <!-- 调用行为简化版 为构造函数设计 -->
  <el-select
    v-else-if="mode == 'behavior-simple' && donothing()"
    @change="refreshVars()"
    v-model="item.value"
  >
    <el-option :label="'默认模式'" :value="``">
      <span class="l-option-label">默认模式</span>
      <Hint content="不可支付，但可读取/修改合约存储"> </Hint>
    </el-option>
    <el-option :label="`可支付`" :value="`payable`">
      <span class="l-option-label">可支付</span>
      <Hint content="可支付、读取/修改合约存储"> </Hint>
    </el-option>
  </el-select>

  <!-- 存储位置 -->
  <el-select
    v-else-if="mode == 'store' && donothing()"
    @change="refreshVars()"
    v-model="item.value"
  >
    <el-option :label="'默认模式'" :value="``">
      <span class="l-option-label">默认模式</span>
      <Hint content="跟随默认设置，"> </Hint>
    </el-option>
    <el-option :label="`存储引用`" :value="`storage`">
      <span class="l-option-label">存储引用</span>
      <Hint
        content="成为另一个变量的别称 <br>修改该变量给该变量赋值的变量也会修改"
      >
      </Hint>
    </el-option>
    <el-option :label="`存储数值`" :value="`memory`">
      <span class="l-option-label">存储数值</span>
      <Hint
        content="新开辟一块内存区域存储该值 <br>修改该变量给该变量赋值的变量不会修改）"
      >
      </Hint>
    </el-option>
  </el-select>
</template>

<script>
import Hint from "./Hint";

export default {
  props: {
    mode: {
      type: String,
      required: false,
    },
    item: {
      type: Object,
      required: true,
    },
  },
  components: {
    Hint,
  },
  methods: {
    refreshVars: function () {
      console.log("in here ", this.item);
      this.$store.dispatch("logic/refreshVars");
    },
    donothing: function () {
      // console.log("do nothing");
      // console.log("item is", this.item);
      return true;
    },
  },
};
</script>

<style scoped lang="scss">
.el-select-dropdown__item {
  display: flex;
  align-items: center;
}
</style>
