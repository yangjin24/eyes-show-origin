var SENSITIVE_DATA_DIC_8942 = [];
var SENSITIVE_KEY_8942 = "573f1757ddf9eac3f4eaa4ff3f7587f7";
var SENSITIVE_FLAG_8942 = false;
var GLOBAL_SENSITIVE_URL_8942 = ["decision/url/report/v9/page/data"];
/*var GLOBAL_SENSITIVE_URL_8942 = ["jsonplaceholder.typicode.com/todo"];*/
var IS_IFRAME_8942 = self.frameElement && self.frameElement.tagName === "IFRAME";

/** 解码不可见字符 **/
function findCodeForEye(c) {
  var zeroWidthArray = [
    String.fromCharCode(8204),
    String.fromCharCode(8205),
    String.fromCharCode(8203),
    String.fromCharCode(65279),
  ];
  for (var i = 0; i < zeroWidthArray.length; i++) {
    if (c == zeroWidthArray[i]) {
      return i;
    }
  }
  return "";
}

/**
 * 兼容浏览器的insertAdjacentHTML
 * @param {HTMLElement} el
 * @param {String} where beforeBegin、afterBegin、beforeEnd、afterEnd
 * @param {String} html
 */
function insertHTMLForEye(el, where, html) {
  if (!el) {
    return false;
  }

  where = where.toLowerCase();

  if (el.insertAdjacentHTML) {
    //IE
    el.insertAdjacentHTML(where, html);
  } else {
    var range = el.ownerDocument.createRange(),
      frag = null;

    switch (where) {
      case "beforebegin":
        range.setStartBefore(el);
        frag = range.createContextualFragment(html);
        el.parentNode.insertBefore(frag, el);
        return el.previousSibling;
      case "afterbegin":
        if (el.firstChild) {
          range.setStartBefore(el.firstChild);
          frag = range.createContextualFragment(html);
          el.insertBefore(frag, el.firstChild);
        } else {
          el.innerHTML = html;
        }
        return el.firstChild;
      case "beforeend":
        if (el.lastChild) {
          range.setStartAfter(el.lastChild);
          frag = range.createContextualFragment(html);
          el.appendChild(frag);
        } else {
          el.innerHTML = html;
        }
        return el.lastChild;
      case "afterend":
        range.setStartAfter(el);
        frag = range.createContextualFragment(html);
        el.parentNode.insertBefore(frag, el.nextSibling);
        return el.nextSibling;
    }
  }
}

/** 遍历页面node 特定字符（不可见）包裹的文本节点插入眼睛图标及显示原始数据的弹框 **/
function render_eyes_8942() {
  function styleTextNodes(element) {
    (function recursiveWalk(node) {
      if (node) {
        node = node.firstChild;
        while (node != null) {
          let reg = new RegExp(
            String.fromCharCode(8288) +
            ".*?" +
            String.fromCharCode(8288),
            "ig"
          );
          if (node.nodeType == 3 && node.nodeValue) {
            let splitByReg = node.nodeValue.split(reg);
            let nodeValueArr = node.nodeValue.match(reg);
            if (nodeValueArr && nodeValueArr.length) {
              let originClass = "";
              let parentNode = node.parentNode;
              if (parentNode) {
                originClass = parentNode.className || "";
              }
              let resultSpan = document.createElement("span");
              resultSpan.className = "eyes-8942-outer";
              for (let i = 0; i < nodeValueArr.length; i++) {
                //获取对应敏感数据的id
                let singleValue = nodeValueArr[i];
                let singleValueArr = singleValue.split("");
                let result = "";
                let resultId = "";
                for (
                  let j = 0;
                  j < singleValueArr.length;
                  j++
                ) {
                  if (
                    j == 0 ||
                    j == singleValueArr.length - 1
                  )
                    continue;
                  result =
                    result +
                    findCodeForEye(singleValueArr[j]);
                }

                if (result) {
                  try {
                    resultId = parseInt(result, 4);
                  } catch (e) {
                    console.log("parseInt error");
                  }
                }
                // 设置容器
                let wrapperSpan =
                  document.createElement("span");
                wrapperSpan.className = "eyes-8942-wrapper";
                // 设置小眼睛
                let eyes = document.createElement("span");
                eyes.className = "eyes-8942-icon";
                eyes.setAttribute(
                  "data-isShowDesensitizationText",
                  "false"
                );
                eyes.setAttribute(
                  "style",
                  'background-image: url("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB0PSIxNzAxMzMwMjk3ODY0IiBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjExNDQiIGRhdGEtc3BtLWFuY2hvci1pZD0iYTMxM3guY29sbGVjdGlvbnNfZGV0YWlsLjAuaTguNjkxMzNhODFYVHhhaXciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCI+PHBhdGggZD0iTTUxMiAyNTZjLTE2OCAwLTMyOS42IDEwNi40LTM4NCAyNTYgNTQuNCAxNDkuNiAyMTYgMjU2IDM4NCAyNTYgMTY3LjIgMCAzMzAuNC0xMDYuNCAzODQuOC0yNTZDODQxLjYgMzYyLjQgNjc5LjIgMjU2IDUxMiAyNTZ6IG0wIDQxNmMtODggMC0xNjAtNzItMTYwLTE2MHM3Mi0xNjAgMTYwLTE2MCAxNjAgNzIgMTYwIDE2MC03MiAxNjAtMTYwIDE2MHogbTk2LTE2MGMwIDUyLjgtNDMuMiA5Ni05NiA5NnMtOTYtNDMuMi05Ni05NiA0My4yLTk2IDk2LTk2IDk2IDQzLjIgOTYgOTZ6IiBwLWlkPSIxMTQ1IiBkYXRhLXNwbS1hbmNob3ItaWQ9ImEzMTN4LmNvbGxlY3Rpb25zX2RldGFpbC4wLmk2LjY5MTMzYTgxWFR4YWl3IiBjbGFzcz0ic2VsZWN0ZWQiIGZpbGw9IiM2NGFhZGQiPjwvcGF0aD48L3N2Zz4=");'
                );
                //设置弹框 显示原始数据
                let modal = document.createElement("span");
                modal.className = "origin-8942-text";
                let sensData = "";
                for (
                  let k = 0;
                  k < SENSITIVE_DATA_DIC_8942.length;
                  k++
                ) {
                  let item = SENSITIVE_DATA_DIC_8942[k] || {};
                  if (item[resultId]) {
                    sensData = item[resultId];
                  }
                }

                modal.innerHTML = sensData;
                // 设置文案
                let text = document.createElement("span");
                text.className = `eyes-8942-text`;
                text.innerHTML = nodeValueArr[i];
                // 插入节点
                wrapperSpan.appendChild(eyes);
                wrapperSpan.appendChild(modal);
                wrapperSpan.appendChild(text);
                if (splitByReg[i]) {
                  insertHTMLForEye(
                    resultSpan,
                    "beforeend",
                    splitByReg[i]
                  );
                }
                resultSpan.appendChild(wrapperSpan);
                // 假设element是要触发eye图标的元素
                wrapperSpan.addEventListener(
                  "mouseover",
                  function (e) {
                    e.target.parentNode.classList.add(
                      "show-eye-icon"
                    ); // 添加类以显示图标
                    // 查找小眼睛
                    let eyeIcon =
                      e.target.parentNode.querySelector(
                        ".eyes-8942-icon"
                      );
                    if (eyeIcon) {
                      // 确保位置正确，根据over元素的位置进行计算
                      let rect =
                        e.target.parentNode.getBoundingClientRect();
                      eyeIcon.style.left =
                        rect.left - 40 + "px"; // 调整left以适应你的布局
                      eyeIcon.style.top = rect.top - 10 + "px";
                    }
                  }
                );
                wrapperSpan.addEventListener(
                  "mouseout",
                  function (e) {
                    e.target.parentNode.classList.remove(
                      "show-eye-icon"
                    ); // 移除类以隐藏图标
                  }
                );

                // 点击eye图标时显示或隐藏Tooltip
                eyes.addEventListener(
                  "click",
                  function (event) {
                    event.stopPropagation();
                    let tooltip =
                      document.querySelector(
                        ".eyes-8942-tooltip"
                      );
                    if (!tooltip) {
                      tooltip =
                        document.createElement("div");
                      tooltip.className =
                        "eyes-8942-tooltip";
                      tooltip.textContent = sensData;
                      document.body.appendChild(tooltip);
                    }
                    tooltip.classList.add("show");

                    tooltip.textContent = sensData;
                    // 确保Tooltip位置正确，根据eye图标的位置进行计算
                    let rect = eyes.getBoundingClientRect();
                    let _left = rect.right + window.scrollX;
                    let _top = rect.top + window.scrollY - tooltip.offsetHeight;
                    _left = _left >= 0 ? _left : 0;
                    _top = _top >= 0 ? _top : 0;
                    tooltip.style.left = _left + "px"; // 调整left以适应你的布局
                    tooltip.style.top = _top + "px"; // 减去5是为了与eye图标底部保持一点距离
                  }
                );
              }
              // 替换节点
              if (splitByReg[splitByReg.length - 1]) {
                insertHTMLForEye(
                  resultSpan,
                  "beforeend",
                  splitByReg[splitByReg.length - 1]
                );
              }
              let classList = node.parentNode.classList;
              if (
                !(
                  classList &&
                  classList.length &&
                  classList.contains("eyes-8942-text")
                )
              ) {
                node.parentNode.insertBefore(resultSpan, node);
                node.parentNode.removeChild(node);
                node = resultSpan;
              }
            }
          } else if (node.nodeType == 1) {
            if (node.nodeName === "INPUT") {
              // 已经添加的input节点， 退出处理
              let nodeClassList = node.classList;
              if (
                nodeClassList &&
                nodeClassList.length &&
                nodeClassList.contains("eyes-8942-text")
              ) {
                node = node.nextSibling;
                continue;
              }
              // 非 disable / readonly 的input, 退出处理
              // if (!node.disabled && !node.readOnly) {
              //   node = node.nextSibling;
              //   continue;
              // }
              try {
                let value = node.getAttribute("value") || "";
                let splitByReg = value.split(reg);
                let nodeValueArr = value.match(reg);
                // 没有脱敏数据，退出处理
                if (
                  !nodeValueArr ||
                  !nodeValueArr.length ||
                  nodeValueArr[1] === value
                ) {
                  node = node.nextSibling;
                  continue;
                }

                // 最外层
                let resultSpan = document.createElement("span");
                resultSpan.className = "eyes-8942-outer";

                // 设置容器
                let wrapperSpan = document.createElement("span");
                wrapperSpan.className = "eyes-8942-wrapper";
                // 设置小眼睛
                let eyes = document.createElement("span");
                eyes.className = "eyes-8942-icon";
                eyes.setAttribute(
                  "data-isShowDesensitizationText",
                  "false"
                );
                eyes.setAttribute(
                  "style",
                  'background-image: url("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB0PSIxNzAxMzMwMjk3ODY0IiBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjExNDQiIGRhdGEtc3BtLWFuY2hvci1pZD0iYTMxM3guY29sbGVjdGlvbnNfZGV0YWlsLjAuaTguNjkxMzNhODFYVHhhaXciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCI+PHBhdGggZD0iTTUxMiAyNTZjLTE2OCAwLTMyOS42IDEwNi40LTM4NCAyNTYgNTQuNCAxNDkuNiAyMTYgMjU2IDM4NCAyNTYgMTY3LjIgMCAzMzAuNC0xMDYuNCAzODQuOC0yNTZDODQxLjYgMzYyLjQgNjc5LjIgMjU2IDUxMiAyNTZ6IG0wIDQxNmMtODggMC0xNjAtNzItMTYwLTE2MHM3Mi0xNjAgMTYwLTE2MCAxNjAgNzIgMTYwIDE2MC03MiAxNjAtMTYwIDE2MHogbTk2LTE2MGMwIDUyLjgtNDMuMiA5Ni05NiA5NnMtOTYtNDMuMi05Ni05NiA0My4yLTk2IDk2LTk2IDk2IDQzLjIgOTYgOTZ6IiBwLWlkPSIxMTQ1IiBkYXRhLXNwbS1hbmNob3ItaWQ9ImEzMTN4LmNvbGxlY3Rpb25zX2RldGFpbC4wLmk2LjY5MTMzYTgxWFR4YWl3IiBjbGFzcz0ic2VsZWN0ZWQiIGZpbGw9IiM2NGFhZGQiPjwvcGF0aD48L3N2Zz4=");'
                );

                //设置弹框 显示原始数据
                let modal = document.createElement("span");
                modal.className = "origin-8942-text";

                let originText = "";

                for (let i = 0; i < nodeValueArr.length; i++) {
                  //获取对应敏感数据的id
                  let singleValue = nodeValueArr[i];
                  let singleValueArr = singleValue.split("");
                  let result = "";
                  let resultId = "";

                  for (
                    let j = 0;
                    j < singleValueArr.length;
                    j++
                  ) {
                    if (
                      j == 0 ||
                      j == singleValueArr.length - 1
                    )
                      continue;
                    result =
                      result +
                      findCodeForEye(singleValueArr[j]);
                  }
                  if (result) {
                    try {
                      resultId = parseInt(result, 4);
                    } catch (e) {
                      console.log("parseInt error");
                    }
                  }

                  let sensData = "";
                  for (
                    let k = 0;
                    k < SENSITIVE_DATA_DIC_8942.length;
                    k++
                  ) {
                    let item = SENSITIVE_DATA_DIC_8942[k] || {};
                    if (item[resultId]) {
                      sensData = item[resultId];
                    }
                  }
                  originText =
                    originText + splitByReg[i] + sensData;
                }

                originText =
                  originText + splitByReg[splitByReg.length - 1];

                modal.innerHTML = originText;

                // 插入节点
                if (
                  !(
                    nodeClassList &&
                    nodeClassList.length &&
                    nodeClassList.contains("eyes-8942-text")
                  )
                ) {
                  node.className =
                    node.className + ` eyes-8942-text`;
                } else {
                  node.className = `eyes-8942-text`;
                }
                wrapperSpan.appendChild(eyes);
                wrapperSpan.appendChild(modal);
                wrapperSpan.appendChild(node.cloneNode(true));
                resultSpan.appendChild(wrapperSpan);

                // 假设element是要触发eye图标的元素
                wrapperSpan.addEventListener(
                  "mouseover",
                  function (e) {
                    e.target.parentNode.classList.add(
                      "show-eye-icon"
                    ); // 添加类以显示图标
                    // 查找小眼睛
                    let eyeIcon =
                      e.target.parentNode.querySelector(
                        ".eyes-8942-icon"
                      );
                    if (eyeIcon) {
                      // 确保位置正确，根据over元素的位置进行计算
                      let rect =
                        e.target.parentNode.getBoundingClientRect();
                      eyeIcon.style.left =
                        rect.left - 40 + "px"; // 调整left以适应你的布局
                      eyeIcon.style.top = rect.top - 10 + "px";
                    }
                  }
                );

                wrapperSpan.addEventListener(
                  "mouseout",
                  function (e) {
                    e.target.parentNode.classList.remove(
                      "show-eye-icon"
                    ); // 移除类以隐藏图标
                  }
                );

                // 点击eye图标时显示或隐藏Tooltip;
                eyes.addEventListener("click", function (event) {
                  event.stopPropagation();
                  let tooltip =
                    document.querySelector(
                      ".eyes-8942-tooltip"
                    );
                  if (!tooltip) {
                    tooltip = document.createElement("div");
                    tooltip.className = "eyes-8942-tooltip";
                    tooltip.textContent = originText;
                    document.body.appendChild(tooltip);
                  }
                  tooltip.classList.add("show");
                  tooltip.textContent = originText;
                  // 确保Tooltip位置正确，根据eye图标的位置进行计算
                  let rect = eyes.getBoundingClientRect();
                  let _left = rect.right + window.scrollX;
                  let _top = rect.top + window.scrollY - tooltip.offsetHeight;
                  _left = _left >= 0 ? _left : 0;
                  _top = _top >= 0 ? _top : 0;
                  tooltip.style.left = _left + "px"; // 调整left以适应你的布局
                  tooltip.style.top = _top + "px"; // 减去5是为了与eye图标底部保持一点距离
                });

                let classList = node.parentNode.classList;
                if (
                  !(
                    classList &&
                    classList.length &&
                    classList.contains("eyes-8942-text")
                  )
                ) {
                  node.parentNode.replaceChild(resultSpan, node);
                  node = resultSpan;
                }
              } catch (e) {
                console.log()
              }
            } else {
              recursiveWalk(node);
            }
          }
          node = node.nextSibling;
        }
      }
    })(element);
  }

  styleTextNodes(document.querySelector("body"));
}

/** 监听页面点击事件 **/
(function () {
  document.addEventListener("click", function (e) {
    e.stopPropagation();
    try {
      let allModalNodes = document.getElementsByClassName("eyes-8942-tooltip");
      if (allModalNodes && e.target.className.indexOf("eyes-8942-tooltip") === -1) {
        for (let i = 0; i < allModalNodes.length; i++) {
          // 想要操作的DOM元素
          let element = allModalNodes[i];
          // 要移除的类名
          let classNameToRemove = "show";
          // 检查该类是否存在，然后再尝试移除，以防万一
          if (element.classList.contains(classNameToRemove)) {
            element.classList.remove(classNameToRemove);
          }
        }
      }
    } catch (e) {
      console.log("onclick listener error");
    }
  });
})();

/** 初步判断字符串是否是合法json **/
function checkJson8942(str) {
  if (!str) return false;
  try {
    let begin = 0;
    let end = str.length - 1;

    // 跳过前面的空白字符
    while (begin <= end && /\s/.test(str[begin])) {
      begin++;
    }

    // 跳过后面的空白字符
    while (end >= begin && /\s/.test(str[end])) {
      end--;
    }

    // 如果字符串为空，则返回 false
    if (begin > end) {
      return false;
    }

    // 获取第一个和最后一个字符，进行检查
    return (str[begin] === '{' && str[end] === '}') || (str[begin] === '[' && str[end] === ']');
  } catch (e) {
    console.log("checkJson failed");
  }
}

/** 未知对象检索field对应的字符串并解码 **/
function findKeyForEye(result, data, field) {
  if (!data) return false;
  if (typeof data === "string" && checkJson8942(data)) {
    try {
      var _data = JSON.parse(data);
      findKeyForEye(result, _data, field);
    } catch (e) {
      console.log("JSON.parse error1");
    }
  }
  try {
    for (var key in data) {
      if (key === field && data[key] && typeof data[key] === "string") {
        SENSITIVE_FLAG_8942 = true;
        var decodeStr = base64_decode_8942(data[key]) || "{}";
        var obj = JSON.parse(decodeStr);
        var _temp = Object.keys(obj);
        if (_temp && _temp.length) {
          for (var i = 0; i < _temp.length; i++) {
            if (result && result.length > 5000) {
              result.shift();
            }
            result.push({ [_temp[i]]: obj[_temp[i]] });
          }
        }
      }
      if (typeof data[key] === "object") {
        findKeyForEye(result, data[key], field);
      }
      if (typeof data[key] === "string" && checkJson8942(data[key])) {
        try {
          var _childData = JSON.parse(data[key]);
          findKeyForEye(result, _childData, field);
        } catch (e) {
          console.log("JSON.parse error2");
        }
      }
    }
  } catch (e) {
    console.log(e);
  }
  return null;
}

/** base64解码 **/
function base64_decode_8942(str) {
  if (!str) return "";
  try {
    var arr = atob(str).split("");
    var resultArr = [];
    if (arr && arr.length) {
      for (var i = 0; i < arr.length; i++) {
        var c = arr[i];
        resultArr.push(
          "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2)
        );
      }
    }
    return decodeURIComponent(resultArr.join(""));
  } catch (e) {
    console.log("base64_decode error");
  }
}

/** XHR拦截所有请求 **/
(function () {
  if (typeof window.CustomEvent === "function") return false;

  function CustomEvent(event, params) {
    params = params || { bubbles: false, cancelable: false, detail: undefined };
    var evt = document.createEvent('CustomEvent');
    evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
    return evt;
  }

  CustomEvent.prototype = window.Event.prototype;
  window.CustomEvent = CustomEvent;
})();
(function () {
  function ajaxEventTrigger(event) {
    var ajaxEvent = new CustomEvent(event, { detail: this });
    window.dispatchEvent(ajaxEvent);
  }

  var OldXHR = false;
  try {
    if (window.XMLHttpRequest) {
      // code for IE7+, Firefox, Chrome, Opera, Safari
      OldXHR = window.XMLHttpRequest;
    } else {
      // code for IE6, IE5
      OldXHR = window.ActiveXObject; //ActiveXObject("Microsoft.XMLHTTP");
    }
  } catch (e) {
    OldXHR = false;
  }

  function newXHR() {
    var realXHR = OldXHR
      ? window.XMLHttpRequest
        ? new OldXHR()
        : new OldXHR("Microsoft.XMLHTTP")
      : false;
    // 不兼容时就结束
    if (!realXHR) return;
    realXHR.addEventListener('abort', function () {
      ajaxEventTrigger.call(this, 'ajaxAbort');
    }, false);
    realXHR.addEventListener('error', function () {
      ajaxEventTrigger.call(this, 'ajaxError');
    }, false);
    realXHR.addEventListener('load', function () {
      ajaxEventTrigger.call(this, 'ajaxLoad');
    }, false);
    realXHR.addEventListener('loadstart', function () {
      ajaxEventTrigger.call(this, 'ajaxLoadStart');
    }, false);
    realXHR.addEventListener('progress', function () {
      ajaxEventTrigger.call(this, 'ajaxProgress');
    }, false);
    realXHR.addEventListener('timeout', function () {
      ajaxEventTrigger.call(this, 'ajaxTimeout');
    }, false);
    realXHR.addEventListener('readystatechange', function () {
      ajaxEventTrigger.call(this, 'ajaxReadyStateChange');
    }, false);
    realXHR.addEventListener(
      "loadend",
      function (xhr) {
        // console.log("xhr loadend-----", xhr.currentTarget.responseURL);
        ajaxEventTrigger.call(this, "ajaxLoadEnd");
        try {
          SENSITIVE_FLAG_8942 = false;
          var response = JSON.parse(
            xhr.currentTarget.responseText || "{}"
          );
          findKeyForEye(
            SENSITIVE_DATA_DIC_8942,
            response,
            SENSITIVE_KEY_8942
          );
          if (SENSITIVE_FLAG_8942) {
            render_eyes_8942();
            run_per_second_8942();
          }
        } catch (e) {
          console.log("XMLHttpRequest listen error", e);
        }
      },
      false
    );
    realXHR.addEventListener(
      "readystatechange",
      function (xhr) {
        try {
          let headerValue = "";
          if (window['X-Sec-Sensitive']) {
            headerValue = "true";
          } else {
            headerValue = "false";
          }
          if (realXHR.readyState == 1) {
            realXHR.setRequestHeader('X-Sec-Sensitive', headerValue);
          }
          ajaxEventTrigger.call(this, "ajaxReadyStateChange");
        } catch (e) {
          console.log("xhr readystatechange error-----");
        }
      },
      false
    );

    return realXHR;
  }

  window.XMLHttpRequest = newXHR;
})();

/** fetch响应拦截 **/
(function () {
  var originFetch = fetch;
  originFetch &&
  Object.defineProperty(window, "fetch", {
    configurable: true,
    enumerable: true,
    // writable: true,
    get() {
      return function (url, options) {
        try {
          let customerHeaders = {};
          if (window['X-Sec-Sensitive']) {
            customerHeaders = {
              headers: { "X-Sec-Sensitive": "true" }
            };
          } else {
            customerHeaders = {
              headers: { "X-Sec-Sensitive": "false" }
            };
          }
          options = Object.assign(customerHeaders, options);
          return originFetch(url, options).then(function (response) {
            if (response.clone) {
              var cloneRes = response.clone();
              cloneRes.json().then((json) => {
                try {
                  SENSITIVE_FLAG_8942 = false;
                  findKeyForEye(
                    SENSITIVE_DATA_DIC_8942,
                    json,
                    SENSITIVE_KEY_8942
                  );
                  if (SENSITIVE_FLAG_8942) {
                    render_eyes_8942();
                    run_per_second_8942();
                  }
                } catch (e) {
                  console.log("fetch listen error");
                }
              });
            }
            return response;
          });
        } catch (e) {
          console.log("fetch error---")
        }
      };
    },
  });
})();

/** 检测到全局变量eye_573f1757ddf9eac3f4eaa4ff3f7587f7时 直接渲染小眼睛 **/
(function () {
  try {
    const isIframe = self.frameElement && self.frameElement.tagName === "IFRAME";
    let originDataEncode = window.eye_573f1757ddf9eac3f4eaa4ff3f7587f7;
    if (isIframe && !originDataEncode) {
      originDataEncode = window.parent.eye_573f1757ddf9eac3f4eaa4ff3f7587f7;
    }
    if (!originDataEncode) return;

    let originDataStr = base64_decode_8942(originDataEncode) || "{}";
    let originData = JSON.parse(originDataStr);
    let _temp = Object.keys(originData);
    if (_temp && _temp.length) {
      for (let i = 0; i < _temp.length; i++) {
        if (
          SENSITIVE_DATA_DIC_8942 &&
          SENSITIVE_DATA_DIC_8942.length > 5000
        ) {
          SENSITIVE_DATA_DIC_8942.shift();
        }
        SENSITIVE_DATA_DIC_8942.push({
          [_temp[i]]: originData[_temp[i]],
        });
      }
    }
    console.log("HTML -> SENSITIVE_DATA_DIC_8942", SENSITIVE_DATA_DIC_8942);
    render_eyes_8942();
    run_per_second_8942();
  } catch (e) {
    console.log("eye_573f1757ddf9eac3f4eaa4ff3f7587f7 JSON.parse error");
  }
})();

function run_per_second_8942() {
  let count = 0; // 计数器，用于跟踪函数执行的次数
  const maxExecutions = 5; // 设置最大执行次数

  const myFunction = () => {
    render_eyes_8942();
    ++count;
    if (count < maxExecutions) {
      setTimeout(myFunction, 1000);
    }
  };

  myFunction();
}

window.onload = function () {
  let timer = setInterval(() => {
    let el = document.querySelector('.report-tool-bar .bi-button-group');
    let barEle = document.querySelector('.report-tool-bar');
    if (el) {
      let searchEl = document.getElementById('fr-btn-SEARCH');
      console.log("--------window onload------")
      clearInterval(timer);
      let els = Array.from(el.querySelectorAll('.bi-left.clearfix'))
      let elPop = els.pop();
      let index = els.findIndex(e => !!e.querySelector('.bi-text-editor input'));
      let height = elPop.offsetHeight;
      let divEle = document.createElement('div');
      divEle.className = 'bi-left clearfix';
      divEle.setAttribute('style', `position: absolute; top: 4px; right: 20px;line-height: ${height}px; display: flex;align-items: center;`);
      let globalEye = document.createElement("span");
      globalEye.className = "global-eye-8942-icon";
      globalEye.title = "点击查看原始数据";
      globalEye.setAttribute(
        "style",
        'background-image: url("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB0PSIxNzIxMDUyMDk0NjMwIiBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjI1NTM4IiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgd2lkdGg9IjIwMCIgaGVpZ2h0PSIyMDAiPjxwYXRoIGQ9Ik0xOTIuODUzMzMzIDI1My4xODRMNTkuNDM0NjY3IDExOS44MDhsNjAuMzczMzMzLTYwLjM3MzMzMyA4NDQuNzU3MzMzIDg0NC44LTYwLjM3MzMzMyA2MC4zMzA2NjYtMTQxLjIyNjY2Ny0xNDEuMjI2NjY2QTQ2Ny4xNTczMzMgNDY3LjE1NzMzMyAwIDAgMSA1MTIgODk2Yy0yMzAuMDU4NjY3IDAtNDIxLjQ2MTMzMy0xNjUuNTQ2NjY3LTQ2MS42MTA2NjctMzg0YTQ2OC41NjUzMzMgNDY4LjU2NTMzMyAwIDAgMSAxNDIuNTA2NjY3LTI1OC44MTZ6IG00MzYuNzc4NjY3IDQzNi44MjEzMzNsLTYyLjQ2NC02Mi40NjRhMTI4IDEyOCAwIDAgMS0xNzAuNzA5MzMzLTE3MC43MDkzMzNMMzMzLjk5NDY2NyAzOTQuMzY4YTIxMy4zMzMzMzMgMjEzLjMzMzMzMyAwIDAgMCAyOTUuNjM3MzMzIDI5NS42MzczMzN6TTM0MC4yMjQgMTYwLjQyNjY2N0MzOTMuNDI5MzMzIDEzOS41MiA0NTEuNDEzMzMzIDEyOCA1MTIgMTI4YzIzMC4wNTg2NjcgMCA0MjEuNDYxMzMzIDE2NS41NDY2NjcgNDYxLjYxMDY2NyAzODRhNDY3LjA3MiA0NjcuMDcyIDAgMCAxLTg1Ljg0NTMzNCAxOTUuOTI1MzMzbC0xNjQuNjkzMzMzLTE2NC42OTMzMzNhMjEzLjMzMzMzMyAyMTMuMzMzMzMzIDAgMCAwLTI0Mi4zNDY2NjctMjQyLjM0NjY2N0wzNDAuMjI0IDE2MC40NjkzMzN6IiBwLWlkPSIyNTUzOSIgZmlsbD0iIzY0YWFkZCI+PC9wYXRoPjwvc3ZnPg==");'
      );
      divEle.appendChild(globalEye);
      barEle.appendChild(divEle);
      // elPop.parentNode.insertBefore(divEle, elPop.nextSibling);
      globalEye.addEventListener('click', function () {
        window['X-Sec-Sensitive'] = !window['X-Sec-Sensitive'];
        if (window['X-Sec-Sensitive']) {
          globalEye.title = "点击查看脱敏数据";
          globalEye.setAttribute(
            "style",
            'background-image: url("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB0PSIxNzIxMDUyMDQ0MTEzIiBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjI1MzI0IiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgd2lkdGg9IjIwMCIgaGVpZ2h0PSIyMDAiPjxwYXRoIGQ9Ik0zNzUuNjA1NzYgNTEyLjA4MTkyYzAgNzIuNjExODQgNTguODU5NTIgMTMxLjQ3MTM2IDEzMS40NzEzNiAxMzEuNDcxMzZTNjM4LjU0ODQ4IDU4NC42OTM3NiA2MzguNTQ4NDggNTEyLjA4MTkycy01OC44NTk1Mi0xMzEuNDcxMzYtMTMxLjQ3MTM2LTEzMS40NzEzNmMtNzIuNjAxNiAwLTEzMS40NzEzNiA1OC44NTk1Mi0xMzEuNDcxMzYgMTMxLjQ3MTM2eiBtNjQxLjE3NzYtMzAuMjg5OTJDOTA1LjQ5NTA0IDI0Ny4zNjc2OCA3MzcuMjgyNTYgMTI5LjQwMjg4IDUxMS43NzcyOCAxMjkuNDAyODhjLTIyNS42MTc5MiAwLTM5My43MTc3NiAxMTcuOTc1MDQtNTA0Ljk5NTg0IDM1Mi41MTItOS4wNDE5MiAxOS4wMTU2OC05LjA0MTkyIDQxLjMxODQgMCA2MC40NTY5NkMxMTguMDY5NzYgNzc2Ljc4NTkyIDI4Ni4yODIyNCA4OTQuNzYwOTYgNTExLjc3NzI4IDg5NC43NjA5NmMyMjUuNjE3OTIgMCAzOTMuNzE3NzYtMTE3Ljk3NTA0IDUwNC45OTU4NC0zNTIuNTEyIDkuMDQxOTItMTkuMDE1NjggOS4wNDE5Mi00MS4wODI4OCAwLjAxMDI0LTYwLjQ1Njk2ek01MDcuMDc3MTIgNzE4LjY4NDE2Yy0xMTQuMDk0MDggMC0yMDYuNTkyLTkyLjUwODE2LTIwNi41OTItMjA2LjYwMjI0IDAtMTE0LjEwNDMyIDkyLjQ5NzkyLTIwNi42MDIyNCAyMDYuNTkyLTIwNi42MDIyNCAxMTQuMTA0MzIgMCAyMDYuNjAyMjQgOTIuNDk3OTIgMjA2LjYwMjI0IDIwNi42MDIyNCAwIDExNC4wOTQwOC05Mi40OTc5MiAyMDYuNjAyMjQtMjA2LjYwMjI0IDIwNi42MDIyNHogbTAgMCIgZmlsbD0iIzY0YWFkZCIgcC1pZD0iMjUzMjUiPjwvcGF0aD48L3N2Zz4=");'
          );
        } else {
          globalEye.title = "点击查看原始数据";
          globalEye.setAttribute(
            "style",
            'background-image: url("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB0PSIxNzIxMDUyMDk0NjMwIiBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjI1NTM4IiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgd2lkdGg9IjIwMCIgaGVpZ2h0PSIyMDAiPjxwYXRoIGQ9Ik0xOTIuODUzMzMzIDI1My4xODRMNTkuNDM0NjY3IDExOS44MDhsNjAuMzczMzMzLTYwLjM3MzMzMyA4NDQuNzU3MzMzIDg0NC44LTYwLjM3MzMzMyA2MC4zMzA2NjYtMTQxLjIyNjY2Ny0xNDEuMjI2NjY2QTQ2Ny4xNTczMzMgNDY3LjE1NzMzMyAwIDAgMSA1MTIgODk2Yy0yMzAuMDU4NjY3IDAtNDIxLjQ2MTMzMy0xNjUuNTQ2NjY3LTQ2MS42MTA2NjctMzg0YTQ2OC41NjUzMzMgNDY4LjU2NTMzMyAwIDAgMSAxNDIuNTA2NjY3LTI1OC44MTZ6IG00MzYuNzc4NjY3IDQzNi44MjEzMzNsLTYyLjQ2NC02Mi40NjRhMTI4IDEyOCAwIDAgMS0xNzAuNzA5MzMzLTE3MC43MDkzMzNMMzMzLjk5NDY2NyAzOTQuMzY4YTIxMy4zMzMzMzMgMjEzLjMzMzMzMyAwIDAgMCAyOTUuNjM3MzMzIDI5NS42MzczMzN6TTM0MC4yMjQgMTYwLjQyNjY2N0MzOTMuNDI5MzMzIDEzOS41MiA0NTEuNDEzMzMzIDEyOCA1MTIgMTI4YzIzMC4wNTg2NjcgMCA0MjEuNDYxMzMzIDE2NS41NDY2NjcgNDYxLjYxMDY2NyAzODRhNDY3LjA3MiA0NjcuMDcyIDAgMCAxLTg1Ljg0NTMzNCAxOTUuOTI1MzMzbC0xNjQuNjkzMzMzLTE2NC42OTMzMzNhMjEzLjMzMzMzMyAyMTMuMzMzMzMzIDAgMCAwLTI0Mi4zNDY2NjctMjQyLjM0NjY2N0wzNDAuMjI0IDE2MC40NjkzMzN6IiBwLWlkPSIyNTUzOSIgZmlsbD0iIzY0YWFkZCI+PC9wYXRoPjwvc3ZnPg==");'
          );
        }
        let pn = el.querySelector('.bi-text-editor input').value
        if (pn && index > -1) {
          window.contentPane.toolbar.children[index]._children[0].editor.editor.onKeyDown(13, false)
        } else {
          console.log("listen search Btn click")
          searchEl.click()
        }
      })
    }
  }, 100)
}