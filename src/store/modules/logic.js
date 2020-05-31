function VarFind(items, location, locationName, list) {
  for (let i = 0; i < items.length; i++) {
    // 有名字一定是变量，注册之
    if (items[i].contents === undefined) {
      continue;
    }
    if (items[i].contents.name !== undefined) {
      list.push(
        JSON.parse(
          JSON.stringify({
            type: items[i].type,
            name: items[i].contents.name.value,
            location: location.concat([i]),
            locationName: locationName.concat([items[i].contents.name.value]),
            creatorId: items[i].id,
          })
        )
      );
    }
    // 没东西了，结束了
    if (JSON.stringify(items[i].elements) == "[]") {
      continue;
    }
    // 有名字记名字，没名字记编号
    if (items[i].contents.name !== undefined) {
      VarFind(
        items[i].elements,
        location.concat(JSON.parse(JSON.stringify(i))),
        locationName.concat([items[i].contents.name.value]),
        list
      );
    } else {
      VarFind(
        items[i].elements,
        location.concat(JSON.parse(JSON.stringify(i))),
        locationName.concat([String(i + 1)]),
        list
      );
    }
  }
}

// 注册所有元素的索引
function allElements(els, location) {
  for (let i = 0; i < els.length; i++) {
    state.varMap.set(els[i].id, location.concat(i));
    if (els[i].elements.length > 0) {
      allElements(els[i].elements, location.concat(i));
    }
  }
}

// 变量
function VarLogin(mode = "normal") {
  state.varMap.clear();
  allElements(state.elements, [0]);
  // 保证不会乱指
  if (mode == "normal") {
    for (
      let i = 1;
      i < Math.min(state.locationId.length, state.location.length);
      i++
    ) {
      if (
        getAttributes(state.location.slice(0, i + 1)).id != state.locationId[i]
      ) {
        state.location.splice(i + 1);
        break;
      }
    }
  }
  state.varAlready.length = 0;
  state.varPotential.length = 0;
  state.locationName.splice(1);
  state.locationId.splice(1);
  let item = {
    elements: state.elements,
  };
  // 搜索每一层
  // 为已知变量服务
  for (let i = 0; i < state.location.length; i++) {
    state.varAlready.push([]);
    // 搜索该层中每个元素
    for (let j = 0; j < item.elements.length; j++) {
      // 如果有名字那肯定是变量，记下来
      if (item.elements[j].contents.name !== undefined) {
        // console.log("item :", item.elements[j]);
        state.varAlready[i].push(
          JSON.parse(
            JSON.stringify({
              type: item.elements[j].type,
              name: item.elements[j].contents.name.value,
              location: state.location.slice(0, i + 1).concat([j]),
              locationName: state.locationName
                .slice(0, i + 1)
                .concat(item.elements[j].contents.name.value),
              creatorId: item.elements[j].id,
            })
          )
        );
        // if (varAlready[i].type == 'struct') {
        //   for (let k = 0; k < item.elements[j].elements.length; k++) {
        //     varAlready[i].contents[
        //       item.elements[j].elements[k].contents.name.value
        //     ] = {
        //       type: item.elements[j].elements[k].type,
        //       name:
        //     };
        //   }
        // }
      }
    }
    // 进入下一层前的准备
    if (i + 1 < state.location.length) {
      // 加入下一层 locationName
      // 如果有名字 加名字
      if (item.elements[state.location[i + 1]].contents.name !== undefined) {
        state.locationName.push(
          item.elements[state.location[i + 1]].contents.name.value
        );
      }
      // 如果没名字，加位置
      else {
        state.locationName.push(String(state.location[i + 1] + 1));
      }
      state.locationId.push(item.elements[state.location[i + 1]].id);
      // 提升item
      item = item.elements[state.location[i + 1]];
    }
  }
  // 为潜在变量服务
  for (let i = 0; i < item.elements.length; i++) {
    // 弄个东西
    state.varPotential.push({
      name:
        item.elements[i].contents.name !== undefined
          ? item.elements[i].contents.name.value
          : String(i + 1),
      vars: [],
    });
    // 弄好丢到vars里
    VarFind(
      item.elements[i].elements,
      state.location.concat(i),
      state.locationName.concat(
        item.elements[i].contents.name !== undefined
          ? item.elements[i].contents.name.value
          : String(i + 1)
      ),
      state.varPotential[i].vars
    );
  }
  // 最后再转换一下
  state.code = "";
  state.code = codeInit();
  console.log("after");
}

// 通过一个地址找到指定的东西
function getAttributes(location) {
  // 找到元素
  console.log("location is in get:", location);
  let temp = { elements: state.elements };
  for (let i = 1; i < location.length; i++) {
    temp = temp.elements[location[i]];
    console.log(("temp: ", temp));
  }
  return JSON.parse(JSON.stringify(temp));
}

// 对constructor的特判函数
function getName(item) {
  return item.contents.name != undefined
    ? " " + item.contents.name.value
    : " " + item.contents.discribe.value;
}

// 浓缩元素的函数（标准化一下）
function varSimplify(item) {
  let temp = {
    name: getName(item),
    value: null,
    elements: [],
    useEle: false,
    show: true,
    type: item.type,
    creatorId: item.id,
  };
  // 如果是结构体那加一层

  if (item.categories != undefined) {
    temp.categories = item.categories;
  }
  if (item.type == "struct") {
    temp.value = {};
    temp.value = item.contents.value.value;
  }
  if (item.type == "contract") {
    temp.value = {};

    for (let i = 0; i < item.contents.param.value.length; i++) {
      temp.value[getName(item.contents.param[i])] = varSimplify(
        item.contents.param[i]
      );
    }
  }
  return temp;
}
// 从记录在案的变量如何变成实际纸上的变量
function createVar(item, attrs = null) {
  if (attrs == null) {
    attrs = getAttributes(item.location);
  }
  // console.log("item.type:", item.type);

  // 如果是结构体构建器

  if (item.type == "struct_creator") {
    let temp = {
      type: item.type.split("_")[0],
      name: "创建 " + item.name,
      elements: [],
      contents: {
        name: {
          name: "名字",
          value: "",
          show: true,
          use: false,
        },
        value: {
          name: "初值",
          value: {},
          elements: [],
          show: false,
        },
        store: {
          name: "存储方式",
          value: "",
          show: false,
          use: false,
        },
      },
      creatorId: item.creatorId,
    };
    console.log("here1");
    // 如果是普通的元素那么记下来
    for (let i = 0; i < attrs.elements.length; i++) {
      temp.contents.value.value[getName(attrs.elements[i])] = varSimplify(
        attrs.elements[i]
      );
    }
    console.log("here2");
    return JSON.parse(JSON.stringify(temp));
  }

  // 处理合约
  else if (item.type == "contract_creator") {
    let temp = {
      type: item.type.split("_")[0],
      name: "创建 " + item.name,
      elements: [],
      contents: {
        name: {
          name: "名字",
          value: "",
          show: true,
        },
        value: {
          name: "参数值",
          value: {},
          show: true,
        },
        store: {
          name: "存储方式",
          value: "",
          show: false,
          use: false,
        },
      },

      // id: this.$store.state.logic.globalId,
      creatorId: item.creatorId,
    };
    console.log("here11");
    // 只需要找参数即可
    for (let i = 0; i < attrs.elements.length; i++) {
      if (attrs.elements[i].type == "constructor") {
        for (
          let j = 0;
          j < attrs.elements[i].contents.param.value.length;
          j++
        ) {
          temp.contents.value.value[
            getName(attrs.elements[i].contents.param.value[j])
          ] = varSimplify(attrs.elements[i].contents.param.value[j]);
        }
        break;
      }
    }
    console.log("here22");
    return JSON.parse(JSON.stringify(temp));
  }

  // 处理函数
  else if (["function_creator"].includes(item.type)) {
    console.log("function start");
    let temp = {
      type: item.type.split("_")[0],
      name: item.name,
      elements: [],
      contents: {
        param: {
          name: "参数赋值",
          value: {},
          show: true,
        },
        value: {
          name: "返回值处理",
          value: {
            returns: {
              name: "接收返回值",
              value: attrs.contents.returns.value.concat([]).fill({
                value: null,
                elements: [],
                useEle: false,
                show: true,
              }),
              contents: {},
            },
            use: {
              name: "使用返回值",
              contents: {},
            },
          },
          key: "returns",
          show: true,
        },
      },
      // id: this.$store.state.logic.globalId,
      creatorId: item.creatorId,
    };

    for (let i = 0; i < attrs.contents.param.value.length; i++) {
      temp.contents.param.value[
        getName(attrs.contents.param.value[i])
      ] = varSimplify(attrs.contents.param.value[i]);
    }
    console.log("here11");
    return JSON.parse(JSON.stringify(temp));
  }

  // 处理装饰器
  else if (["modifier"].includes(item.type)) {
    console.log("function start");
    let temp = {
      type: item.type + "_var",
      name: item.name,
      elements: [],
      contents: {
        param: {
          name: "参数赋值",
          value: {},
          show: true,
        },
      },
      // id: this.$store.state.logic.globalId,
      creatorId: item.creatorId,
    };

    for (let i = 0; i < attrs.contents.param.value.length; i++) {
      temp.contents.param.value[
        getName(attrs.contents.param.value[i])
      ] = varSimplify(attrs.contents.param.value[i]);
    }
    console.log("here11");
    return JSON.parse(JSON.stringify(temp));
  }

  // 没有附加属性
  else if (["uint", "int"].includes(item.type)) {
    let temp = {
      type: item.type + "_var",
      name: item.name,
      elements: [],
      contents: {},
      value: {
        type: item.type,
        name: item.name,
        categories: attrs.contents.categories.value,
      },
      // id: this.$store.state.logic.globalId,
      creatorId: item.creatorId,
    };

    return JSON.parse(JSON.stringify(temp));
  }
  // 抵制的处理与上面类似但不具有区分
  else if (["address", "bool"].includes(item.type)) {
    let temp = {
      type: item.type + "_var",
      name: item.name,
      elements: [],
      contents: {},
      value: {
        type: item.type,
        name: item.name,
      },
      // id: this.$store.state.logic.globalId,
      creatorId: item.creatorId,
    };

    return JSON.parse(JSON.stringify(temp));
  }

  // 可以选取元素
  else if (["byteArray"].includes(item.type)) {
    let temp = {
      type: item.type + "_var",
      name: item.name,
      elements: [],
      contents: {
        value: {
          name: "选取属性",
          value: {
            self: {
              name: "本身",
              contents: {},
              elements: [],
            },
            // 数组第几个元素
            number: {
              name: "选取元素",
              value: null,
              contents: {},
              elements: [],
              useEle: false,
              show: true,
            },
            length: {
              name: "数组长度",
              contents: {},
              elements: [],
            },
            push: {
              name: "添加元素",
              value: null,
              contents: {},
              elements: [],
              useEle: false,
              show: true,
            },
          },
          key: "self",
          show: true,
        },
      },
      // 后面可能可以删掉
      value: {
        type: item.type,
        name: item.name,
        categories: attrs.contents.categories.value,
      },
      // id: this.$store.state.logic.globalId,
      creatorId: item.creatorId,
    };

    return JSON.parse(JSON.stringify(temp));
  }
  // 对数组的处理
  else if (["array"].includes(item.type)) {
    let temp = {
      type: "array_var",
      name: item.name,
      elements: [],
      contents: {
        value: {
          name: "选取属性",
          value: {
            self: {
              name: "本身",
              contents: {},
              elements: [],
            },
            pointer: {
              name: "映射键对应元素",
              value: null,
              type: {},
              elements: [],
              contents: {},
              useEle: false,
              show: true,
            },
          },
          key: "self",
          show: true,
        },
      },
      creatorId: item.creatorId,
    };

    temp.contents.value.value.pointer.type = createVar(
      {
        type: attrs.contents.type.value.type,
        name: "",
      },
      getValue(attrs, "type")
    );

    // if (attrs.contents.type.value.type == "array") {
    //   temp.contents.value.value.pointer.contents.type = createVar(
    //     {
    //       type: attrs.contents.type.value.type,
    //       name: attrs.contents.name.value,
    //     },
    //     attrs.contents.type.value
    //   );
    // } else if (attrs.contents.type.value.type == "mapping") {
    //   temp.contents.value.value.pointer.contents.type = createVar(
    //     {
    //       type: attrs.contents.type.value.type,
    //       name: attrs.contents.name.value,
    //     },
    //     attrs.contents.type.value
    //   );
    // }
    return JSON.parse(JSON.stringify(temp));
  }
  // 映射
  else if (["mapping"].includes(item.type)) {
    console.log("mapping item:", item);
    let temp = {
      type: item.type + "_var",
      name: item.name,
      elements: [],
      contents: {
        // 数组第几个元素
        value: {
          name: "选取属性",
          value: {
            self: {
              name: "本身",
              contents: {},
              elements: [],
            },
            pointer: {
              name: "映射键对应元素",
              value: null,
              type: {},
              elements: [],
              contents: {},
              useEle: false,
              show: true,
            },
          },
          key: "self",
          show: true,
        },
      },
    };

    temp.contents.value.value.pointer.type = createVar(
      {
        type: attrs.contents.type.value.type,
        name: attrs.contents.name.value,
      },
      getValue(attrs, "to")
    );

    // if (attrs.contents.to.value.type == "array") {
    //   temp.contents.value.value.pointer.contents.type = createVar(
    //     {
    //       type: attrs.contents.to.value.type,
    //       name: attrs.contents.name.value,
    //     },
    //     attrs.contents.to.value
    //   );
    // } else if (attrs.contents.to.value.type == "mapping") {
    //   temp.contents.value.value.pointer.contents.type = createVar(
    //     {
    //       type: attrs.contents.to.value.type,
    //       name: attrs.contents.name.value,
    //     },
    //     attrs.contents.to.value
    //   );
    // }
    return JSON.parse(JSON.stringify(temp));
  }

  // 合约和结构体
  else if (["struct", "contract"].includes(item.type)) {
    // 找到创建者
    let father = getAttributes(state.varMap.get(attrs.creatorId));
    let temp = {
      type: item.type + "_var",
      name: attrs.contents.name.value,
      elements: [],
      contents: {
        value: {
          name: "使用属性",
          value: {
            self: {
              name: "本身",
              contents: {},
              elements: {},
            },
          },
          elements: [],
          key: "self",
          show: true,
        },
      },

      // id: this.$store.state.logic.globalId,
      creatorId: item.creatorId,
    };
    console.log("here33");
    console.log("attrs:", attrs);

    // 递归寻找内容物
    for (let i = 0; i < father.elements.length; i++) {
      // 对装饰器特判
      if (father.elements[i].type == "modifier") {
        continue;
      }
      // 这个是对构造函数的特判
      console.log("element name:", father.elements[i]);
      if (father.elements[i].contents.name != undefined) {
        temp.contents.value.value[getName(father.elements[i])] = createVar({
          type: father.elements[i].type,
          name: getName(father.elements[i]),
          location: state.varMap.get(father.elements[i].id),
          creatorId: father.id,
        });
      }
    }

    console.log("here44");
    return JSON.parse(JSON.stringify(temp));
  }
}

// 之后是转换函数
// 之后是转换函数
// 之后是转换函数
// 之后是转换函数
// 之后是转换函数

// 初始化
function codeInit() {
  let temp = `\npragma solidity >=0.4.22 <0.7.0;\n\n`;
  console.log("before el");
  for (let i = 0; i < state.elements.length; i++) {
    console.log("el ", i);
    temp += codeElements(state.elements[i], "");
  }
  return temp;
}

// 处理参数
function codeParam(params, simple = false) {
  if (params.length == 0) {
    if (simple == true) {
      return "";
    } else {
      return "()";
    }
  } else {
    let temp = [];
    for (let i = 0; i < params.length; i++) {
      // if (returns[i].categories != undefined) {
      //   temp.push(returns[i].categories.value);
      // } else {
      //   temp.push(returns[i].type);
      // }
      switch (params[i].type) {
        case "byteArray":
        case "array": {
          temp.push(
            `${params[i].categories.value}[] memory ${getName(params[i])}`
          );
          break;
        }

        default: {
          temp.push(`${params[i].categories.value} ${getName(params[i])}`);
          break;
        }
      }
    }
    return `(${temp.join(", ")}) `;
  }
}
// 处理返回值
function codeReturns(returns) {
  if (returns.length == 0) {
    return "";
  } else {
    let temp = [];
    for (let i = 0; i < returns.length; i++) {
      if (returns[i].categories != undefined) {
        temp.push(returns[i].categories.value);
      } else {
        temp.push(returns[i].type);
      }
    }
    return `returns (${temp.join(", ")}) `;
  }
  // 处理函数返回值
}
// 处理装饰器
function codeModifiers(modifiers) {
  // 处理函数装饰器
  if (modifiers.length == 0) {
    return "";
  } else {
    let temp = [];
    for (let i = 0; i < modifiers.length; i++) {
      if (
        JSON.stringify(modifiers[i].elements[0].contents.param.value) != "{}"
      ) {
        temp.push(
          `${modifiers[i].elements[0].name}(${Object.keys(
            modifiers[i].elements[0].contents.param.value
          )
            .filter((x) => x != "name")
            .join(", ")}) `
        );
      } else {
        temp.push(`${modifiers[i].elements[0].name} `);
      }
    }
    return `${temp.join(" ")} `;
  }
}

function emptyExpression(item) {
  let temp = true;
  if (["struct", "contract"].includes(item.type)) {
    for (let x in item.value) {
      temp = temp && emptyExpression(item.value[x], "struct");
    }
  } else {
    temp =
      item.elements.length == 0 &&
      (item.value == null || item.value.length == 0);
  }
  return temp;
  // return false;
}

// 处理表达式
function codeExpression(item) {
  if (item.useEle == false) {
    if (item.value != null) {
      return item.value;
    } else {
      return "";
    }
  }
  return codeBody(item.elements[0], "");
}

// 快捷找参数（好看点）
function getValue(item, key) {
  // console.log("item:", item, "key:", key);
  if (key == "name" && item.contents[key].value.length > 0) {
    return " " + item.contents[key].value;
  }
  return typeof item.contents[key].value == "string" &&
    item.contents[key].value.length > 0
    ? " " + item.contents[key].value
    : item.contents[key].value;
}

// 直接获得传递的参数
function getParams(value, mode = "normal") {
  let arr = Object.keys(value).map((x) => value[x]);
  console.log("value is", value);
  console.log("mode is ", mode);
  if (mode == "normal") {
    return `${arr.map((x) => codeExpression(x)).join(",")}`;
  } else if (mode == "struct") {
    return `{${arr
      .filter((x) => !emptyExpression(x))
      .map((x) => {
        if (["struct", "contract"].includes(x.type)) {
          return x.name + " : " + getParams(x.value, "struct") + " ";
        }
        return x.name + " : " + codeExpression(x) + " ";
      })
      .join(",")}}`;
  }
}

// 删除尾巴
function codeBody(item, space = "", addition = "") {
  let temp = codeElements(item, space, addition);
  // console.log("item is:", item);
  // console.log("temp is:", temp);
  return temp.split(";\n")[0];
}

// 处理元素
function codeElements(item, space = "", addition = "") {
  let temp;
  // console.log("type is:", item.type);
  switch (item.type) {
    case "contract_creator": {
      temp = `contract${getName(item)} {\n`;
      for (let i = 0; i < item.elements.length; i++) {
        temp += codeElements(item.elements[i], space.concat("    "));
      }
      temp += `}\n`;
      break;
    }
    case "function_creator": {
      temp = `${space}function${getName(item)}${codeParam(
        getValue(item, "param")
      )}${getValue(item, "type")}${getValue(item, "behavior")}${codeModifiers(
        getValue(item, "modifiers")
      )}${codeReturns(getValue(item, "returns"))} {\n`;
      for (let i = 0; i < item.elements.length; i++) {
        temp += codeElements(item.elements[i], space.concat("    "));
      }
      temp += `${space}}\n`;
      break;
    }
    case "constructor": {
      temp = `${space}constructor${codeParam(
        getValue(item, "param")
      )} ${getValue(item, "type")}${getValue(item, "behavior")}${codeModifiers(
        getValue(item, "modifiers")
      )}{\n`;
      for (let i = 0; i < item.elements.length; i++) {
        temp += codeElements(item.elements[i], space.concat("    "));
      }
      temp += `${space}}\n`;
      break;
    }
    case "struct_creator": {
      temp = `${space}struct${getName(item)} {\n`;
      for (let i = 0; i < item.elements.length; i++) {
        temp += codeElements(item.elements[i], space.concat("    "));
      }
      temp += `${space}}\n`;
      break;
    }
    case "modifier": {
      temp = `${space}modifier ${getName(item)}${codeParam(
        getValue(item, "param")
      )} {\n`;
      for (let i = 0; i < item.elements.length; i++) {
        temp += codeElements(item.elements[i], space.concat("    "));
      }
      temp += `${space}}\n`;
      break;
    }
    case "modifier__inner": {
      temp = `${space}_;\n`;
      break;
    }
    case "function": {
      if (item.contents.value.key == "returns") {
        // 这句真的太长了。。先取param 的 key 然后用 key 找到元素数组，在对元素数组的每个元素用 codeExpression 再join
        temp = `${space}(${getValue(item, "value")
          .returns.value.map((x) => codeExpression(x))
          .join(",")}) = ${addition}${item.name}${getParams(
          getValue(item, "param")
        )};\n`;
      } else if (item.contents.value.key == "use") {
        temp = `${addition}${item.name}${getParams(getValue(item, "param"))}`;
      }
      break;
    }
    case "contract":
    case "struct": {
      let type = `${addition}${item.name.split(" ")[1]}`;
      if (
        Object.keys(getValue(item, "value")).length > 0 &&
        Object.keys(getValue(item, "value"))
          .map((x) => getValue(item, "value")[x])
          .some((x) => !emptyExpression(x))
      ) {
        temp = `${space}${type}${getValue(item, "store")}${getValue(
          item,
          "name"
        )} = ${item.type == "contract" ? "new " : ""}${type}(${getParams(
          getValue(item, "value"),
          "struct"
        )});\n`;
      } else {
        temp = `${space}${type}${getValue(item, "name")};\n`;
      }
      break;
    }
    case "modifier_var": {
      if (Object.keys(getValue(item, "value")).length > 0) {
        temp = `${item.name}${getParams(getValue(item, "param"))} `;
      } else {
        temp = `${item.name} `;
      }
      break;
    }
    // default:
    case "contract_var":
    case "struct_var": {
      if (item.contents.value.key == "self") {
        temp = `${addition}${item.name}`;
      } else {
        temp = codeBody(
          getValue(item, "value")[item.contents.value.key],
          space,
          `${addition}${item.name}.`
        );
      }
      break;
    }
    case "uint":
    case "int":
    case "bool":
    case "address":
    case "byteArray": {
      // console.log("here in uint");
      // console.log("item is", item);
      let type = item.type;
      if (item.contents.categories != undefined) {
        type = getValue(item, "categories").split(" ").join("");
      }

      temp = `${space}${type}${getValue(item, "store")}${getValue(
        item,
        "name"
      )}`;
      if (!emptyExpression(item.contents.value)) {
        temp += ` = ${codeExpression(item.contents.value)}`;
      }
      temp += `;\n`;
      break;
    }
    // **口子**
    case "uint_var":
    case "int_var":
    case "bool_var":
    case "address_var": {
      temp = `${space}${item.name}`;
      break;
    }
    case "byteArray_var": {
      temp = `${space}${item.name}`;
      switch (item.contents.value.key) {
        case "self": {
          break;
        }
        case "number": {
          temp += `[${codeExpression(getValue(item, "value").number)}]`;
          break;
        }
        case "length": {
          temp += `.length`;
          break;
        }
        case "push": {
          temp += `.push(${codeExpression(getValue(item, "value").push)})`;
        }
      }
      temp += `;\n`;
      break;
    }
    case "mapping": {
      // 后半部分
      temp = `${space}mapping(${codeBody(getValue(item, "from"))
        .split(" ")
        .join("")} => ${codeBody(getValue(item, "to"))})`;
      if (!emptyExpression(item.contents.value)) {
        temp += ` storage`;
      }
      temp += `${getValue(item, "name")}`;
      if (!emptyExpression(item.contents.value)) {
        temp += ` = ${codeExpression(item.contents.value)}`;
      }
      temp += `;\n`;
      break;
    }
    case "array": {
      // console.log("i'm array");
      // console.log("additon is ", addition);
      if (getValue(item, "type").type != "array") {
        temp = `${space}${codeBody(getValue(item, "type"))}${addition}[${
          getValue(item, "len") != null
            ? getValue(item, "len").split(" ")[1]
            : ""
        }]${getValue(item, "store")}${getValue(item, "name")};\n`;
      } else {
        temp = `${space}${codeBody(
          getValue(item, "type"),
          "",
          addition +
            "[" +
            (getValue(item, "len") != null
              ? getValue(item, "len").split(" ")[1]
              : "") +
            "]"
        )}${getValue(item, "name")}`;
      }
      if (!emptyExpression(item.contents.value)) {
        temp += ` = ${codeExpression(item.contents.value)}`;
      }
      temp += `;\n`;

      // console.log("temp is ", temp);
      break;
    }
    case "array_var":
    case "mapping_var": {
      temp = `${space}${item.name}`;

      switch (item.contents.value.key) {
        case "self": {
          break;
        }
        case "pointer": {
          temp += `[${codeExpression(getValue(item, "value").pointer)}]`;
          temp += `${codeBody(getValue(item, "value").pointer.type)}`;
        }
      }
      temp += ";\n";
      break;
    }

    // **口子**
    case " + ":
    case " - ":
    case " * ":
    case " / ":
    case " % ":
    case " ** ":
    case " < ":
    case " > ":
    case " <= ":
    case " >= ":
    case " == ":
    case " != ":
    case " && ":
    case " || ":
    case " ! ":
    case " -":
    case " << ":
    case " >> ": {
      temp = `${space}`;
      if (item.contents.firstOP != undefined) {
        temp += codeExpression(item.contents.firstOP);
      }
      temp += `${item.type}`;
      temp += codeExpression(item.contents.lastOP);
      break;
    }
    case " = ": {
      temp = `${space}${codeBody(getValue(item, "firstOP"))} = ${codeBody(
        getValue(item, "lastOP")
      )};\n`;
      break;
    }
    case "if":
    case "else":
    case "else if":
    case "while(true)": {
      temp = `${space} `;
      if (item.contents.condition != undefined) {
        temp += `(${codeExpression(item.contents.condition)}) `;
      }
      temp += `{\n`;
      for (let i = 0; i < item.elements.length; i++) {
        temp += codeBody(item.elements[i], space.concat(`  `));
      }
      temp += `}\n`;
      break;
    }
    case "break":
    case "continue": {
      temp = `${space}${item.type};\n`;
      break;
    }
    case "return": {
      temp = `${space}return (${getValue(item, "value")
        .map((x) => codeExpression(x))
        .join(",")})`;
      break;
    }
    case "block.coinbase":
    case "block.gaslimit":
    case "block.number":
    case "block.timestamp":
    case "gasleft()":
    case "msg.data":
    case "msg.sender":
    case "msg.sig":
    case "msg.value":
    case "tx.gasprice":
    case "tx.origin":
    case "this": {
      temp = `${space}${item.type};\n`;
      break;
    }
    case "conversion": {
      temp = `${
        getValue(item, "target").contents.categories != undefined
          ? getValue(getValue(item, "target"), "categories")
          : getValue(item, "target").type
      }(${codeExpression(item.contents.value)})`;
      break;
    }
    case "blockhash": {
      temp = `blockhash(${codeExpression(item.contents.index)})`;
      break;
    }
    case "addmod":
    case "mulmod": {
      temp = `${item.type}(${codeExpression(
        item.contents.firstOP
      )},${codeExpression(item.contents.secondOP)},${codeExpression(
        item.contents.lastOP
      )})`;
      break;
    }
    case "keccak256":
    case "sha256":
    case "ripemd160": {
      temp = `${item.type}(abi.encodePacked(${getValue(item, "param")
        .map((x) => codeExpression(x))
        .join(",")}))`;
      break;
    }
    case "ecrecover": {
      temp = `ecrecover(${codeExpression(item.contents.hash)},${codeExpression(
        item.contents.v
      )},${codeExpression(item.contents.r)},${codeExpression(
        item.contents.s
      )})`;
      break;
    }
    case "balance": {
      temp = `${codeExpression(item.contents.address)}.balance`;
      break;
    }
    case "transfer":
    case "send": {
      temp = `${space}${codeExpression(item.contents.address)}.${
        item.type
      }${codeExpression(item.contents.amount)}`;
      break;
    }
    case "call":
    case "delegatecall": {
      temp = `${space}${codeExpression(item.contents.address)}.${item.type}${
        item.contents.amount != undefined &&
        (getValue(item, "amount") != null || item.contents.amount.useEle)
          ? `.value(${codeExpression(item.contents.amount)})`
          : ``
      }${
        getValue(item, "gas") != null || item.contents.amount.useEle
          ? `.gas(${codeExpression(item.contents.gas)})`
          : ``
      }(abi.encodeWithSignature(${[item.contents.function]
        .concat(getValue(item, "param"))
        .map((x) => codeExpression(x))
        .join(",")}));\n`;
      break;
    }
    case "selfdestruct": {
      temp = `${space}selfdestruct(${codeExpression(
        item.contents.address
      )});\n`;
      break;
    }
    case "require":
    case "revert": {
      temp = `${space}${item.type}(${[item.contents.condition]
        .concat([item.contents.message])
        .map((x) => codeExpression(x))
        .join(",")});\n`;
      break;
    }
    case "assert": {
      temp = `${space}assert(${codeExpression(item.contents.condition)});\n`;
      break;
    }
    case "none": {
      temp = "";
      break;
    }
  }
  return temp;
}

const map = new Map();

const state = {
  // 记录移动时的show情况
  ShowsOnMove: [],

  // 批量删除开关
  kill: false,

  // 判断是否开始了
  started: false,

  // 记录目标list
  MovedList: [],

  // 副代码区是否显示
  SubcodeToggle: false,

  // 用于保证元素id不冲突
  globalId: 10,

  // 空类型
  NoneType: {
    type: "none",
    name: "请选择类型",
    elements: [],
    contents: {},
    useEle: false,
  },

  typeRev: {
    int: "整数",
    bool: "真假值",
    address: "地址",
    byteArray: "字符数组",
    mapping: "映射",
    array: "数组",
    int_var: "整数变量",
    bool_var: "真假值变量",
    address_var: "地址变量",
    byteArray_var: "字符数组变量",
    mapping_var: "映射变量",
    array_var: "数组变量",
    function_creator: "创建函数",
    function: "函数",
    modifier: "创建装饰器",
    modifier__inner: "函数位置",
    contract_creator: "创建合约",
    contract: "合约",
    contract_var: "合约变量",
    struct_creator: "定义新类型",
    struct: "自定义类型",
    struct_var: "自定义类型变量",
  },

  // 空表达式
  NoneExpression: {
    name: "",
    value: null,
    elements: [],
    useEle: false,
    show: true,
  },

  // ParamTypes 的反向表，不用每次find
  revMapForParamTypes: {
    none: 0,
    uint: 1,
    int: 2,
    bool: 3,
    address: 4,
    byteArray: 5,
    mapping: 6,
    array: 7,
  },

  // 统计颜色
  color: {
    // 浅蓝: "#9CDCF0", //变量
    橙色: "#CE8349", // 字符串
    // 深蓝: "#569CD6", //类型
    绿色: "#006699", // 注释
    黄色: "#FFF119", // 函数名
    浅绿: "#4EC9B0", //对象
    紫色: "#C586C0", //条件
    粉红: "#FF5842", // 错误
  },

  // 测试用数据
  elements: [],

  // 用于存放转换后的代码
  code: "",

  showCode: false,

  // 注册所有变量
  varMap: map,

  // 现在代表的变量的位置
  // 内容为数字
  location: [0],

  // 用名字来表示的位置
  // 内容全为字符串
  locationName: ["base"],

  // 用于记录id 保证location不会乱指
  locationId: [0],

  // 必然能用的变量
  // 内容：
  // inner: {
  //   name: xxx,
  //   type: xxx,
  // },
  varAlready: [],

  // 潜在能用的变量
  // 内容
  // inner: {
  //   name: xxx, 该单元的内容
  //   vars: xxx, 该单元内变量的内容
  // },
  varPotential: [],

  // 待转换的逻辑
  transformer: [
    // 创建变量
    {
      type: "variable",
      name: "创建变量",
      group: { name: "logic", pull: "clone", put: false, revertClone: true },
      elements: [
        // uint类型
        {
          type: "uint",
          name: "非负整数",
          elements: [],

          contents: {
            name: {
              name: "名字",
              value: "",
              show: true,
              use: false,
            },

            value: {
              name: "初值",
              value: null,
              elements: [],
              useEle: false,
              show: false,
            },
            categories: {
              name: "上限",
              value: "uint256",
              show: false,
              use: true,
            },
            store: {
              name: "存储方式",
              value: "",
              show: false,
              use: false,
            },
          },
        },

        // int类型
        {
          type: "int",
          name: "整数",
          elements: [],

          contents: {
            name: {
              name: "名字",
              value: "",
              show: true,
              use: false,
            },

            value: {
              name: "初值",
              value: null,
              elements: [],
              useEle: false,
              show: false,
            },
            categories: {
              name: "上限",
              value: "int256",
              show: false,
              use: true,
            },
            store: {
              name: "存储方式",
              value: "",
              show: false,
              use: false,
            },
          },
        },

        // bool类型
        {
          type: "bool",
          name: "真假值",
          elements: [],

          contents: {
            name: {
              name: "名字",
              value: "",
              show: true,
              use: false,
            },
            value: {
              name: "初值",
              value: null,
              elements: [],
              useEle: false,
              show: false,
            },
            store: {
              name: "存储方式",
              value: "",
              show: false,
              use: false,
            },
          },
        },

        // 地址类型
        {
          type: "address",
          name: "地址",
          elements: [],

          contents: {
            name: {
              name: "名字",
              value: "",
              show: true,
              use: false,
            },
            value: {
              name: "初值",
              value: 0x0,
              elements: [],
              useEle: false,
              show: false,
            },
            store: {
              name: "存储方式",
              value: "",
              show: false,
              use: false,
            },
          },
        },

        // 字符数组类型，包括定长变长
        {
          type: "byteArray",
          name: "字符数组",
          elements: [],

          contents: {
            name: {
              name: "名字",
              value: "",
              show: true,
              use: false,
            },
            value: {
              name: "初值",
              value: "",
              elements: [],
              useEle: false,
              show: false,
            },
            categories: {
              name: "上限",
              value: "byte32",
              show: false,
              use: true,
            },
            store: {
              name: "存储方式",
              value: "",
              show: false,
              use: false,
            },
          },
        },

        // 映射类型

        {
          type: "mapping",
          name: "映射",
          elements: [],

          contents: {
            name: {
              name: "名字",
              value: "",
              show: true,
              use: false,
            },
            value: {
              name: "初值",
              value: null,
              elements: [],
              useEle: false,
              show: false,
            },
            from: {
              name: "映射自",
              value: {
                type: "none",
                name: "请选择类型",
                elements: [],
                contents: {},
              },
              elements: [],
              show: true,
              use: true,
            },
            to: {
              name: "映射到",
              value: {
                type: "none",
                name: "请选择类型",
                elements: [],
                contents: {},
              },
              elements: [],
              show: true,
              use: true,
            },
          },
        },

        {
          type: "array",
          name: "数组",
          elements: [],

          contents: {
            name: {
              name: "名字",
              value: "",
              show: true,
              use: false,
            },
            value: {
              name: "初值",
              value: null,
              elements: [],
              useEle: false,
              show: false,
            },
            type: {
              name: "基本元素",
              value: {
                type: "none",
                name: "请选择类型",
                elements: [],
                contents: {},
              },
              elements: [],
              show: true,
              use: true,
            },
            len: {
              name: "最大长度",
              value: null,
              show: true,
              use: true,
            },
            store: {
              name: "存储方式",
              value: "",
              show: false,
              use: false,
            },
          },
        },
      ],
    },

    // 创建函数与合约相关的内容
    {
      type: "container",
      name: "创建函数与合约",
      group: { name: "logic", pull: "clone", put: false, revertClone: true },
      elements: [
        // 创建函数
        {
          type: "function_creator",
          name: "创建函数",
          elements: [],

          contents: {
            name: {
              name: "名字",
              value: "",
              show: true,
            },

            param: {
              name: "参数",
              value: [],
              show: true,
            },

            // 参数样式：
            // {
            //     类型：
            //     内容：{
            //
            //      }
            //
            // }
            returns: {
              name: "返回值",
              value: [],
              show: true,
            },

            // 外部可见性 internal 还是 external
            type: {
              name: "函数可见性",
              value: "",
              show: false,
            },

            behavior: {
              name: "调用行为",
              value: "",
              show: false,
            },

            modifiers: {
              name: "装饰器",
              value: [],
              show: false,
            },
          },

          show: true,
        },

        // 函数的样式，仅作记录
        // {
        //   type: "function",
        //   name: "xxx",
        //   elements: [],

        //   contents: {
        //     param: {
        //       name: "参数",
        //       value: [
        //       {

        //       },
        //       {

        //       }],
        //       show: true,
        //     },

        //     returns: {
        //       name: "返回值",
        //       value: [],
        //       show: true,
        //     },
        //   },

        //   show: true,
        // },

        // 创建装饰器
        {
          type: "modifier",
          name: "创建装饰器",
          // 函数位置
          elements: [
            {
              type: "modifier__inner",
              name: "装饰器函数位置",
              contents: {},
              elements: [],
            },
          ],

          contents: {
            name: {
              name: "名字",
              value: "",
              show: true,
            },

            param: {
              name: "参数",
              value: [],
              show: true,
            },

            // 参数样式：
            // {
            //     类型：
            //     名字：
            //     默认值：（可选）
            // }
          },

          show: true,
        },

        // 装饰器函数位置
        {
          type: "modifier__inner",
          name: "函数位置",
          contents: {},
          elements: [],
        },

        // 创建合约
        {
          type: "contract_creator",
          name: "创建合约",
          // 函数位置
          elements: [
            {
              type: "constructor",
              name: "合约构造函数",
              elements: [],
              contents: {
                discribe: {
                  value: "构造函数",
                  show: false,
                },
                param: {
                  name: "参数",
                  value: [],
                  show: false,
                },
                // 外部可见性
                type: {
                  name: "函数可见性",
                  value: "public",
                  show: false,
                },

                behavior: {
                  name: "调用行为",
                  value: "",
                  show: false,
                },
                modifiers: {
                  name: "装饰器",
                  value: [],
                  show: false,
                },
              },
              show: true,
            },
          ],

          contents: {
            name: {
              name: "名字",
              value: "",
              show: true,
            },
          },

          show: true,
        },

        // 合约构造函数 配套
        {
          type: "constructor",
          name: "合约构造函数",
          elements: [],
          contents: {
            discribe: {
              value: "构造函数",
              show: false,
            },
            param: {
              name: "参数",
              value: [],
              show: false,
            },
            // 外部可见性
            type: {
              name: "函数可见性",
              value: "public",
              show: false,
            },

            behavior: {
              name: "调用行为",
              value: "",
              show: false,
            },
            modifiers: {
              name: "装饰器",
              value: [],
              show: false,
            },
          },
          show: true,
        },

        // 构建结构体
        {
          type: "struct_creator",
          name: "定义新类型",
          elements: [],

          contents: {
            name: {
              name: "名字",
              value: "",
              show: true,
              use: true,
            },
          },
          show: true,
        },
      ],
    },

    // 运算操作
    // 运算操作
    // 运算操作
    // 运算操作
    // 运算操作
    // 运算操作

    {
      type: "operation",
      name: "运算",
      group: { name: "logic", pull: "clone", put: false, revertClone: true },
      elements: [
        // 等于
        {
          type: " = ",
          name: "等于 = ",
          elements: [],

          contents: {
            firstOP: {
              name: "",
              value: null,
              elements: [],
              useEle: false,
              show: true,
            },
            lastOP: {
              name: "",
              value: null,
              elements: [],
              useEle: false,
              show: true,
            },
          },
        },
        // 加法
        {
          type: " + ",
          name: "加法 + ",
          elements: [],

          contents: {
            firstOP: {
              name: "",
              value: null,
              elements: [],
              useEle: false,
              show: true,
            },
            lastOP: {
              name: "",
              value: null,
              elements: [],
              useEle: false,
              show: true,
            },
          },
        },
        // 减法
        {
          type: " - ",
          name: "减法 - ",
          elements: [],

          contents: {
            firstOP: {
              name: "",
              value: null,
              elements: [],
              useEle: false,
              show: true,
            },
            lastOP: {
              name: "",
              value: null,
              elements: [],
              useEle: false,
              show: true,
            },
          },
        },
        // 乘法
        {
          type: " * ",
          name: "乘法 * ",
          elements: [],

          contents: {
            firstOP: {
              name: "",
              value: null,
              elements: [],
              useEle: false,
              show: true,
            },
            lastOP: {
              name: "",
              value: null,
              elements: [],
              useEle: false,
              show: true,
            },
          },
        },
        // 除法
        {
          type: " / ",
          name: "除法 / ",
          elements: [],

          contents: {
            firstOP: {
              name: "",
              value: null,
              elements: [],
              useEle: false,
              show: true,
            },
            lastOP: {
              name: "",
              value: null,
              elements: [],
              useEle: false,
              show: true,
            },
          },
        },
        // 取余数
        {
          type: " % ",
          name: "取余数 % ",
          elements: [],

          contents: {
            firstOP: {
              name: "",
              value: null,
              elements: [],
              useEle: false,
              show: true,
            },
            lastOP: {
              name: "",
              value: null,
              elements: [],
              useEle: false,
              show: true,
            },
          },
        },
        // 幂
        {
          type: " ** ",
          name: "幂 ** ",
          elements: [],

          contents: {
            firstOP: {
              name: "",
              value: null,
              elements: [],
              useEle: false,
              show: true,
            },
            lastOP: {
              name: "",
              value: null,
              elements: [],
              useEle: false,
              show: true,
            },
          },
        },
        // 取负
        {
          type: " -",
          name: "取负 - ",
          elements: [],

          contents: {
            lastOP: {
              name: "",
              value: null,
              elements: [],
              useEle: false,
              show: true,
            },
          },
        },

        // 大于
        {
          type: " > ",
          name: "大于 > ",
          elements: [],

          contents: {
            firstOP: {
              name: "",
              value: null,
              elements: [],
              useEle: false,
              show: true,
            },
            lastOP: {
              name: "",
              value: null,
              elements: [],
              useEle: false,
              show: true,
            },
          },
        },
        // 小于
        {
          type: " < ",
          name: "小于 < ",
          elements: [],

          contents: {
            firstOP: {
              name: "",
              value: null,
              elements: [],
              useEle: false,
              show: true,
            },
            lastOP: {
              name: "",
              value: null,
              elements: [],
              useEle: false,
              show: true,
            },
          },
        },
        // 大于等于
        {
          type: " >= ",
          name: "大于等于 >= ",
          elements: [],

          contents: {
            firstOP: {
              name: "",
              value: null,
              elements: [],
              useEle: false,
              show: true,
            },
            lastOP: {
              name: "",
              value: null,
              elements: [],
              useEle: false,
              show: true,
            },
          },
        },
        // 小于等于
        {
          type: " <= ",
          name: "小于等于 <= ",
          elements: [],

          contents: {
            firstOP: {
              name: "",
              value: null,
              elements: [],
              useEle: false,
              show: true,
            },
            lastOP: {
              name: "",
              value: null,
              elements: [],
              useEle: false,
              show: true,
            },
          },
        },
        // 相等
        {
          type: " == ",
          name: "相等 == ",
          elements: [],

          contents: {
            firstOP: {
              name: "",
              value: null,
              elements: [],
              useEle: false,
              show: true,
            },
            lastOP: {
              name: "",
              value: null,
              elements: [],
              useEle: false,
              show: true,
            },
          },
        },
        // 不相等
        {
          type: " != ",
          name: "不相等 != ",
          elements: [],

          contents: {
            firstOP: {
              name: "",
              value: null,
              elements: [],
              useEle: false,
              show: true,
            },
            lastOP: {
              name: "",
              value: null,
              elements: [],
              useEle: false,
              show: true,
            },
          },
        },
        // 同真
        {
          type: " && ",
          name: "同真 && ",
          elements: [],

          contents: {
            firstOP: {
              name: "",
              value: null,
              elements: [],
              useEle: false,
              show: true,
            },
            lastOP: {
              name: "",
              value: null,
              elements: [],
              useEle: false,
              show: true,
            },
          },
        },
        // 存真
        {
          type: " || ",
          name: "存真 || ",
          elements: [],

          contents: {
            firstOP: {
              name: "",
              value: null,
              elements: [],
              useEle: false,
              show: true,
            },
            lastOP: {
              name: "",
              value: null,
              elements: [],
              useEle: false,
              show: true,
            },
          },
        },
        // 否定
        {
          type: " ! ",
          name: "否定 ! ",
          elements: [],

          contents: {
            lastOP: {
              name: "",
              value: null,
              elements: [],
              useEle: false,
              show: true,
            },
          },
        },
        // 左移位
        {
          type: " << ",
          name: "左移位 << ",
          elements: [],

          contents: {
            firstOP: {
              name: "",
              value: null,
              elements: [],
              useEle: false,
              show: true,
            },
            lastOP: {
              name: "",
              value: null,
              elements: [],
              useEle: false,
              show: true,
            },
          },
        },
        // 右移位
        {
          type: " >> ",
          name: "右移位 >> ",
          elements: [],

          contents: {
            firstOP: {
              name: "",
              value: null,
              elements: [],
              useEle: false,
              show: true,
            },
            lastOP: {
              name: "",
              value: null,
              elements: [],
              useEle: false,
              show: true,
            },
          },
        },
      ],
    },

    // 一些基础控制逻辑
    {
      type: "control",
      name: "逻辑控制",
      group: { name: "logic", pull: "clone", put: false, revertClone: true },
      elements: [
        {
          type: "if",
          name: "如果",
          elements: [],

          contents: {
            condition: {
              name: "条件",
              value: null,
              elements: [],
              useEle: false,
              show: true,
            },
          },
          show: true,
        },
        {
          type: "else if",
          name: "否则如果",
          elements: [],

          contents: {
            condition: {
              name: "条件",
              value: null,
              elements: [],
              useEle: false,
              show: true,
            },
          },
          show: true,
        },
        {
          type: "else",
          name: "否则",
          elements: [],

          contents: {},
          show: true,
        },
        {
          type: "while(true)",
          name: "循环",
          elements: [],

          contents: {},
        },
        {
          type: "break",
          name: "终止循环",
          elements: [],

          contents: {},
        },
        {
          type: "continue",
          name: "进入下一次循环",
          elements: [],

          contents: {},
        },
        {
          type: "return",
          name: "函数返回",
          elements: [],

          contents: {
            value: {
              name: "返回值",
              value: [],
              show: true,
            },
          },
        },
      ],
    },

    // 一些基础自带的属性
    {
      type: "property",
      name: "合约自带属性",
      group: { name: "logic", pull: "clone", put: false, revertClone: true },
      elements: [
        // 矿工地址
        {
          type: "block.coinbase",
          name: "矿工地址",
          elements: [],

          contents: {},
          hint: `返回记录该交易的矿工的地址<br>
          可用于给矿工小费<br>
          类型： 地址(address)<br>
          代码： block.coinbase`,
        },

        // 当前区块 gas 限额
        {
          type: "block.gaslimit",
          name: "gas 限额",
          elements: [],

          contents: {},
          hint: `返回当前区块的 gas 限额<br>
          类型： 256位的非负整数(uint)<br>
          代码： block.gaslimit`,
        },

        // 当前区块号
        {
          type: "block.number",
          name: "区块号",
          elements: [],

          contents: {},
          hint: `返回当前区块的区块号<br>
          类型： 256位的非负整数(uint)<br>
          代码： block.number`,
        },

        // 当前区块时间戳
        {
          type: "block.timestamp",
          name: "时间戳",
          elements: [],

          contents: {},
          hint: `自 unix epoch 起始到当前区块创建以秒计的时间戳<br>
          类型： 256位的非负整数(uint)<br>
          代码： block.timestamp`,
        },

        // 当前区块难度
        {
          type: "gasleft()",
          name: "当前区块难度",
          elements: [],

          contents: {},
          hint: `代码进行到当前步骤剩余的gas<br>
          类型： 256位的非负整数(uint)<br>
          代码： gasleft()`,
        },

        // 完整的 calldata
        {
          type: "msg.data",
          name: "消息调用数据",
          elements: [],

          contents: {},
          hint: `call 函数所携带的所有 data 信息<br>
          类型： 变长字节数组（bytes）<br>
          代码： msg.data`,
        },

        // 消息发送者
        {
          type: "msg.sender",
          name: "消息发送者",
          elements: [],

          contents: {},
          hint: `调用该条指令所在函数的调用者的地址<br>
          类型： 地址(address)<br>
          代码： msg.sender`,
        },

        // 消息调用前四位
        {
          type: "msg.sig",
          name: "消息函数标识符",
          elements: [],

          contents: {},
          hint: `调用信息的函数标识<br>
          类型： 长度为四字节的数组（bytes4）<br>
          代码： msg.sig`,
        },

        // 调用的费用
        {
          type: "msg.value",
          name: "消息附加费用",
          elements: [],

          contents: {},
          hint: `调用消息附带的以太币的价值<br>
          单位： wei（1 wei = 10^-18 ether, 1 ether 约等于 1500￥ ） <br>
          <span style="color:green">基于 合约自带方法：”xx调用(call/delegatecall)“</span><br>
          类型： 256位的非负整数（uint）<br>
          代码： msg.value`,
        },

        // 交易的gas价格
        {
          type: "tx.gasprice",
          name: "交易执行价格",
          elements: [],

          contents: {},
          hint: `执行交易的gas价格<br>
          gas价格决定程序每步操作的价格<br>
          更高的gas价格可让交易更快上链<br>
          单位： wei（1 wei = 10^-18 ether, 1 ether 约等于 1500￥ ） <br>
          <span style="color:green">基于 合约自带方法：”xx调用(call/delegatecall)“</span><br>
          类型： 256位的非负整数（uint）<br>
          代码： tx.gasprice`,
        },

        // 交易发起者
        {
          type: "tx.origin",
          name: "交易发起者",
          elements: [],

          contents: {},
          hint: `调用链的最初发起者<br>
          <span style="color:green">基于 合约自带方法：”xx调用(call/delegatecall)“</span><br>
          类型： 地址（address）<br>
          代码： tx.origin<br>
          <span style="color:red">可能产生意想不到的效果！请充分了解后谨慎使用！</span>`,
        },

        // this 指针
        {
          type: "this",
          name: "当前合约",
          elements: [],

          contents: {},
          hint: `当前合约的地址<br>
          类型： 当前合约（可被强制转换为地址类型）<br>
          代码： this`,
        },
      ],
    },

    // 一些基础自带的方法
    {
      type: "method",
      name: "合约自带方法",
      group: { name: "logic", pull: "clone", put: false, revertClone: true },
      elements: [
        // 强制类型转换
        {
          type: "conversion",
          name: "转换类型",
          elements: [],

          contents: {
            item: {
              name: "转换对象",
              value: "",
              elements: [],
              useEle: false,
              show: true,
            },
            target: {
              name: "目标类型",
              value: {
                type: "none",
                name: "请选择类型",
                elements: [],
                contents: {},
              },
              elements: [],
              show: true,
              use: true,
            },
          },
        },

        // 指定区块区块哈希
        {
          type: "blockhash",
          name: "区块哈希",
          elements: [],

          contents: {
            index: {
              name: "",
              value: null,
              elements: [],
              useEle: false,
              show: true,
            },
          },
          hint: `只可以指定最近的256个区块 <br>
          返回：bytes32 <br>
          代码：blockhash(uint8) <br>
          样例：blockhash(3)`,
        },

        // 加模
        {
          type: "addmod",
          name: "加模",
          elements: [],

          contents: {
            firstOP: {
              name: "操作数x",
              value: null,
              elements: [],
              useEle: false,
              show: true,
            },
            secondOP: {
              name: "操作数y",
              value: null,
              elements: [],
              useEle: false,
              show: true,
            },
            lastOP: {
              name: "模数k",
              value: null,
              elements: [],
              useEle: false,
              show: true,
            },
          },
          hint: `计算 (x + y) % k 的值<br>
          三个参数均为 256位的整数<br>
          返回： 256位的整数（uint）<br>
          代码： addmod(uint x, uint y, uint k) returns (uint)<br>
          样例：addmod(1,10,5) 该样例返回 1`,
        },

        // 乘模
        {
          type: "mulmod",
          name: "乘模",
          elements: [],

          contents: {
            firstOP: {
              name: "操作数x",
              value: null,
              elements: [],
              useEle: false,
              show: true,
            },
            secondOP: {
              name: "操作数y",
              value: null,
              elements: [],
              useEle: false,
              show: true,
            },
            lastOP: {
              name: "模数k",
              value: null,
              elements: [],
              useEle: false,
              show: true,
            },
          },
          hint: `计算 (x + y) % k 的值<br>
          三个参数均为 256位的整数<br>
          返回： 256位的整数（uint）<br>
          代码： mul(uint x, uint y, uint k) returns (uint)<br>
          样例：mulmod(2,3,5) 该样例返回 1`,
        },

        // Ethereum-SHA-3 （Keccak-256）哈希
        {
          type: "keccak256",
          name: "哈希(Keccak-256)",
          elements: [],

          contents: {
            param: {
              name: "参数",
              value: [],
              show: true,
            },
          },
          hint: `计算紧打包内容的 Ethereum-SHA-3 （Keccak-256）哈希值<br>
          参数个数没有限制，但必须有清晰的类型<br>
          返回：32字节的字节数组<br>
          代码：keccak256(abi.encodePacked(#内容#)) returns (bytes32)<br>
          样例：keccak256(abi.encodePacked("abc",uint(123),b))<br>
          sha3与keccak256等价<br>
          <span style="color:yellow">最常用<span>`,
        },

        // sha256 哈希
        {
          type: "sha256",
          name: "哈希(sha256)",
          elements: [],

          contents: {
            param: {
              name: "参数",
              value: [],
              show: true,
            },
          },
          hint: `计算紧打包内容的 Ethereum-SHA-3 （Keccak-256）哈希值<br>
          参数个数没有限制，但必须有清晰的类型<br>
          返回：32字节的字节数组<br>
          代码：sha256(abi.encodePacked(#内容#)) returns (bytes32)<br>
          样例：sha256(abi.encodePacked("abc",uint(123),b))<br>
          <span style="color:yellow">最常用<span>`,
        },

        //  RIPEMD-160 哈希
        {
          type: "ripemd160",
          name: "哈希(RIPEMD-160)",
          elements: [],

          contents: {
            param: {
              name: "参数",
              value: [],
              show: true,
            },
          },
          hint: `计算紧打包内容的 RIPEMD-160 哈希值<br>
          参数个数没有限制，但必须有清晰的类型<br>
          返回：20字节的字节数组<br>
          代码：ripemd160(abi.encodePacked(#内容#)) returns (bytes20)<br>
          样例：ripemd160(abi.encodePacked("abc",uint(123),b))<br>`,
        },

        //  椭圆曲线哈希
        {
          type: "ecrecover",
          name: "哈希(椭圆曲线)",
          elements: [],

          contents: {
            hash: {
              name: "签名",
              value: null,
              elements: [],
              useEle: false,
              show: true,
            },
            v: {
              name: "v",
              value: null,
              elements: [],
              useEle: false,
              show: true,
            },
            r: {
              name: "r",
              value: null,
              elements: [],
              useEle: false,
              show: true,
            },
            s: {
              name: "s",
              value: null,
              elements: [],
              useEle: false,
              show: true,
            },
          },
          hint: `计算 椭圆曲线(ecrecover) 哈希值<br>
          可用于验证签名<br>
          返回：20字节的字节数组<br>
          代码：ecrecover(bytes32 hash, uint8 v, bytes32 r, bytes32 s) returns (address)<br>
          <a style="color:#4089ff" href="https://ethereum.stackexchange.com/questions/15364/ecrecover-from-geth-and-web3-eth-sign">具体用法单击此处</a>`,
        },

        // 账户余额
        {
          type: "balance",
          name: "账户余额",
          elements: [],

          contents: {
            address: {
              name: "地址",
              value: null,
              elements: [],
              useEle: false,
              show: true,
            },
          },
          hint: `获取目标地址的账户余额<br>
          返回：256位非负整数<br>
          代码：&ltaddress&gt.balance (uint256)<br>
          `,
        },

        // 转账 transfer
        {
          type: "transfer",
          name: "发送以太币(transfer)",
          elements: [],

          contents: {
            address: {
              name: "地址",
              value: null,
              elements: [],
              useEle: false,
              show: true,
            },
            amount: {
              name: "金额",
              value: null,
              elements: [],
              useEle: false,
              show: true,
            },
          },
          hint: `向目标地址账户转账指定金额<br>
          单位： wei（1 wei = 10^-18 ether, 1 ether 约等于 1500￥ ） <br>
          代码：&ltaddress&gt.transfer(uint256 amount)<br>
          <span style="color:green">失败时抛出异常,程序终止运行</span><br>
          <span style="color:yellow">更安全</span>
          `,
        },

        // 转账 send
        {
          type: "send",
          name: "发送以太币(send)",
          elements: [],

          contents: {
            address: {
              name: "地址",
              value: null,
              elements: [],
              useEle: false,
              show: true,
            },
            amount: {
              name: "金额",
              value: null,
              elements: [],
              useEle: false,
              show: true,
            },
          },
          hint: `向目标地址账户转账指定金额<br>
          单位： wei（1 wei = 10^-18 ether, 1 ether 约等于 1500￥ ） <br>
          代码：&ltaddress&gt.send(uint256 amount) returns (bool)<br>
          <span style="color:green">失败时返回false，程序继续运行</span><br>
          <span style="color:yellow">可以处理转账失败的后果</span>
          `,
        },

        // 外部调用 call
        {
          type: "call",
          name: "外部调用",
          elements: [],

          contents: {
            address: {
              name: "地址",
              value: null,
              elements: [],
              useEle: false,
              show: true,
            },
            function: {
              name: "目标函数",
              value: null,
              elements: [],
              useEle: false,
              show: true,
            },
            param: {
              name: "调用参数",
              value: [],
              show: true,
            },
            amount: {
              name: "附带金额",
              value: null,
              elements: [],
              useEle: false,
              show: false,
            },
            gas: {
              name: "gas上限",
              value: null,
              elements: [],
              useEle: false,
              show: false,
            },
          },
          hint: `使用指定参数调用指定地址的合约的指定函数<br>
          参数顺序与个数应与目标函数相同<br>
          代码：&ltaddress&gt.call(abi.encodeWithSignature((#函数样式#),参数1，参数2，...))<br>
          样例：addr.call(abi.encodeWithSignature("register(string)", "MyName"));<br>
          样例中 目标地址：addr ，函数样式："register(string)" ， 参数："MyName"<br>
          <a style="color:#4089ff" href="https://www.jianshu.com/p/a5c97d0d7cae">具体用法单击此处</a><br>
          <span style="color:yellow">调用函数做出的存储区改变发生在拥有该函数的合约的存储空间</span><br>
          <span style="color:red">底层函数！请充分了解后再使用！</span>
          `,
        },

        // 外部调用 delegatecall
        {
          type: "delegatecall",
          name: "委派调用",
          elements: [],

          contents: {
            address: {
              name: "地址",
              value: null,
              elements: [],
              useEle: false,
              show: true,
            },
            function: {
              name: "目标函数",
              value: null,
              elements: [],
              useEle: false,
              show: true,
            },
            param: {
              name: "调用参数",
              value: [],
              show: true,
            },
            gas: {
              name: "gas上限",
              value: null,
              elements: [],
              useEle: false,
              show: false,
            },
          },
          hint: `使用指定参数调用指定地址的合约的指定函数<br>
          参数顺序与个数应与目标函数相同<br>
           代码：&ltaddress&gt.delegatecall(abi.encodeWithSignature((#函数样式#),参数1，参数2，...))<br>
          样例：addr.delegatecall(abi.encodeWithSignature("register(string)", "MyName"));<br>
          样例中 目标地址：addr ，函数样式："register(string)" ， 参数："MyName"<br>
          <a style="color:#4089ff" href="https://www.jianshu.com/p/fd5075ff0ab9">具体用法单击此处</a><br>
          <span style="color:yellow">调用函数做出的存储区改变发生在调用该函数的合约的存储空间</span><br>
          <span style="color:red">底层函数！请充分了解后再使用！</span>
          `,
        },

        // 销毁函数
        {
          type: "selfdestruct",
          name: "销毁合约",
          elements: [],

          contents: {
            address: {
              name: "地址",
              value: null,
              elements: [],
              useEle: false,
              show: true,
            },
          },
          hint: `销毁当前合约，把余额发送到指定地址<br>
          代码：selfdestruct(address recipient)<br>
          样例：selfdestruct(addr)`,
        },
      ],
    },

    // 错误处理
    {
      type: "error",
      name: "错误处理",
      group: { name: "logic", pull: "clone", put: false, revertClone: true },
      elements: [
        // 错误处理 require
        {
          type: "require",
          name: "条件错误处理",
          elements: [],

          contents: {
            condition: {
              name: "条件",
              value: null,
              elements: [],
              useEle: false,
              show: true,
            },
            message: {
              name: "错误信息",
              value: null,
              elements: [],
              useEle: false,
              show: false,
            },
          },
          hint: `判断是否满足条件，若不满足，抛出异常并回退状态<br>
          代码：require(bool condition)<br>
          样例：require(6==2*3)（此条将不抛出异常，程序继续正常执行） <br>
          <span style="color:yellow">此处理方式会返还剩余gas，并可以提供错误信息，多用于判断传入参数是否满足条件</span>`,
        },

        // 错误处理 assert
        {
          type: "assert",
          name: "异常处理",
          elements: [],

          contents: {
            condition: {
              name: "条件",
              value: null,
              elements: [],
              useEle: false,
              show: true,
            },
          },
          hint: `判断是否满足条件，若不满足，抛出异常并回退状态<br>
          代码：assert(bool condition)<br>
          样例：assert(6==2*3)（此条将不抛出异常，程序继续正常执行） <br>
          <span style="color:yellow">此处理方式会销毁剩余gas，通常在程序运行中发生异常时</span>`,
        },

        // 错误处理 revert
        {
          type: "revert",
          name: "中断",
          elements: [],

          contents: {
            condition: {
              name: "条件",
              value: null,
              elements: [],
              useEle: false,
              show: true,
            },
            message: {
              name: "错误信息",
              value: null,
              elements: [],
              useEle: false,
              show: false,
            },
          },
          hint: `直接抛出异常并回退状态<br>
          代码：revert()<br>
          <span style="color:yellow">此处理方式会返还剩余gas，并可以提供错误信息，多用于判断传入参数是否满足条件</span>`,
        },
      ],
    },
  ],
};

const getters = {
  // 可用作参数的类型
  ParamTypes: (state) => {
    return [state.NoneType].concat(state.transformer[0].elements);
  },
  OperaTypes: (state) => {
    return Array.from(state.transformer[2].elements, (x) => x.type);
  },
  ValueTypes: (state) => {
    return Array.from(state.transformer[4].elements, (x) => x.type).concat(
      Array.from(state.transformer[0].elements, (x) => x.type)
        .map((x) => x + "_var")
        .concat(["struct_var", "contract_var"])
    );
  },
  TypeGroups: (state) => (groupId) => {
    return Array.from(state.transformer[groupId].elements, (x) => x.type);
  },
  CreateVar: () => (item) => {
    return createVar(item);
  },
  GetCode: () => {
    return codeInit();
  },
  GetContracts: () => {
    let temp = [];
    for (let i = 0; i < state.elements.length; i++) {
      if (state.elements[i].type == "contract_creator") {
        temp.push({
          type: getName(state.elements[i]),
          name: `合约 ${getName(state.elements[i])}`,
          elements: [],
          contents: {
            name: {
              name: "名字",
              value: "",
              show: true,
              use: false,
            },

            value: {
              name: "选取属性",
              value: {
                self: {
                  name: "本身",
                  contents: {},
                },
              },
              key: "self",
              show: true,
            },
          },
          useEle: false,
        });
        for (let j = 0; j < state.elements[i].elements.length; j++) {
          const element = state.elements[i].elements[j];
          if (element.type == "struct_creator") {
            temp[i].contents.value.value[getName(element)] = {
              type: getName(element),
              name: `结构 ${getName(element)}`,
              elements: [],
              contents: {},
              useEle: false,
            };
          }
        }
      }
    }
    return temp;
  },
  //   GetStructs: () => {
  //     let temp = [];
  //     // 对already的处理
  //     for (let i = 0; i < state.varAlready.length; i++) {
  //       for (let j = 0; j < state.varAlready[i].length; j++) {
  //         const element = state.varAlready[i][j];
  //         if (element.type == "struct_creator") {
  //           const item = getAttributes(element.location);
  //           temp.push({
  //             type: getName(item),
  //             name: `结构 ${getName(item)}`,
  //             elements: [],
  //             contents: {
  //               name: {
  //                 name: "名字",
  //                 value: "",
  //                 show: true,
  //                 use: false,
  //               },
  //             },
  //             useEle: false,
  //           });
  //         }
  //       }
  //     }

  //     // 对potential的处理
  //     if (state.location.length < 2) {
  //       for (let i = 0; i < state.varPotential.length; i++) {
  //         for (let j = 0; j < state.varPotential[i].vars.length; j++) {
  //           const element = state.varPotential[i].vars[j];
  //           if (element.type == "struct_creator") {
  //             const item = getAttributes(element.location);
  //             temp.push({
  //               type: getName(item),
  //               name: `结构 ${getName(item)}`,
  //               elements: [],
  //               contents: {
  //                 name: {
  //                   name: "名字",
  //                   value: "",
  //                   show: true,
  //                   use: false,
  //                 },
  //               },
  //               useEle: false,
  //             });
  //           }
  //         }
  //       }
  //     }
  //     return temp;
  //   },
};

// function getss() {
//   let temp = [];
//   for (let x in state.transformer) {
//     console.log("x is ", x);
//     for (let y in state.transformer[x].elements) {
//       temp.push(
//         `"${state.transformer[x].elements[y].type}":"${state.transformer[x].elements[y].name}"`
//       );
//     }
//   }
//   console.log("in ss!");
//   console.log("temp is", temp);
//   return temp.join(",\n");
// }
const mutations = {
  // 副代码区开关
  ChangeToggle(state, value) {
    state.SubcodeToggle = value;
  },

  // 更新代码
  updateElements: (state, payload) => {
    state.elements = payload;
  },

  // 改变全局id
  incGlobalId: (state) => {
    state.globalId++;
  },

  // 开始移动
  // 将所有附带元素全部设为不可见，减小移动的组件的体积
  nestedStart: (state, item) => {
    // console.log("OK!", getss());
    state.started = true;
    if (item.show != undefined) {
      state.ShowsOnMove.push(item.show);
      item.show = false;
    }

    for (let x in item.contents) {
      state.ShowsOnMove.push(item.contents[x].show);
      item.contents[x].show = false;
    }
  },

  // 结束移动
  // 恢复移动的组件之前的可见值，恢复之前样式
  nestedEnd: (state, { item, index }) => {
    // 若不处在删除模式
    VarLogin();
    if (!state.started) {
      return;
    } else {
      state.started = false;
    }
    console.log("end here!");
    // 由于之后都是缩放操作，这里最适合注册变量

    console.log("showOnMove:", state.ShowsOnMove);
    if (state.MovedList == null) {
      state.ShowsOnMove.length = 0;
      state.MovedList = [];

      return;
    }
    if (state.kill == false) {
      if (state.MovedList.length == 0) {
        if (item.show != undefined) {
          item.show = state.ShowsOnMove.shift();
        }
        for (let x in item.contents) {
          item.contents[x].show = state.ShowsOnMove.shift();
        }
      } else {
        if (state.MovedList[index].show != undefined) {
          state.MovedList[index].show = state.ShowsOnMove.shift();
        }
        for (let x in state.MovedList[index].contents) {
          state.MovedList[index].contents[x].show = state.ShowsOnMove.shift();
        }
        state.MovedList = [];
      }
    }
    // 若处在删除模式，则当移动之后不删除该单元
    else {
      if (state.MovedList.length > 0) {
        if (state.MovedList[index].show != undefined) {
          state.MovedList[index].show = state.ShowsOnMove.shift();
        }
        for (let x in state.MovedList[index].contents) {
          state.MovedList[index].contents[x].show = state.ShowsOnMove.shift();
        }
        state.MovedList = [];
      }
      // state.ShowsOnMove = [];
    }
  },

  // 移动中
  // 记录目标地点
  nestedMove: (state, element) => {
    // console.log(state, element);
    state.MovedList = element;
  },

  // 批量删除
  nestDelete: (state, { list, index }) => {
    console.log(state.MovedList);
    if (state.MovedList == null) {
      state.ShowsOnMove.length = 0;
      VarLogin();

      return;
    } else if (state.MovedList.length == 0) {
      list.splice(index, 1);
      VarLogin();
    }
  },

  // 更新变量
  refreshVars: () => {
    VarLogin();
  },

  // 一键
  toLocation: (state, id) => {
    state.location = state.varMap.get(id);
    VarLogin("to");
  },
};

const actions = {
  // 副代码区开关
  ChangeToggle(content, value) {
    content.commit("ChangeToggle", value);
  },

  // 更新代码
  updateElements: ({ commit }, payload) => {
    commit("updateElements", payload);
  },

  // 改变全局id
  incGlobalId: ({ commit }) => {
    commit("incGlobalId");
  },

  // 开始移动
  nestedStart: ({ commit }, item) => {
    commit("nestedStart", item);
  },

  // 结束移动
  nestedEnd: ({ commit }, payload) => {
    commit("nestedEnd", payload);
  },

  // 移动中
  nestedMove: ({ commit }, element) => {
    commit("nestedMove", element);
  },

  // 批量删除
  nestDelete: ({ commit }, payload) => {
    commit("nestDelete", payload);
  },

  // 更新变量
  refreshVars: ({ commit }) => {
    commit("refreshVars");
  },

  // 一键到目的
  toLocation: ({ commit }, id) => {
    commit("toLocation", id);
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
