var SENSITIVE_DATA_DIC_8942 = [];
var SENSITIVE_KEY_8942 = "573f1757ddf9eac3f4eaa4ff3f7587f7";
var SENSITIVE_FLAG_8942 = false;
var TIMER_8942 = null;


/** 解码不可见字符 **/
function findCodeForEye(c) {
    var zeroWidthArray = [
        String.fromCharCode(8204),
        String.fromCharCode(8205),
        String.fromCharCode(8203),
        String.fromCharCode(65279),
    ]
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

    if (el.insertAdjacentHTML) {//IE
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
                    if (node.nodeType == 3 && node.nodeValue) {
                        var reg = new RegExp(String.fromCharCode(8288) + ".*?" + String.fromCharCode(8288), "ig");
                        var splitByReg = node.nodeValue.split(reg);
                        var nodeValueArr = node.nodeValue.match(reg);
                        if (nodeValueArr && nodeValueArr.length) {
                            var originClass = "";
                            var parentNode = node.parentNode;
                            if(parentNode) {
                                originClass = parentNode.className || "";
                            }
                            var resultSpan = document.createElement("span");
                            resultSpan.className = "eyes-8942-outer"
                            for (var i = 0; i < nodeValueArr.length; i++) {
                                //获取对应敏感数据的id
                                var singleValue = nodeValueArr[i];
                                var singleValueArr = singleValue.split("");
                                var result = "";
                                var resultId = "";
                                for (var j = 0; j < singleValueArr.length; j++) {
                                    if (j == 0 || j == singleValueArr.length - 1) continue
                                    result = result + findCodeForEye(singleValueArr[j]);
                                }
                                if (result) {
                                    try {
                                        resultId = parseInt(result, 4);
                                    } catch (e) {
                                        console.log("parseInt error")
                                    }
                                }

                                // 设置容器
                                var wrapperSpan = document.createElement("span");
                                wrapperSpan.className = "eyes-8942-wrapper";
                                // 设置小眼睛
                                var eyes = document.createElement("span");
                                eyes.className = "eyes-8942-icon";
                                eyes.setAttribute(
                                    "data-isShowDesensitizationText",
                                    "false"
                                );
                                eyes.setAttribute(
                                    "style",
                                    'background-image: url("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB0PSIxNzAxMzMwMjk3ODY0IiBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjExNDQiIGRhdGEtc3BtLWFuY2hvci1pZD0iYTMxM3guY29sbGVjdGlvbnNfZGV0YWlsLjAuaTguNjkxMzNhODFYVHhhaXciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCI+PHBhdGggZD0iTTUxMiAyNTZjLTE2OCAwLTMyOS42IDEwNi40LTM4NCAyNTYgNTQuNCAxNDkuNiAyMTYgMjU2IDM4NCAyNTYgMTY3LjIgMCAzMzAuNC0xMDYuNCAzODQuOC0yNTZDODQxLjYgMzYyLjQgNjc5LjIgMjU2IDUxMiAyNTZ6IG0wIDQxNmMtODggMC0xNjAtNzItMTYwLTE2MHM3Mi0xNjAgMTYwLTE2MCAxNjAgNzIgMTYwIDE2MC03MiAxNjAtMTYwIDE2MHogbTk2LTE2MGMwIDUyLjgtNDMuMiA5Ni05NiA5NnMtOTYtNDMuMi05Ni05NiA0My4yLTk2IDk2LTk2IDk2IDQzLjIgOTYgOTZ6IiBwLWlkPSIxMTQ1IiBkYXRhLXNwbS1hbmNob3ItaWQ9ImEzMTN4LmNvbGxlY3Rpb25zX2RldGFpbC4wLmk2LjY5MTMzYTgxWFR4YWl3IiBjbGFzcz0ic2VsZWN0ZWQiIGZpbGw9IiM2NGFhZGQiPjwvcGF0aD48L3N2Zz4=");'
                                )
                                //设置弹框 显示原始数据
                                var modal = document.createElement("span");
                                modal.className = "origin-8942-text";
                                var sensData = "";
                                for (var k = 0; k < SENSITIVE_DATA_DIC_8942.length; k++) {
                                    var item = SENSITIVE_DATA_DIC_8942[k] || {};
                                    if (item[resultId]) {
                                        sensData = item[resultId];
                                    }
                                }
                                modal.innerHTML = sensData;
                                // 设置文案
                                var text = document.createElement("span");
                                text.className = `eyes-8942-text ${originClass}`;
                                text.innerHTML = nodeValueArr[i];
                                // 插入节点
                                wrapperSpan.appendChild(eyes);
                                wrapperSpan.appendChild(modal);
                                wrapperSpan.appendChild(text);
                                if (splitByReg[i]) {
                                    insertHTMLForEye(resultSpan, "beforeend", splitByReg[i]);
                                }
                                resultSpan.appendChild(wrapperSpan);
                            }
                            // 替换节点
                            if (splitByReg[splitByReg.length - 1]) {
                                insertHTMLForEye(resultSpan, "beforeend", splitByReg[splitByReg.length - 1]);
                            }
                            var classList = node.parentNode.classList;
                            if (!(classList && classList.length && classList.contains("eyes-8942-text"))) {
                                node.parentNode.insertBefore(resultSpan, node);
                                node.parentNode.removeChild(node);
                                node = resultSpan;
                            }
                        }
                    } else if (node.nodeType == 1) {
                        recursiveWalk(node);
                    }
                    node = node.nextSibling;
                }
            }
        })(element);
    }

    styleTextNodes(document.querySelector("body"));
};

/** 监听页面点击事件 **/
(function () {
    document.addEventListener("click", function (e) {
        e.stopPropagation();
        try {
            var allModalNodes = document.getElementsByClassName("origin-8942-text");
            if (allModalNodes && e.target.className !== "origin-8942-text") {
                for (var i = 0; i < allModalNodes.length; i++) {
                    allModalNodes[i].setAttribute(
                        "style",
                        "display: none;"
                    )
                }
            }
            if (e.target.className === "eyes-8942-icon") {
                var targetNode = e.target;
                var modalNode = targetNode.nextSibling;
                var isShowDesensitizationText = targetNode.getAttribute(
                    "data-isShowDesensitizationText"
                );
                modalNode.setAttribute(
                    "style",
                    "display: inline-block;"
                )
                /*  if (isShowDesensitizationText === "true") {
                      targetNode.setAttribute(
                          "data-isShowDesensitizationText",
                          "false"
                      );
                      targetNode.setAttribute(
                          "style",
                          'background-image: url("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB0PSIxNzAxMzMwMjk3ODY0IiBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjExNDQiIGRhdGEtc3BtLWFuY2hvci1pZD0iYTMxM3guY29sbGVjdGlvbnNfZGV0YWlsLjAuaTguNjkxMzNhODFYVHhhaXciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCI+PHBhdGggZD0iTTUxMiAyNTZjLTE2OCAwLTMyOS42IDEwNi40LTM4NCAyNTYgNTQuNCAxNDkuNiAyMTYgMjU2IDM4NCAyNTYgMTY3LjIgMCAzMzAuNC0xMDYuNCAzODQuOC0yNTZDODQxLjYgMzYyLjQgNjc5LjIgMjU2IDUxMiAyNTZ6IG0wIDQxNmMtODggMC0xNjAtNzItMTYwLTE2MHM3Mi0xNjAgMTYwLTE2MCAxNjAgNzIgMTYwIDE2MC03MiAxNjAtMTYwIDE2MHogbTk2LTE2MGMwIDUyLjgtNDMuMiA5Ni05NiA5NnMtOTYtNDMuMi05Ni05NiA0My4yLTk2IDk2LTk2IDk2IDQzLjIgOTYgOTZ6IiBwLWlkPSIxMTQ1IiBkYXRhLXNwbS1hbmNob3ItaWQ9ImEzMTN4LmNvbGxlY3Rpb25zX2RldGFpbC4wLmk2LjY5MTMzYTgxWFR4YWl3IiBjbGFzcz0ic2VsZWN0ZWQiIGZpbGw9IiM2NGFhZGQiPjwvcGF0aD48L3N2Zz4=");'
                      )
                      modalNode.setAttribute(
                          "style",
                          "display: none;"
                      )
                  } else {
                      targetNode.setAttribute(
                          "data-isShowDesensitizationText",
                          "true"
                      );
                      targetNode.setAttribute(
                          "style",
                          'background-image: url("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB0PSIxNzAxMzMwMjcwOTQwIiBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjkwNSIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIj48cGF0aCBkPSJNMjUzLjYgNjc5LjJsMTA5LjYtMTA5LjZDMzU2IDU1MiAzNTIgNTMyLjggMzUyIDUxMmMwLTg4IDcyLTE2MCAxNjAtMTYwIDIwLjggMCA0MCA0IDU3LjYgMTEuMmw4Mi40LTgyLjRjLTQ0LjgtMTYtOTItMjQuOC0xNDAtMjQuOC0xNjggMC0zMjkuNiAxMDYuNC0zODQgMjU2IDI0IDY1LjYgNjguOCAxMjMuMiAxMjUuNiAxNjcuMnoiIHAtaWQ9IjkwNiIgZGF0YS1zcG0tYW5jaG9yLWlkPSJhMzEzeC5jb2xsZWN0aW9uc19kZXRhaWwuMC5pMy42OTEzM2E4MVhUeGFpdyIgY2xhc3M9IiIgZmlsbD0iIzY0YWFkZCI+PC9wYXRoPjxwYXRoIGQ9Ik00MTYgNTEydjQuOEw1MTYuOCA0MTZINTEyYy01Mi44IDAtOTYgNDMuMi05NiA5NnogbTM1NC40LTE2Ny4ybDE2My4yLTE2My4yTDg4OCAxMzYgMTM0LjQgODg5LjZsNDUuNiA0NS42IDE5Mi44LTE5Mi44QTM5MC40IDM5MC40IDAgMCAwIDUxMiA3NjhjMTY3LjIgMCAzMzAuNC0xMDYuNCAzODQuOC0yNTYtMjQtNjUuNi02OS42LTEyMy4yLTEyNi40LTE2Ny4yek01MTIgNjcyYy0yMCAwLTQwLTQtNTcuNi0xMS4ybDUzLjYtNTMuNmg0LjhjNTIuOCAwIDk2LTQzLjIgOTYtOTZ2LTQuOGw1My42LTUzLjZDNjY4IDQ3MiA2NzIgNDkyIDY3MiA1MTJjMCA4OC03MiAxNjAtMTYwIDE2MHoiIHAtaWQ9IjkwNyIgZGF0YS1zcG0tYW5jaG9yLWlkPSJhMzEzeC5jb2xsZWN0aW9uc19kZXRhaWwuMC5pMC42OTEzM2E4MVhUeGFpdyIgY2xhc3M9InNlbGVjdGVkIiBmaWxsPSIjNjRhYWRkIj48L3BhdGg+PC9zdmc+");'
                      )
                      modalNode.setAttribute(
                          "style",
                          "display: inline-block;"
                      )
                  }*/
            }
        } catch (e) {
            console.log("onclick listener error")
        }
    });
})();

/** 未知对象检索field对应的字符串并解码 **/
function findKeyForEye(result, data, field) {
    if (!data || typeof data === 'string') return false;
    try {
        for (var key in data) {
            if (key === field && data[key] && typeof data[key] === "string") {
                SENSITIVE_FLAG_8942 = true;
                var decodeStr = base64_decode_8942(data[key]) || "{}";
                var obj = JSON.parse(decodeStr);
                var _temp = Object.keys(obj);
                if (_temp && _temp.length) {
                    for (var i = 0; i < _temp.length; i++) {
                        if (result && result.length > 100) {
                            result.shift();
                        }
                        result.push({[_temp[i]]: obj[_temp[i]]});
                    }
                }
            }
            if (typeof (data[key]) === 'object') {
                findKeyForEye(result, data[key], field);
            }
        }
    } catch (e) {
        console.log(e)
    }
    return null;
}

/** base64解码 **/
function base64_decode_8942(str) {
    if (!str) return "";
    try {
        var arr = atob(str).split('');
        var resultArr = [];
        if (arr && arr.length) {
            for (var i = 0; i < arr.length; i++) {
                var c = arr[i];
                resultArr.push('%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
            }
        }
        return decodeURIComponent(resultArr.join(''));
    } catch (e) {
        console.log("base64_decode error")
    }
}

(function run_per_second_8942(){
    let count = 0; // 计数器，用于跟踪函数执行的次数
    const maxExecutions = 5; // 设置最大执行次数

    const myFunction = () => {
        render_eyes_8942();
        ++count;

        if (count < maxExecutions) {
            clearTimeout(TIMER_8942);
            TIMER_8942 = setTimeout(myFunction, 1000);
        } else {
            clearTimeout(TIMER_8942);
        }
    };

    myFunction();
})();




