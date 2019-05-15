/*
Tab selector simple - Code by Zsolt Király
v1.0.5 - 2017-11-23
*/

'use strict';

function signatura() {
    if (window['console']) {
        const text = {
            black: '%c     ',
            blue: '%c   ',
            author: '%c  Zsolt Király  ',
            github: '%c  https://zsoltkiraly.com/'
        }

        const style = {
            black: 'background: #282c34',
            blue: 'background: #61dafb',
            author: 'background: black; color: white',
            github: ''
        }

        console.log(text.black + text.blue + text.author + text.github, style.black, style.blue, style.author, style.github);
    }
}

signatura();

var tabSelector = function() {

    function hasTouch() {
        return 'ontouchstart' in document.documentElement || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0;
    }
    
    if (hasTouch()) {
        try {
            for (var si in document.styleSheets) {
                var styleSheet = document.styleSheets[si];
                if (!styleSheet.rules) continue;
    
                for (var ri = styleSheet.rules.length - 1; ri >= 0; ri--) {
                    if (!styleSheet.rules[ri].selectorText) continue;
    
                    if (styleSheet.rules[ri].selectorText.match(':hover')) {
                        styleSheet.deleteRule(ri);
                    }
                }
            }
        } catch (ex) {}
    }
    
    var forEach = function(array, callback, scope) {
        var i = 0,
            len = array.length;
        if (len > 0) {
            for (; i < len; i++) {
                callback.call(scope, i, array[i]);
            }
        }
    }
    
    function getWidth() {
        return window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    }

    function findAncestor(el, cls) {
        while ((el = el.parentElement) && !el.classList.contains(cls));
        return el;
    }

    function tab(nav, t) {
        forEach(t, function(index, tabItems) {
            tabItems.setAttribute('data-id', index + 1);
        });

        forEach(nav, function(index, navItems) {
            navItems.setAttribute('data-id', index + 1);

            navItems.addEventListener('click', function() {
                var obj = this,
                    tabContainer = findAncestor(obj, 'tab-container'),
                    objTabsNavigation = tabContainer.querySelector('.tab-select-container'),
                    objPlaceholder = tabContainer.querySelector('.tabs-navigation-container .select-placeholder'),
                    objSibling = tabContainer.querySelectorAll('.tabs-navigation-container ul.tab-select-container li'),
                    objTab = tabContainer.querySelectorAll('.tab-content-container .tab-content');

                if (nav.length > 1) {
                    objPlaceholder.innerHTML = obj.innerHTML;

                    if (window.matchMedia('only screen and (max-width: 599px)').matches) {
                        objTabsNavigation.style.maxHeight = '0px';
                    }

                    setTimeout(function() {
                        collapsed(objTabsNavigation);
                        objTabsNavigation.classList.add('in-active');
                    }, 500);

                    collapsed(objPlaceholder);

                    objPlaceholder.classList.remove('start-animation');
                    objPlaceholder.classList.add('finish-animation');
                }

                forEach(objSibling, function(index, objNavs) {
                    if (obj == objNavs) {
                        objNavs.classList.add('active');

                    } else {
                        objNavs.classList.remove('active');
                    }
                });

                forEach(objTab, function(index, objItems) {
                    var objGetDataId = obj.getAttribute('data-id');
                    var tabItemsGetDataId = objItems.getAttribute('data-id');

                    if (objGetDataId == tabItemsGetDataId) {

                        objItems.classList.add('active');

                        setTimeout(function() {
                            objItems.classList.add('in');
                        }, 50);

                    } else {
                        objItems.classList.remove('active');
                        objItems.classList.remove('in');
                    }
                });

            }, false);
        });
    }

    function expanded(navigation) {
        navigation.classList.remove('collapsed');
        navigation.classList.add('expanded');
    }

    function collapsed(navigation) {
        navigation.classList.remove('expanded');
        navigation.classList.add('collapsed');
    }

    function mobileNavigation(webtownT, ph, nav) {
        if (nav.length > 1) {
            var activeElement = webtownT.querySelector('ul.tab-select-container li.active'),
                tabsNavigation = webtownT.querySelector('ul.tab-select-container'),
                placeholder = webtownT.querySelector('.select-placeholder');

            var activeElementInnerHTML = activeElement.innerHTML;

            ph.innerHTML = activeElementInnerHTML;

            function loadHeight() {
                if (tabsNavigation) {
                    if (window.matchMedia('only screen and (max-width: 599px)').matches) {
                        if (tabsNavigation.classList.contains('collapsed')) {
                            tabsNavigation.classList.remove('collapsed', 'in-active');
                            tabsNavigation.style.maxHeight = '';
                            tabsNavigation.setAttribute('data-height', tabsNavigation.offsetHeight);
                            tabsNavigation.classList.add('collapsed', 'in-active');
                            tabsNavigation.style.maxHeight = '0px';
                        } else {
                            tabsNavigation.style.maxHeight = '';
                            tabsNavigation.setAttribute('data-height', tabsNavigation.offsetHeight);
                            tabsNavigation.style.maxHeight = tabsNavigation.getAttribute('data-height') + 'px';
                        }
                    } else {
                        tabsNavigation.style.maxHeight = '';
                    }
                }
            }

            loadHeight();

            var cachedWidth = getWidth();

            window.addEventListener('resize', function() {
                var newWidth = getWidth();

                if(newWidth !== cachedWidth) {
                    loadHeight();
                }
            }, false);

            function toggle() {
                if (window.matchMedia('only screen and (max-width: 599px)').matches) {
                    if (tabsNavigation) {
                        if (tabsNavigation.classList.contains('collapsed')) {
                            tabsNavigation.classList.remove('in-active');

                            expanded(tabsNavigation);
                            expanded(placeholder);

                            setTimeout(function() {
                                tabsNavigation.style.maxHeight = tabsNavigation.getAttribute('data-height') + 'px';
                            }, 50);

                            placeholder.classList.add('start-animation');
                            placeholder.classList.remove('finish-animation');

                        } else {
                            tabsNavigation.style.maxHeight = '0px';

                            setTimeout(function() {
                                collapsed(tabsNavigation);

                                tabsNavigation.classList.add('in-active');
                            }, 500);

                            collapsed(placeholder);

                            placeholder.classList.remove('start-animation');
                            placeholder.classList.add('finish-animation');
                        }
                    }
                }
            };

            if (placeholder) {
                placeholder.addEventListener('click', function() {
                    toggle();
                }, false);
            }
        } else {
            ph.classList.add('one');
        }
    }

    function app(c) {
        var webtownTabSelector = document.querySelector('.tab-selector#' + c.namespace + '');

        if(webtownTabSelector) {

            var navigation = webtownTabSelector.querySelectorAll('ul.tab-select-container li'),
                placeholder = webtownTabSelector.querySelector('.select-placeholder'),
                tabs = webtownTabSelector.querySelectorAll('.tab-content');

            navigation[0].classList.add('active')
            tabs[0].classList.add('active');

            tab(navigation, tabs);

            mobileNavigation(webtownTabSelector, placeholder, navigation); 
        }
    }

    return {
        app: app
    }
}();