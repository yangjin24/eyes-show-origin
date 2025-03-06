var SENSITIVE_DATA_DIC_8942 = [];
var SENSITIVE_KEY_8942 = "573f1757ddf9eac3f4eaa4ff3f7587f7";
var SENSITIVE_FLAG_8942 = false;

/** 瑙ｇ爜涓嶅彲瑙佸瓧绗� **/
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
 * 鍏煎娴忚鍣ㄧ殑insertAdjacentHTML
 * @param {HTMLElement} el
 * @param {String} where beforeBegin銆乤fterBegin銆乥eforeEnd銆乤fterEnd
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

/** 閬嶅巻椤甸潰node 鐗瑰畾瀛楃锛堜笉鍙锛夊寘瑁圭殑鏂囨湰鑺傜偣鎻掑叆鐪肩潧鍥炬爣鍙婃樉绀哄師濮嬫暟鎹殑寮规 **/
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
                //鑾峰彇瀵瑰簲鏁忔劅鏁版嵁鐨刬d
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
                // 璁剧疆瀹瑰櫒
                let wrapperSpan =
                  document.createElement("span");
                wrapperSpan.className = "eyes-8942-wrapper";
                // 璁剧疆灏忕溂鐫�
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
                //璁剧疆寮规 鏄剧ず鍘熷鏁版嵁
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
                // 璁剧疆鏂囨
                let text = document.createElement("span");
                text.className = `eyes-8942-text`;
                text.innerHTML = nodeValueArr[i];
                // 鎻掑叆鑺傜偣
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
                // 鍋囪element鏄瑙﹀彂eye鍥炬爣鐨勫厓绱�
                wrapperSpan.addEventListener(
                  "mouseover",
                  function (e) {
                    e.target.parentNode.classList.add(
                      "show-eye-icon"
                    ); // 娣诲姞绫讳互鏄剧ず鍥炬爣
                    // 鏌ユ壘灏忕溂鐫�
                    let eyeIcon =
                      e.target.parentNode.querySelector(
                        ".eyes-8942-icon"
                      );
                    if (eyeIcon) {
                      // 纭繚浣嶇疆姝ｇ‘锛屾牴鎹畂ver鍏冪礌鐨勪綅缃繘琛岃绠�
                      let rect =
                        e.target.parentNode.getBoundingClientRect();
                      eyeIcon.style.left =
                        rect.left - 40 + "px"; // 璋冩暣left浠ラ€傚簲浣犵殑甯冨眬
                      eyeIcon.style.top = rect.top - 10 + "px";
                    }
                  }
                );
                wrapperSpan.addEventListener(
                  "mouseout",
                  function (e) {
                    e.target.parentNode.classList.remove(
                      "show-eye-icon"
                    ); // 绉婚櫎绫讳互闅愯棌鍥炬爣
                  }
                );

                // 鐐瑰嚮eye鍥炬爣鏃舵樉绀烘垨闅愯棌Tooltip
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
                    // 纭繚Tooltip浣嶇疆姝ｇ‘锛屾牴鎹甧ye鍥炬爣鐨勪綅缃繘琛岃绠�
                    let rect = eyes.getBoundingClientRect();
                    tooltip.style.left =
                      rect.right + window.scrollX + "px"; // 璋冩暣left浠ラ€傚簲浣犵殑甯冨眬
                    tooltip.style.top =
                      rect.top -
                      tooltip.offsetHeight -
                      5 +
                      "px"; // 鍑忓幓5鏄负浜嗕笌eye鍥炬爣搴曢儴淇濇寔涓€鐐硅窛绂�
                  }
                );
              }
              // 鏇挎崲鑺傜偣
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

              // 宸茬粡娣诲姞鐨刬nput鑺傜偣锛� 閫€鍑哄鐞�
              let nodeClassList = node.classList;
              if (
                nodeClassList &&
                nodeClassList.length &&
                nodeClassList.contains("eyes-8942-text")
              ) {
                node = node.nextSibling;
                continue;
              }
              // 闈� disable / readonly 鐨刬nput, 閫€鍑哄鐞�
              if (!node.disabled && !node.readOnly) {
                node = node.nextSibling;
                continue;
              }
              try {
                let value = node.getAttribute("value") || "";
                if (value) {
                  console.log("ggggggggg", value);
                }
                let splitByReg = value.split(reg);
                let nodeValueArr = value.match(reg);
                // 娌℃湁鑴辨晱鏁版嵁锛岄€€鍑哄鐞�
                if (
                  !nodeValueArr ||
                  !nodeValueArr.length ||
                  nodeValueArr[1] === value
                ) {
                  node = node.nextSibling;
                  continue;
                }

                // 鏈€澶栧眰
                let resultSpan = document.createElement("span");
                resultSpan.className = "eyes-8942-outer";

                // 璁剧疆瀹瑰櫒
                let wrapperSpan = document.createElement("span");
                wrapperSpan.className = "eyes-8942-wrapper";
                // 璁剧疆灏忕溂鐫�
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

                //璁剧疆寮规 鏄剧ず鍘熷鏁版嵁
                let modal = document.createElement("span");
                modal.className = "origin-8942-text";

                let originText = "";

                for (let i = 0; i < nodeValueArr.length; i++) {
                  //鑾峰彇瀵瑰簲鏁忔劅鏁版嵁鐨刬d
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

                // 鎻掑叆鑺傜偣
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

                // 鍋囪element鏄瑙﹀彂eye鍥炬爣鐨勫厓绱�
                wrapperSpan.addEventListener(
                  "mouseover",
                  function (e) {
                    e.target.parentNode.classList.add(
                      "show-eye-icon"
                    ); // 娣诲姞绫讳互鏄剧ず鍥炬爣
                    // 鏌ユ壘灏忕溂鐫�
                    let eyeIcon =
                      e.target.parentNode.querySelector(
                        ".eyes-8942-icon"
                      );
                    if (eyeIcon) {
                      // 纭繚浣嶇疆姝ｇ‘锛屾牴鎹畂ver鍏冪礌鐨勪綅缃繘琛岃绠�
                      let rect =
                        e.target.parentNode.getBoundingClientRect();
                      eyeIcon.style.left =
                        rect.left - 40 + "px"; // 璋冩暣left浠ラ€傚簲浣犵殑甯冨眬
                      eyeIcon.style.top = rect.top - 10 + "px";
                    }
                  }
                );

                wrapperSpan.addEventListener(
                  "mouseout",
                  function (e) {
                    e.target.parentNode.classList.remove(
                      "show-eye-icon"
                    ); // 绉婚櫎绫讳互闅愯棌鍥炬爣
                  }
                );

                // 鐐瑰嚮eye鍥炬爣鏃舵樉绀烘垨闅愯棌Tooltip;
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
                  // 纭繚Tooltip浣嶇疆姝ｇ‘锛屾牴鎹甧ye鍥炬爣鐨勪綅缃繘琛岃绠�
                  let rect = eyes.getBoundingClientRect();
                  tooltip.style.left =
                    rect.right + window.scrollX + "px"; // 璋冩暣left浠ラ€傚簲浣犵殑甯冨眬
                  tooltip.style.top =
                    rect.top - tooltip.offsetHeight - 5 + "px"; // 鍑忓幓5鏄负浜嗕笌eye鍥炬爣搴曢儴淇濇寔涓€鐐硅窛绂�
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
            }else {
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

/** 鐩戝惉椤甸潰鐐瑰嚮浜嬩欢 **/
(function () {
  document.addEventListener("click", function (e) {
    e.stopPropagation();
    try {
      var allModalNodes =
        document.getElementsByClassName("eyes-8942-tooltip");
      if (allModalNodes && e.target.className !== "eyes-8942-tooltip") {
        for (var i = 0; i < allModalNodes.length; i++) {
          // 鎯宠鎿嶄綔鐨凞OM鍏冪礌
          var element = allModalNodes[i];
          // 瑕佺Щ闄ょ殑绫诲悕
          var classNameToRemove = "show";
          // 妫€鏌ヨ绫绘槸鍚﹀瓨鍦紝鐒跺悗鍐嶅皾璇曠Щ闄わ紝浠ラ槻涓囦竴
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

/** 鏈煡瀵硅薄妫€绱ield瀵瑰簲鐨勫瓧绗︿覆骞惰В鐮� **/
function findKeyForEye(result, data, field) {
  if (!data) return false;
  if (typeof data === "string") {
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
      if (typeof data[key] === "string") {
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

/** base64瑙ｇ爜 **/
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

/** XHR鎷︽埅鎵€鏈夎姹� **/
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
    // 涓嶅吋瀹规椂灏辩粨鏉�
    if (!realXHR) return;
    realXHR.addEventListener(
      "loadend",
      function (xhr) {
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
        ajaxEventTrigger.call(this, "ajaxReadyStateChange");
      },
      false
    );

    return realXHR;
  }

  window.XMLHttpRequest = newXHR;
})();

/** fetch鍝嶅簲鎷︽埅 **/
(function () {
  var originFetch = fetch;
  originFetch &&
  Object.defineProperty(window, "fetch", {
    configurable: true,
    enumerable: true,
    // writable: true,
    get() {
      return function (url, options) {
        options = Object.assign({}, options);
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
      };
    },
  });
})();

/** 妫€娴嬪埌鍏ㄥ眬鍙橀噺eye_573f1757ddf9eac3f4eaa4ff3f7587f7鏃� 鐩存帴娓叉煋灏忕溂鐫� **/
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
  let count = 0; // 璁℃暟鍣紝鐢ㄤ簬璺熻釜鍑芥暟鎵ц鐨勬鏁�
  const maxExecutions = 5; // 璁剧疆鏈€澶ф墽琛屾鏁�

  const myFunction = () => {
    render_eyes_8942();
    ++count;
    if (count < maxExecutions) {
      setTimeout(myFunction, 1000);
    }
  };

  myFunction();
}
