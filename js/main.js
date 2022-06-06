(function ($) {

    $('.wrapper').imagesLoaded({
        background: true
    });

    /*==================================================
    =                   SmoothScroll                   =
    ==================================================*/

    gsap.registerPlugin(ScrollTrigger);

    function scrollSmooth() {
        const locoScroll = new LocomotiveScroll({
            el: document.querySelector('.wrapper'),
            smooth: true,
            // multiplier: 1.2
        });

        locoScroll.on("scroll", ScrollTrigger.update);

        ScrollTrigger.scrollerProxy(".wrapper", {
            scrollTop(value) {
              return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
            },

            getBoundingClientRect() {
              return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
            }
            // pinType: document.querySelector(".wrapper").style.transform ? "transform" : "fixed"
        });

        gsap.from(".wrapper-line", {
            scrollTrigger: {
                trigger: ".wrapper-line",
                scroller: ".wrapper",
                scrub: true,
                start: "0 0",
                end: () => `+=${document.querySelector(".wrapper").offsetHeight - window.innerHeight}`
                // markers: {
                // 	startColor: "#fff",
                // 	endColor: "#fff"
                // }
            },
            scaleY: 0,
            transformOrigin: "0 0",
            ease: "none"
        });

        ScrollTrigger.addEventListener("refresh", () => locoScroll.update());
        ScrollTrigger.refresh();
    }

    /*============  End of SmoothScroll  =============*/

    /*===================================
    =            Menu Mobile            =
    ===================================*/

    var navButtonMobile = document.getElementById('navButtonMobile'),
        navMainMobile = document.getElementById('navMobile'),
        navButtonLineTop = document.querySelector('.nav-button-line__top'),
        navButtonLineMiddle = document.querySelector('.nav-button-line__middle'),
        navButtonLineBottom = document.querySelector('.nav-button-line__bottom'),
        headerBack = document.getElementById('headerBack')
    ;

    function navMenuOpenMobile() {

        var tl = new gsap.timeline({reversed: true});

        tl
            .to(headerBack, {
                duration: 0.4,
                delay: -1,
                autoAlpha: 1,
                visibility: 'visible',
                // xPercent: -100,
                ease: 'power1'
            })
            .to(navMainMobile, {
                duration: 0.4,
                delay: -1.2,
                x: 0,
                visibility: 'visible',
                // autoAlpha: 1,
                ease: 'power2'
            })
            .to(navButtonLineMiddle, {
                duration: 0.3,
                delay: -0.6,
                rotation: '180deg',
                ease: 'power2'
            })
            .to(navButtonLineTop, 0.3, {
                duration: 0.3,
                delay: -0.6,
                rotation: '135deg',
                x: '30%',
                y: '200%',
                scaleX: 0.6,
                ease: 'power2'
            })
            .to(navButtonLineBottom, 0.3, {
                duration: 0.3,
                delay: -0.6,
                rotation: '-135deg',
                x: '30%',
                y: '-200%',
                scaleX: 0.6,
                ease: 'power2'
            })
        ;

        /*jshint -W030 */
        navButtonMobile.addEventListener('click', function () {
            tl.reversed() ? tl.restart() : tl.reverse();
        });
        headerBack.addEventListener("click", function () {
            tl.reverse();
        });

    }

    /*=====  End of Menu Mobile  ======*/

    /*============  End of Mobile Search  =============*/

    /*===============================================
    =                   Magnific                   =
    ===============================================*/

    function magnificVideo() {
        $('.post-video').magnificPopup({
            delegate: 'a.post-video__image', // child items selector, by clicking on it popup will open
            type: 'iframe',
            iframe: {
                markup: '<div class="mfp-iframe-scaler">' +
                    '<div class="mfp-close"></div>' +
                    '<iframe class="mfp-iframe" frameborder="0" allowfullscreen></iframe>' +
                    '</div>', // HTML markup of popup, `mfp-close` will be replaced by the close button

                patterns: {
                    youtube: {
                        index: 'youtube.com/', // String that detects type of video (in this case YouTube). Simply via url.indexOf(index).

                        id: 'v=', // String that splits URL in a two parts, second part should be %id%
                        // Or null - full URL will be returned
                        // Or a function that should return %id%, for example:
                        // id: function(url) { return 'parsed id'; }

                        src: '//www.youtube.com/embed/%id%?autoplay=1' // URL that will be set as a source for iframe.
                    },
                    vimeo: {
                        index: 'vimeo.com/',
                        id: '/',
                        src: '//player.vimeo.com/video/%id%?autoplay=1'
                    },
                    gmaps: {
                        index: '//maps.google.',
                        src: '%id%&output=embed'
                    }

                    // you may add here more sources

                },
                srcAction: 'iframe_src', // Templating object key. First part defines CSS selector, second attribute. "iframe_src" means: find "iframe" and set attribute "src".
            }

        });
    }

    /*============  End of Magnific  =============*/

    function initPage() {

    }

    function initPageMobile() {


    }

    if (document.body.clientWidth > 768 || screen.width > 768) {

        initPage();

    } else {

        initPageMobile();
    }

})(jQuery);