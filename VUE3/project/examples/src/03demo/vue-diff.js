/**
 *  这个是伪代码不可以真的执行
 */

function* domDIFF(vDOM1, vDOM2) {
  if (!vDOM1 || !vDOM2) {
    yield new InsertPatch(vDOM1, vDOM2);
    return;
  }

  /**
   * 节点类型一致
   *  */
  if (vDOM1.type === vDOM2.type) {
    if (vDOM1.key === vDOM2.key) {
      yield new AttributePatch(vDOM1, vDOM2);
      yield* domDIFFArray(vDOM1.children, vDOM2.children);
    } else {
      yield new ReplacePatch(vDOM1, vDOM2);
    }
    return;
  } else {
    yield new ReplacePatch(vDOM1, vDOM2);
  }
}

function toMap(arr) {
  const map = new Map();
  arr.forEach((item) => {
    if (item.key) map.set(item.key, item);
  });
  return map;
}

function* domDiffArray(arr1, arr2) {
  if (!arr1 || !arr2) {
    yield new ReplacePatch(vDOM1, vDOM2);
    return;
  }

  const m1 = toMap(arr1);
  const m2 = toMap(arr2);

  // 需要删除的VDOM
  const deletes = arr1.filter((item, i) => {
    return item.key ? !m2.has(item.key) : i >= arr2.length;
  });

  for (let item of deletes) {
    yield new ReplacePatch(item, null);
  }

  // 需要Replace的VDOM
  for (let i = 0; i < arr1.length; i++) {
    const a = arr1[i];
    if (a.key) {
      if (m2.has(a.key)) {
        yield* domDIFF(a, m2.get(a.key));
      }
    } else {
      // 没有key的根据位置去diff
      if (i < arr2.length) {
        yield* domDIFF(a, arr2[i]);
      }
    }
  }

  // 需要Insert的VDOM
  for (let i = 0; i < arr2.length; i++) {
    const b = arr2[i];

    if (b.key) {
      if (!m1.has(b.key)) {
        yield new InsertPatch(i, b);
      }
    } else {
      if (i >= arr1.length) {
        yield new InsertPatch(i, arr[2]);
      }
    }
  }
}

class InsertPatch {
  constructor(pos, to) {
    this.pos = pos;
    this.to = to;
  }
}

class ReplacePatch {
  constructor(from, to) {
    this.form = from;
    this.to = to;
  }
}
