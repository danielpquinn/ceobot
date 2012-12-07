/*global jQuery: true */
/*jslint devel: false, browser: true, sloppy: false, nomen: true, maxerr: 50, indent: 2 */

(function ($) {

  'use strict';

  $(document).ready(function () {

    var $adverb = $('.adverb'),
      $adjective = $('.adjective'),
      $noun = $('.noun'),
      adverbs = [],
      adjectives = [],
      nouns = [],
      interval = 10000,
      winWidth = $(window).innerWidth(),
      methods = {
        grabWord : function (arr) {
          var word = arr[Math.floor(Math.random() * arr.length)];
          return word;
        },

        updateWords : function () {
          if (Math.random() > 0.5) {
            methods.animateWord($adverb, adverbs, 1000);
          } else {
            $adverb.html('');
          }
          methods.animateWord($adjective, adjectives, 1200);
          methods.animateWord($noun, nouns, 1400);
        },

        animateWord : function ($w, set, dur) {
          $w.animate({
            'margin-left': winWidth + 'px',
            'opacity': 0
          }, dur, function () {
            $w.html(methods.grabWord(set));
            $w.css({
              'margin-left': winWidth * -1 + 'px',
              'opacity': 1
            }).animate({
              'margin-left': 0
            }, dur);
          });
        },

        init : function (dat) {
          methods.updateWords();
          setInterval(function () {
            methods.updateWords();
          }, interval);
        }
      };

    $.ajax({
      url: 'words.json',
      dataType: 'json'
    }).done(function (data) {
      adverbs = data[0].adverbs;
      adjectives = data[0].adjectives;
      nouns = data[0].nouns;
      methods.init();
    });

  });

}(jQuery));