$(document).ready(function () {
    // ****** Variables globales pour les sélecteurs
    const $navbarToggler = $('.navbar-toggler');
    const $description = $('.description');
    const $weatherTrad = $('.weather-trad');

    // ****** Menu actif/inactif
    function initMenu() {
        $navbarToggler.on('click', function () {
            $('.menu-header').toggleClass('menu-header-active');
        });
    }

    // ****** Texte présentation page Home
    function initDescriptionToggle() {
        if ($description.length) {
            const $seeMore2 = $('#seeMore2');
            const $seeLess2 = $('#seeLess2');

            // Vérifie hauteur description
            if ($description[0].scrollHeight <= $description.height()) {
                $seeMore2.hide();
                $seeLess2.hide();
            } else {
                $seeMore2.show();
                $seeLess2.hide();
            }

            // Voir plus
            $seeMore2.on('click', function (e) {
                e.preventDefault();
                $description.css('height', 'auto').addClass('expanded');
                $seeMore2.hide();
                $seeLess2.show();
            });

            // Voir moins
            $seeLess2.on('click', function (e) {
                e.preventDefault();
                $description.css('height', '').removeClass('expanded');
                $seeMore2.show();
                $seeLess2.hide();
            });
        }
    }

    // ****** Traduction météo
    function initWeatherTranslation() {
        const weatherTranslations = {
            'clear-day': 'Clair',
            'Cloudy': 'Nuageux',
            'fog': 'Brouillard',
            'partly-cloudy-day': 'Mi-couvert',
            'rain': 'Pluie',
            'sleet': 'Verglas',
            'snow': 'Neige',
            'wind': 'Vent',
        };

        $weatherTrad.each(function () {
            const $this = $(this);
            const weatherTrad = $this.attr('data') || 'Undefined';
            const translation = weatherTranslations[weatherTrad] || 'Non defini';
            $this.text(translation);
        });
    }

    function initDescriptionToggle() {
        if ($description.length) {
            const $seeMore2 = $('#seeMore2');
            const $seeLess2 = $('#seeLess2');

            // Vérifie hauteur description
            if ($description[0].scrollHeight <= $description.height()) {
                $seeMore2.hide();
                $seeLess2.hide();
            } else {
                $seeMore2.show();
                $seeLess2.hide();
            }

            // Voir plus
            $seeMore2.on('click', function (e) {
                e.preventDefault();
                $description.css('height', 'auto').addClass('expanded');
                $seeMore2.hide();
                $seeLess2.show();
            });

            // Voir moins
            $seeLess2.on('click', function (e) {
                e.preventDefault();
                $description.css('height', '').removeClass('expanded');
                $seeMore2.show();
                $seeLess2.hide();
            });
        }
    }

    // ****** Gestion des options SCEA
    function initSceaToggle() {
        const $optionsScea = $('.options-scea');
        const totalOptions = $optionsScea.length;

        // Afficher les 10 premiers éléments et cacher les autres
        $optionsScea.hide().slice(0, 10).show();

        // Si toutes les options sont déjà visibles, cacher le bouton "Voir plus"
        const visibleOptions = $optionsScea.filter(':visible').length;
        if (visibleOptions === totalOptions) {
            $('#seeMore1').hide();
        } else {
            $('#seeMore1').show();
        }

        $('#seeMore1').on('click', function (e) {
            e.preventDefault();

            $($optionsScea).slideDown();

            // Gestion des boutons
            $('#seeMore1').hide();
            $('#seeLess1').show();
        });

        $('#seeLess1').on('click', function (e) {
            e.preventDefault();

            $($optionsScea).not(":lt(10)").slideUp();

            // Gestion des boutons
            $('#seeMore1').show();
            $('#seeLess1').hide();
        });
    }

    // Prix chèques cadeaux
    function clickOnVoucherPrice() {
        // Clics sur les liens des prix chèques cadeaux
        $('.all-prices-vouchers a').on('click', function (event) {
            event.preventDefault();

            var targetId = $(this).attr('id');

            // Trouver l'élément correspondant dans le slider
            var targetElement = $(targetId);
            if (targetElement.length) {
                var index = $('.vouchers-slider').find('.owl-item').filter(function () {
                    return $(this).find(targetId).length > 0;
                }).index();

                // Si un index valide est trouvé, déplacer le slider
                if (index !== -1) {
                    $('.vouchers-slider').trigger('to.owl.carousel', [index, 600]);
                } else {
                    console.error("Impossible de trouver l'index dans Owl Carousel pour :", targetId);
                }
            } else {
                console.error("Cible non trouvée pour :", targetId);
            }
        });

        // Détecter le changement dans Owl Carousel pour le .active
        $('.vouchers-slider').on('changed.owl.carousel', function (event) {
            var currentIndex = event.item.index;

            // Sélectionner l'élément actif dans le slider
            var activeSlide = $(event.target).find('.owl-item').eq(currentIndex).find('.giftcard-index');

            if (activeSlide.length) {
                var activeId = activeSlide.attr('id');
                console.log("Élément actif dans le slider :", activeId);

                $('.all-prices-vouchers a').removeClass('active');

                $('.all-prices-vouchers a[href="#' + activeId + '"]').addClass('active');

            }
        });
    }

    // ****** Clic description AROUND
    function initDescriptionAroundToggle() {
        $(".seeMore4").on("click", function (e) {
            // Clic sur "Voir plus"
            e.preventDefault();
            var $container = $(this).closest(".descrip-around-contain");
            var $description = $container.find(".description-around");
            $description.addClass("expanded");
            $container.find(".seeMore4").hide();
            $container.find(".seeLess4").show();
        });

        // Clic sur "Voir moins"
        $(".seeLess4").on("click", function (e) {
            e.preventDefault();
            var $container = $(this).closest(".descrip-around-contain");
            var $description = $container.find(".description-around");
            $description.removeClass("expanded");
            $container.find(".seeMore4").show();
            $container.find(".seeLess4").hide();
        });
    }

    // ****** Initialisation des modules
    initMenu();
    initDescriptionToggle();
    initWeatherTranslation();
    initSceaToggle();
    clickOnVoucherPrice();
    initDescriptionAroundToggle();
});

$(document).ready(function () {
    $('.slider-options').owlCarousel({
        loop: false,
        rewind: true,
        autoplay: false,
        navText: [
            "<span class='indic-nav'><i class='las la-arrow-left'></i> AVANT </span>",
            "<span class='indic-nav'> APRES <i class='las la-arrow-right'></i></span> "
        ],
        margin: 10,
        dots: false,
        nav: true,
        responsiveClass: true,
        responsive: {
            0: {
                items: 1,
                touchDrag: true,
                mouseDrag: true,
            },
            768: {
                items: 2,
                touchDrag: true,
                mouseDrag: true,
            },
            1024: {
                items: 3,
                touchDrag: true,
                mouseDrag: true,
            },
            1220: {
                items: 4,
                touchDrag: false,
                mouseDrag: true,
            },
        }
    });
    $('.slider-gallery').owlCarousel({
        loop: true,
        rewind: false,
        autoplay: true,
        autoplayHoverPause: true,
        responsiveClass: true,
        dots: false,
        nav: false,
        items: 1,
        responsive: {
            0: {
                touchDrag: true,
                mouseDrag: true,
            },
            768: {
                touchDrag: true,
                mouseDrag: true,
            },
            1220: {
                touchDrag: false,
                mouseDrag: true,
            },
        }
    });
    $('.slider-special-offers').owlCarousel({
        loop: false,
        rewind: true,
        autoplay: false,
        navText: [
            "<span class='indic-nav'><i class='las la-arrow-left'></i> AVANT </span>",
            "<span class='indic-nav'> APRES <i class='las la-arrow-right'></i></span> "
        ],
        margin: 10,
        dots: false,
        nav: true,
        responsiveClass: true,
        responsive: {
            0: {
                items: 1,
                touchDrag: true,
                mouseDrag: true,
            },
            768: {
                items: 1,
                touchDrag: true,
                mouseDrag: true,
            },
            1024: {
                items: 2,
                touchDrag: true,
                mouseDrag: true,
            },
            1220: {
                items: 2,
                touchDrag: false,
                mouseDrag: true,
            },
        }
    });
    $('.slider-giftcards').owlCarousel({
        loop: false,
        rewind: true,
        autoplay: false,
        navText: [
            "<span class='indic-nav'><i class='las la-arrow-left'></i> AVANT </span>",
            "<span class='indic-nav'> APRES <i class='las la-arrow-right'></i></span> "
        ],
        margin: 10,
        dots: false,
        nav: true,
        responsiveClass: true,
        responsive: {
            0: {
                items: 1,
                touchDrag: true,
                mouseDrag: true,
            },
            768: {
                items: 1,
                touchDrag: true,
                mouseDrag: true,
            },
            1024: {
                items: 2,
                touchDrag: true,
                mouseDrag: true,
            },
            1220: {
                items: 2,
                touchDrag: false,
                mouseDrag: true,
            },
        }
    });
    $('.vouchers-slider').owlCarousel({
        loop: false,
        rewind: true,
        autoplay: false,
        items: 1,
        autoHeight: true,
        responsiveClass: true,
        dots: false,
        nav: false,
        margin: 10,
        responsive: {
            0: {
                touchDrag: true,
                mouseDrag: true,
            },
            1024: {
                touchDrag: true,
                mouseDrag: true,
            },
            1220: {
                touchDrag: false,
                mouseDrag: true,
            },
        }
    });
});