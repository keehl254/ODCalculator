
function sliceSize(dataNum, dataTotal) {
  return (dataNum / dataTotal) * 360;
}

function addSlice(id, sliceSize, pieElement, offset, sliceID, color) {
  $(pieElement).append("<div class='slice "+ sliceID + "'><span></span></div>");
  var offset = offset - 1;
  var sizeRotation = -179 + sliceSize;

  $(id + " ." + sliceID).css({
    "transform": "rotate(" + offset + "deg) translate3d(0,0,0)"
  });

  $(id + " ." + sliceID + " span").css({
    "transform"       : "rotate(" + sizeRotation + "deg) translate3d(0,0,0)",
    "background-color": color
  });
}

function iterateSlices(id, sliceSize, pieElement, offset, dataCount, sliceCount, color) {
  var maxSize = 179, sliceID = "s" + dataCount + "-" + sliceCount;

  if( sliceSize <= maxSize ) {
    addSlice(id, sliceSize, pieElement, offset, sliceID, color);
  } else {
    addSlice(id, maxSize, pieElement, offset, sliceID, color);
    iterateSlices(id, sliceSize-maxSize, pieElement, offset+maxSize, dataCount, sliceCount+1, color);
  }
}

function createPercentagePie(percent, id, mainColor, offColor) {
  var
    listData      = [],
    listTotal     = 0,
    i             = 0,
    pieElement    = id + " .pie-chart__pie"
    dataElement   = id + " .pie-chart__legend"

  listData.push(percent);
  if(percent < 100)
    listData.push(100-percent);
  listTotal = 100

  $(pieElement).html("");

  var size = sliceSize(listData[0], listTotal);
  iterateSlices(id, size, pieElement, 0, 0, 0, mainColor);
  $(dataElement + " li:nth-child(1)").css("border-color", mainColor);

  if(percent < 100) {
    iterateSlices(id, (listData[1] / listTotal) * 360, pieElement, size, 1, 0, offColor);
    $(dataElement + " li:nth-child(2)").css("border-color", offColor);
  }
}

function shuffle(a) {
    var j, x, i;
    for (i = a.length; i; i--) {
        j = Math.floor(Math.random() * i);
        x = a[i - 1];
        a[i - 1] = a[j];
        a[j] = x;
    }

    return a;
}

function createPieCharts() {

  createPercentagePie(100,'.pieID--penetration','#00b050','#22ff00' );
  createPercentagePie(100,'.pieID--signup-rate','#00b050','#22ff00' );
}
