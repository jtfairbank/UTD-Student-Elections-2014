// https: *en.wikipedia.org/wiki/Big_Four_Bridge

$(function() {
  'use strict';

  /* Hearts
   * ==========================================================================
   *
   * [Some sugar and spice and everything nice](http://meandmyfood.blogspot.nl/2014/03/swedish-cinnamon-cardamon-buns.html)
   *
   * Recipes are procedural aren't they?
   *
   * **TODO:**
   *
   *   * manual testing- it looks like it works *shrug*
   *
   *   * Test for multiple .hearts modules on one page- the elements may
   *     all be included in $hearts, but I need to blink them at a per
   *     module level, not globally
   *
   *     Ok for now, since we only have one .hearts.  I'll give it an id,
   *     just to make it clear only one can be on a page now.  This is
   *     actually a slightly faster approach (selecting an id), though it
   *     doesn't matter at this scale.
   *
   *     overengineering ;)
   *
   *   * Test efficiency on mobile- don't want to kill batter.  Once again,
   *     overengineering at this scale, but certainly a concern with larger
   *     more complex interfaces.  Or ones that take a lot of processing
   *     power already (network i/o).
   */
   var hearts = {
      howFast: 1500 // my current heart rate 90/min

      // internal state
    , beating: false
    , attack: null
    , $hearts: $("#hearts > .heart")
    , show: 0

      // init
    , TheseAreTheResultsOfAThousandElectricVolts: function() {
        if (!this.beating) {
          this.beating = true;
          this.attack = setInterval(this.beat.bind(this), 1000);
        }
      }

    , beat: function () {
        // out
        var $systole = $(this.$hearts[this.show]);
        $systole.hide();

        this.show++;
        if (this.show == this.$hearts.length) {
          this.show = 0;
        }

        // in
        var $diastole = $(this.$hearts[this.show]);
        $diastole.show();
      }
  };

  hearts.TheseAreTheResultsOfAThousandElectricVolts();


/* Senators
 * ========================================================================== */

  var senators = [];

  /* Elect Senators
   * ------------------------------------------------------ */
  $.get("static/data/senators.csv")
    .done(function(senatorsCSV) {
      senators = Senator.importAllFromCSV(senatorsCSV);
      senators = senators.sort(Senator.compareName);

      for (var i = 0; i < senators.length; i++) {
        var senator = senators[i];
        var $senator = senator.getOverview();
        $senator.data('index', i);
        $("#senators").append($senator);
      }

      $("#filters").show();
      $("#senators").show();
      $("#contentLoadFailure").hide();
    })

    .fail(function() {
      $("#filters").hide();
      $("#senators").hide();
      $("#contentLoadFailure").show();
      // TODO: automated bug report
    });


  /* Filters
   * ------------------------------------------------------ */
  // setup
  $("#filter-year .btn").on('click.removeClassActive', function() {
    $("#filter-year .btn").removeClass('active');
    $("#filter-year .btn").off('click.removeClassActive');
  });

  $("#filter-year .btn").click(function() {
    var year = $(this).data('year');

    $(".senator").each(function() {
      var i = $(this).data('index');
      var senator = senators[i];

      if (year == "all" || year == senator.year) {
        $(this).show();
      } else {
        $(this).hide();
      }
    });

  });


});