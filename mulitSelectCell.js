(function ( $ ) {
      $.fn.multiSelectCell = function(){
      var target = $(this);
      var isCtrlPressed = false;
      var isCtrlSelecte = true;
        $(target)
                .mousedown(rangeMouseDown)
                .mouseup(rangeMouseUp)
                .mousemove(rangeMouseMove)

                ;
        $('body').keydown(checkCtrlPress)
                 .keyup(releaseCtrlPress);
        $('body').mousedown(outRange);
        var dragStart = 0;
        var dragEnd = 0;
        var isDragging = false;

        function outRange(e)
        {
            console.log('outRange');
                  $(target).removeClass('selected');
        }
        function checkCtrlPress(e) {
                      
            if (!isCtrlSelecte) {
                isCtrlPressed = false;
                return isCtrlPressed;
            }

            if ( (e.which == '91') ||(e.which =='224' ) ||( e.which=='17')) {
                isCtrlPressed = true;
            } else {
                isCtrlPressed = false;
            }
        }

        function releaseCtrlPress(e) {
            isCtrlPressed = false;
        }

        function rangeMouseDown(e) {
             e.stopPropagation();
            if (isRightClick(e)) {
                return false;
            } else {
                var allCells = target;
                dragStart = allCells.index($(this));
                isDragging = true;

                if (typeof e.preventDefault != 'undefined') { e.preventDefault(); } 
                document.documentElement.onselectstart = function () {
                 return false; 
             };
            }
        }

        function rangeMouseUp(e) {
            if (isRightClick(e)) {
                return false;
            } else {
                var allCells = target;
                dragEnd = allCells.index($(this));
                isDragging = false;
                if (dragEnd !== 0) {
                    selectRange();
                }

                document.documentElement.onselectstart = function () { return true; }; 
            }
        }

        function rangeMouseMove(e) {
            if (isDragging) {
                var allCells = target;
                dragEnd = allCells.index($(this));
                selectRange();
            }            
        }

        function selectRange() {
            if (!isCtrlPressed) {
                target.removeClass('selected');
            }
            
            if (dragEnd + 1 < dragStart) { // reverse select
                target.slice(dragEnd, dragStart + 1).addClass('selected');
            } else {
                target.slice(dragStart, dragEnd + 1).addClass('selected');
            }
        }

        function isRightClick(e) {
            if (e.which) {
                return (e.which == 3);
            } else if (e.button) {
                return (e.button == 2);
            }
            return false;
        }
  };
}(jQuery));



