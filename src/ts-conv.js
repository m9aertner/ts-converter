// https://github.com/m9aertner/ts-converter
var timestamp = document.createElement('div');
timestamp.setAttribute('class', 'timestamp_bg');

document.addEventListener('mouseup', function(e) {

  document.body.appendChild(timestamp);

  var selection = window.getSelection();
  if (!!selection)  {
    selection = selection.toString();
    if (!isNaN(selection))  {
      if (selection.length === 10) {
        var decodedTS = new Date(JSON.parse(selection) * 1000).toISOString();
        showTimestamp(e.pageX, e.pageY, decodedTS);
      } else if (selection.length === 13) {
        var decodedTS = new Date(JSON.parse(selection)).toISOString();
        showTimestamp(e.pageX, e.pageY, decodedTS);
      }
    }
  }
}, false);

document.addEventListener('mousedown', function(e) {
  // Check target to enable mark-then-copy of the decoded timestamp
  if(e.target != timestamp) {
    timestamp.style.visibility = 'hidden';
  }
}, false);

function showTimestamp(xPos, yPos, decodedTS) {
  timestamp.innerHTML = decodedTS;
  timestamp.style.top = yPos + 'px';
  timestamp.style.left = xPos + 'px';
  timestamp.style.visibility = 'visible';
}
