import { Scroller } from "./Scroller";
import { ScrollerRender } from "./ScrollerRender";

export const initScroller = (container: any, contentDom: any) => {
  let clientWidth = 0;
  let clientHeight = 0;

  let { width: contentWidth, height: contentHeight } =
    contentDom.getBoundingClientRect();

  const scroller = new Scroller(ScrollerRender(contentDom), {
    zooming: true,
  });
  var rect = container.getBoundingClientRect();
  scroller.setPosition(
    rect.left + container.clientLeft,
    rect.top + container.clientTop
  );
  var reflow = function () {
    clientWidth = container.clientWidth;
    clientHeight = container.clientHeight;
    scroller.setDimensions(
      clientWidth,
      clientHeight,
      contentWidth,
      contentHeight
    );
  };

  window.addEventListener("resize", reflow, false);
  reflow();

  var mousedown = false;
  container.addEventListener(
    "mousedown",
    function (e) {
      if (e.target.tagName.match(/input|textarea|select/i)) {
        return;
      }

      scroller.doTouchStart(
        [
          {
            pageX: e.pageX,
            pageY: e.pageY,
          },
        ],
        e.timeStamp
      );

      mousedown = true;
    },
    false
  );

  document.addEventListener(
    "mousemove",
    function (e) {
      if (!mousedown) {
        return;
      }

      scroller.doTouchMove(
        [
          {
            pageX: e.pageX,
            pageY: e.pageY,
          },
        ],
        e.timeStamp
      );

      mousedown = true;
    },
    false
  );

  document.addEventListener(
    "mouseup",
    function (e) {
      if (!mousedown) {
        return;
      }

      scroller.doTouchEnd(e.timeStamp);

      mousedown = false;
    },
    false
  );

  container.addEventListener(
    "mousewheel",
    function (e) {
      scroller.doMouseZoom(
        e.detail ? e.detail * -120 : e.wheelDelta,
        e.timeStamp,
        e.pageX,
        e.pageY
      );
    },
    false
  );
};
