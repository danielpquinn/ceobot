/*global jQuery: true */
/*jslint devel: false, browser: true, sloppy: false, nomen: true, maxerr: 50, indent: 2 */

(function ($) {

  'use strict';

  $(document).ready(function () {

    var $title = $('.title'),
      $adverb = $('.adverb'),
      $adjective = $('.adjective'),
      $noun = $('.noun'),
      $body = $('body'),
      adverbs = [],
      adjectives = [],
      nouns = [],
      interval = 10000,
      winWidth = $(window).innerWidth(),
      methods = {
        grabSomething : function (arr) {
          var thing = arr[Math.floor(Math.random() * arr.length)];
          return thing;
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
            $w.html(methods.grabSomething(set));
            $w.css({
              'margin-left': winWidth * -1 + 'px',
              'opacity': 1
            }).animate({
              'margin-left': 0
            }, dur);
          });
        },

        init : function () {
          $body.css({
            'background-image': 'url("../images/' + Math.ceil(Math.random() * 4) + '.gif")'
          });
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
      $title.html(methods.grabSomething(data[0].titles));
      adverbs = data[0].adverbs;
      adjectives = data[0].adjectives;
      nouns = data[0].nouns;
      methods.init();
    });

  });

}(jQuery));