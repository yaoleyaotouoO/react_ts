// 功能: 点击空白处, 隐藏弹出框

import * as React from 'react';

interface ITarget {
  element: HTMLDivElement;
  callbacks: Function[];
}

let targetMapping: ITarget[] = [];

const _onDocumentClick = (e: MouseEvent) => {
  targetMapping.forEach((obj) => {
    // 如果点击的是当前弹出框中的元素, 那么不需要关闭
    if (e.target === obj.element || HidePopupUtil.isParent(e.target, obj.element)) {
      return;
    }

    obj.callbacks.forEach(callback => callback());
  });
}

window.document.body.addEventListener('click', _onDocumentClick);

const HidePopupUtil = {
  // 判断点击的地方是不是在弹出框的元素中
  isParent: (obj: EventTargetExpand, parentObj: HTMLDivElement) => {
    while (obj && obj.tagName && obj.tagName.toLowerCase() !== 'body') {
      if (obj === parentObj) {
        return true;
      }

      obj = obj.parentNode;
    }

    return false;
  },
  init: (element: HTMLDivElement, callback: Function) => {
    const target = targetMapping.filter(item => item.element === element);
    if (target.length > 0) {
      target[0].callbacks.push(callback);
    } else {
      targetMapping.push({
        element,
        callbacks: [callback]
      });
    }

    return {
      // 清除事件
      clear: () => {
        targetMapping = targetMapping.filter(item => item.element !== element)
      }
    }
  }
}


interface EventTargetExpand extends EventTarget {
  tagName?: string;
  parentNode?: Node;
}


export default HidePopupUtil;