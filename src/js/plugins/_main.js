window.context = {};
//initial event
(function ($) {
    $(document).ready(function ($) {
        var _isMobile = function () {
            if ($.isMobile()) {
                $('#body').addClass('mobile');
            } else {
                $('#body').addClass('desktop');
            }
        };
        var _eventKeyDownListener = function () {
            $(window).on('keydown', function (e) {
                var $focus = $(':focus');
                var tagName = $focus.length > 0 ? $focus.tagName : '';
                if (tagName !== 'INPUT' && tagName !== 'TEXTAREA') {
                    $(document).trigger('dom.keydown', [e]);
                }
            });
        };
        var originalScrollTop = 0;
        var isScrollDown;
        var _scrollTrigger = function (e) {
            //in mobile device the scroll will cause by focus in input
            var causeByKeyboard = $('input, select, textarea').is(':focus');
            var currentScrollTop = $(document).scrollTop();
            if (currentScrollTop > originalScrollTop) {
                isScrollDown = true;
            } else if (currentScrollTop < originalScrollTop) {
                isScrollDown = false;
            }
            originalScrollTop = currentScrollTop;
            $(document).trigger('dom.scroll', [e, isScrollDown, originalScrollTop, causeByKeyboard]);
        };
        var _eventScrollListener = function () {
            $(window).on('scroll', $.throttle(function (e) {
                _scrollTrigger(e);
            }, 100));
        };

        var _oringalWindowWidth = $(window).width();
        var _resizeTrigger = function (e) {
            var isWidthChange = _oringalWindowWidth != $(window).width();
            var causeByKeyboard = $('input, select, textarea').is(':focus');
            $(document).trigger('dom.resize', [e, causeByKeyboard, isWidthChange]);
        };
        var _eventResizeListener = function () {
            $(window).on('resize', $.throttle(function (e) {
                _resizeTrigger(e);
            }, 200));
        };
        //dom load
        _isMobile();
        _eventKeyDownListener();
        _eventScrollListener();
        _eventResizeListener();
        $(document).trigger('dom.load');
    });
})(jQuery);
