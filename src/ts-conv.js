// https://github.com/m9aertner/ts-converter
(function() {
  var timestamp = document.getElementById('timestamp_gmt');
  if(!!timestamp) {
    console.log("Timestamp Converter GMT: timestamp_gmt element already present, retreat.")
    return;
  }

  var timestamp = document.createElement('div');
  timestamp.setAttribute("id", "timestamp_gmt");
  timestamp.setAttribute('class', 'timestamp_gmt timestamp_icn');
  document.body.appendChild(timestamp);

  document.addEventListener('mouseup', function (e) {
    if (!e.target.matches('.timestamp_gmt')) {
      var selection = window.getSelection();
      if (!!selection) {
        selection = selection.toString();
        if (!isNaN(selection)) {
          if (selection.length === 10) {
            var decodedTS = new Date(JSON.parse(selection) * 1000).toISOString();
            showTimestampGMT(timestamp, e.pageX, e.pageY, decodedTS, selection);
          } else if (selection.length === 13) {
            var decodedTS = new Date(JSON.parse(selection)).toISOString();
            showTimestampGMT(timestamp, e.pageX, e.pageY, decodedTS, selection);
          }
        }

        function showTimestampGMT(timestamp, xPos, yPos, decodedTS, selection) {
          timestamp.innerText = decodedTS;
          timestamp.style.top = yPos + 'px';
          timestamp.style.left = xPos + 'px';
          timestamp.className = "timestamp_gmt timestamp_icn";
          timestamp.style.visibility = 'visible';
          console.log("Timestamp Converter GMT: ", selection, decodedTS);
        }
      }
    } else {
      // When clicking the timestamp window, copy content to clipboard
      navigator.clipboard.writeText(e.target.innerText).then(function () {
        console.log("Timestamp Converter GMT: Sent to clipboard.", e.target.innerText);
        // rotate image as visual cue via CSS
        e.target.classList.toggle("timestamp_icn")
        e.target.classList.toggle("timestamp_clp")
      }, function (err) {
        console.error('Timestamp Converter GMT: Failed to send to clipboard.', err);
      });
    }
  }, false);

  document.addEventListener('mousedown', function (e) {
    if (!e.target.matches('.timestamp_gmt')) {
      timestamp.style.visibility = 'hidden';
      var selection = window.getSelection();
      if (!!selection) {
        selection.removeAllRanges();
      }
    }
  }, false);
})()
