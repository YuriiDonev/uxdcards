$(document).ready(function () {
    $('.second-button').on('click', function () {
        $('.animated-icon2').toggleClass('open');
        jQuery('body').toggleClass('menu-opened');
    });
    var ww = jQuery(window).width();
    if (ww < 769) {
        jQuery('.testimonials .slick-custom-arrow-right').insertAfter('.profile');
    }
    //      jQuery('.navbar-toggle').click(function(){
    //       
    //    });

    //window and animation items
    var animation_elements = $.find('.block-view .content-wrap');
    var web_window = $(window);

    //check to see if any animation containers are currently in view
    function check_if_in_view() {
        //get current window information
        var window_height = web_window.height();
        var window_top_position = web_window.scrollTop();
        var window_bottom_position = (window_top_position + window_height);

        //iterate through elements to see if its in view
        $.each(animation_elements, function () {

            //get the element sinformation
            var element = $(this);
            var element_height = $(element).outerHeight();
            var element_top_position = $(element).offset().top;
            var element_bottom_position = (element_top_position + element_height);

            //check to see if this current container is visible (its viewable if it exists between the viewable space of the viewport)
            if ((element_bottom_position >= window_top_position) && (element_top_position <= window_bottom_position)) {
                element.addClass('in-view');
            } else {
                element.removeClass('in-view');
            }
        });

    }
    //parallax scroll
    $(window).on("load scroll", function () {
        var parallaxElement = $('.in-view'),
            parallaxQuantity = parallaxElement.length;
        window.requestAnimationFrame(function () {
            for (var i = 0; i < parallaxQuantity; i++) {
                var currentElement = parallaxElement.eq(i),
                    windowTop = $(window).scrollTop(),
                    elementTop = currentElement.offset().top,
                    elementHeight = currentElement.height(),
                    viewPortHeight = window.innerHeight * 0.5 - elementHeight * 0.5,
                    scrolled = windowTop - elementTop + viewPortHeight;
                currentElement.css({
                    transform: "translate3d(0," + scrolled * -0.15 + "px, 0)"
                });
            }
        });
    });

    //on or scroll, detect elements in view
    $(window).on('scroll resize', function () {
        check_if_in_view()
    })
    //trigger our scroll event on initial load
    $(window).trigger('scroll');


    jQuery('a').click(function () {
        jQuery(this).toggleClass('click');
    });
    
    if($.cookie('pcount')){
        jQuery('.quantity').val($.cookie('pcount'));
        jQuery('#pcount').text(function (i, txt) {
            return txt.replace(/\d+/, $.cookie('pcount'));
        });
    }

    function update_quantity() {
        var price = 97;
        var qt = jQuery('.quantity').val();
        var subtotal = price * qt;
        jQuery('.subtotal .units_price').text(function (i, txt) {
            return txt.replace(/\d+/, subtotal);
        });
        jQuery('#pcount').text(function (i, txt) {
            return txt.replace(/\d+/, qt);
        });
        $.cookie("pcount", qt, {
            expires: 10
        });
    }

    function update_price() {
        var price = 97;
        var qt = jQuery('.quantity').val();
        var subtotal = price * qt;
        var shp_cost = 30;
        var total = subtotal + shp_cost;
        jQuery('.total_block .total').text(function (i, txt) {
            return txt.replace(/\d+/, total);
        });
        var amount = total;
    }
    update_quantity();
    update_price();

    jQuery('.quantity').on('change paste keyup', function () {
        update_quantity();
        update_price();
    });
    jQuery('.units_col .number-input button').click(function () {
        update_quantity();
        update_price();
    });

    //    jQuery('.flip-container.coming_soon.active').click(function () {
    //        jQuery(this).next('.coming-soon-show').toggle();
    //    });

    //    jQuery('.modal-content').resizable({
    //        //alsoResize: ".modal-dialog",
    //        minHeight: 300,
    //        minWidth: 300
    //    });
    //    jQuery('.modal-dialog').draggable();
    //
    //    $('#suggest').on('show.bs.modal', function () {
    //        $(this).find('.modal-body').css({
    //            'max-height': '100%'
    //        });
    //    });
    jQuery('.match').matchHeight();

    function restartAnimation() {
        var cards_box = $('.cards_box').html();
        if (cards_box) {
            switch (i) {
                case 2:
                    cards_box = cards_box.replace(/card_lane1/g, 'card_lane' + i);
                    break;
                case 3:
                    cards_box = cards_box.replace(/card_lane2/g, 'card_lane' + i);
                    break;
                case 4:
                    cards_box = cards_box.replace(/card_lane3/g, 'card_lane' + i);
                    break;
                case 5:
                    cards_box = cards_box.replace(/card_lane4/g, 'card_lane' + i);
                    break;
                default:
                    i = 1;
                    cards_box = cards_box.replace(/card_lane5/g, 'card_lane' + i);
            }
            i++;
            $('.cards_box').removeClass('started');
            $('.cards_box').html(cards_box);
            clearTimeout(t);
            $('.cards_box .card_position1 .card_before img').load(function () {
                $('.cards_box').addClass('started');
                t = setTimeout(restartAnimation, 13000);
            });
        }
    }
    var i = 2;
    var t = false;
    $(window).on('load', function () {
        jQuery('.match').matchHeight();
        $('.cards_box').addClass('started');
        t = setTimeout(restartAnimation, 13000);
    });
    if ($('#accept-order').length) {
        if ($('#accept-order').is(':checked')) {
            $('#payment').removeClass('disabled');
        } else {
            $('#payment').addClass('disabled');
        }
    }
    $('#accept-order').change(function () {
        if ($(this).is(':checked')) {
            $('.payment-dis').removeClass('disabled');
        } else {
            $('.payment-dis').addClass('disabled');
        }
    });
    $('.content-popup-order #order-qty').change(function () {
        var data_price = $(this).find(':selected').data('price');
        if (data_price == 'contact') {
            var first_data_price = $(this).find('option:first').data('price');
            $(this).parents('.content-popup-order').find('#order-price').text(first_data_price);
            $(this).find('option:first').prop('selected', true);
            $(this).parents('.modal-dialog').find('.close').trigger('click');
            $(this).next().trigger('click');
            $(this).parents('body').find('.cards50plus').trigger('click');
        } else {
            $(this).parents('.content-popup-order').find('#order-price').text(data_price);
        }
    });
    $('#payment').click(function (e) {
        var token = function (res) {
            var $id = $('<input type=hidden name=stripeToken />').val(res.id);
            var $email = $('<input type=hidden name=stripeEmail />').val(res.email);
            $('form').append($id).append($email).submit();
        };
        var amount = $(this).parents('#order-now').find('#order-price').text();
        amount = amount * 100;
        StripeCheckout.open({
            key: 'pk_test_cRj8waq7Xh1RUfQj27khOtsN',
            amount: amount,
            name: 'UX Cards',
            image: 'images/Stripe-h-icon.png',
            description: 'Payment',
            panelLabel: 'Pay',
            currency: 'usd',
            token: token
        });
        return false;
    });
    $(window).on("load", function () {
        if ($('.collapse-menu-scroll').length) {
            var $sections = $('.link-top-scroll');
            var $sections_b = $('.link-botom-scroll');
            var $navs = $('.collapse-menu a').not('.toggle-submenu');
            var topsArray = $sections.map(function () {
                return $(this).position().top + $('.header').height();
            }).get();
            var bottomsArray = $sections_b.map(function () {
                return $(this).position().top + $('.header').height() + $(this).height();
            }).get();
            var len = topsArray.length;
            var currentIndex = 0;
            var getCurrent = function (top) {
                for (var i = 0; i < len; i++) {
                    if (top > topsArray[i] && top < bottomsArray[i]) {
                        return i;
                    }
                }
                if (i >= len) {
                    return i - 1;
                }
            };
            $(window).scroll(function (e) {
                jQuery('.match').matchHeight();
                var scrollTop = $(this).scrollTop();
                var checkIndex = getCurrent(scrollTop);
                if (checkIndex !== currentIndex) {
                    currentIndex = checkIndex;
                    $navs.removeClass("active");
                    $navs.eq(currentIndex).addClass("active");
                }
                if (checkIndex < 3) {
                    $('.sub-active2').removeClass('active');
                    $('.sub-active1').addClass('active');
                } else if (checkIndex >= 3) {
                    $('.sub-active1').removeClass('active');
                    $('.sub-active2').addClass('active');
                }
            });
            $(window).scroll(function () {
                var scrollTop = $(window).scrollTop(),
                    topMenuOffset = $('.collapse-menu-scroll').offset().top,
                    topMenuUlOffset = $('.collapse-menu').offset().top,
                    bottomMenuOffset = $('.check-bottom-menu-stick').offset().top,
                    space_conten_top = $('.collapse-content').offset().top,
                    bottomCollapseOffset = $('.bottom-collapse').offset().top,
                    space_to_top = (topMenuOffset - scrollTop),
                    space_bottom_to_top = (bottomMenuOffset - scrollTop),
                    space_bottom_collapse_to_top = (bottomCollapseOffset - scrollTop),
                    space_menu_to_top = (bottomCollapseOffset - bottomMenuOffset);
                if ((space_to_top <= 0)) {
                    $('.wrap-collapse-menu').addClass('stick_top');
                } else {
                    $('.wrap-collapse-menu').removeClass('stick_top');
                }
                if ((space_menu_to_top <= 0)) {
                    $('.wrap-collapse-menu').addClass('menu-stop');
                }
                if ((scrollTop <= 10904)) {
                    $('.wrap-collapse-menu').removeClass('menu-stop');
                }
            });
            $('.collapse-menu-scroll .collapse-menu a[href*="#"]').click(function (e) {
                e.preventDefault();
                if ($(this).hasClass('toggle-submenu')) {
                    $(this).toggleClass('active');
                } else {
                    $(this).parents('.collapse-menu').find('a:not(".toggle-submenu")').removeClass('active');
                    $(this).addClass('active');
                    if ($(this).attr('href') !== '#') {
                        if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
                            var target = $(this.hash);
                            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
                            if (target.length) {
                                $('html, body').animate({
                                    scrollTop: target.offset().top
                                }, 500);
                                return false;
                            }
                        }
                    }
                }
            });
        }
    });
    $('form.form-submit').change(function (e) {
        var validate = true;
        $(this).find('.required').each(function () {
            if ($(this).val() == '') {
                validate = false;
            }
        });
        if (validate == true) {
            $(this).find('button[type="submit"]').removeClass('disabled');
        } else {
            $(this).find('button[type="submit"]').addClass('disabled');
        }
    });
    $('form.form-submit').submit(function () {
        $(this).find('button[type="submit"]').addClass('success');
    });
    $('#mc-embedded-subscribe-form').submit(function (e) {
        var email = $(this).children('mce-EMAIL').val();
        var formURL = $(this).attr('action');
        var form = $(this);
        $.ajax({
            type: form.attr('method'),
            url: formURL,
            data: form.serialize(),
            cache: false,
            dataType: 'json',
            success: function (response) {
                form.find('#thanks').html('Almost done! We just need to confirm your email address. Please check the confirmation email we sent.');
                var postData = form.serialize();
                $.ajax({
                    type: "POST",
                    url: "https://uxdcards.com/inc/submit-forms.php",
                    data: postData,
                    dataType: "json",
                    success: function (data) {
                        console.log(data.status);
                        if (data.status == 'success') {
                            form.find('button[type="submit"]').addClass('success');
                        } else {
                            form.find('button[type="submit"]').addClass('error');
                        }
                        setTimeout(function () {
                            form.parents('.modal').find('button.close').trigger('click');
                        }, 5000);
                    },
                    error: function (xhr, ajaxOptions, thrownError) {
                        console.log(xhr.status);
                        console.log(thrownError);
                    }
                });
            }
        });
        e.preventDefault();
    });
    $('form.form-submit').submit(function (e) {
        e.preventDefault();
        var this_form = $(this);
        var postData = $(this).serialize();
        $.ajax({
            type: "POST",
            url: "https://uxdcards.com/inc/submit-forms.php",
            data: postData,
            dataType: "json",
            success: function (data) {
                console.log(data.status);
                if (data.status == 'success') {
                    $(this_form).parents('.modal').find('button.close').trigger('click');
                }
            },
            error: function (xhr, ajaxOptions, thrownError) {
                console.log(xhr.status);
                console.log(thrownError);
            }
        });
        console.log(postData);
    });
    $('#content-select a').click(function (e) {
        e.preventDefault();
        var value = $(this).attr('data-value');
        $(this).parents('li').addClass('checked').siblings().removeClass('checked');
        $('#label-select').html(value);
        $('#category-suggest').val(value);
    })
    $('#content-select1 a').click(function (e) {
        e.preventDefault();
        var value = $(this).attr('data-value');
        $(this).parents('li').addClass('checked').siblings().removeClass('checked');
        $('#label-select1').html(value);
        $('#category-notify').val(value);
    })
    $(document).ready(function () {
        $.stellar();

        function setup_slider_testimonial(sliderClass, apspeed) {
            $('.' + sliderClass).slick({
                dots: true,
                arrows: false,
                infinite: true,
                autoplay: false,
                autoplaySpeed: apspeed,
                speed: 1000,
                slidesToShow: 3,
                slidesToScroll: 3,
                responsive: [{
                    breakpoint: 1024,
                    settings: {
                        slidesToShow: 3,
                        slidesToScroll: 3,
                        infinite: true,
                        dots: true
                    }
                }, {
                    breakpoint: 600,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 2
                    }
                }, {
                    breakpoint: 480,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1
                    }
                }]
            });
        }
        setup_slider_testimonial('testimonial-slider2', 4000);
    });
    new WOW().init();
});
$(document).ready(function () {
    setTimeout("flip('.card1');", "1500");
    setTimeout("flip('.card2');", "2000");
    setTimeout("flip('.card3');", "2500");
    $('.wrapper-video').click(function (e) {
        var thise = $(this);
        var value = $(this).find('#wistia_smallPlayButton_77').attr('title');
        console.log(value);
        if (value == 'Play') {
            $('.iconplay').css('display', 'none');
        } else {
            $('.iconplay').css('display', 'block');
        }
    });
    $('.iconplay').click(function (e) {
        $(this).parents('.wrapper-video').find('#wistia_smallPlayButton_77').trigger('click');
        $('.iconplay').toggle();
    });
});

function flip(a) {
    $(a).addClass('flipped');
    $(a).removeClass('animated');
    $(a).children('.front').fadeOut("fast");
}
$(window).resize(function () {
    jQuery('.match').matchHeight();
});
