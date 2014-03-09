/* Senator
 * ========================================================================== */


/* Constructors
 * ------------------------------------------------------ */

function Senator(properties) {
  $.extend(this, this.template, properties);
}

/* ### Template ###
 *
 * The consuming code can change the default values for a Senator by
 * setting `Senator.template.XXX = ...`.
 */
Senator.template = {
    class: ""
  , name: ""
  , major: ""
  , involvement: ""
  , goals: ""
};

/* ### Import All From CSV ###
 * 
 * Creates Senators from a string of csv data.
 * 
 * Expected csv column format:
 *
 *     class, name, major, involvement, goals
 *
 * Expected csv file layout:
 *
 *     headers                   (can be anything, this line is skipped)
 *     data                      (must follow the column format described above) 
 *     data
 *     ...
 */
Senator.importAllFromCSV = function(csv) {
  var senators = [];

  var senatorsData = csv.split('\n');
  for (var i = 0; i < senatorsData.length; i++) {
    var data = senatorsData[i].split('');
    var keys = Senator.template.keys();

    var properties = {};
    for (var j = 0; j < senator; j++) {
      properties[keys[j]] = data[j];
    }

    senators.push(new Senator(properties));
  }

  return senators;
};


/* Display
 * ------------------------------------------------------
 *
 * ** Layout **
 *
 * key:  - components, * data container
 *
 *   - .senator
 *       - .sentator-label
 *           * .senator-name
 *           * .senator-major
 *           * .senator-class
 *
 *       * .senator-involvement
 *       * .senator-goals
 */

Senator.prototype.getOverview = function() {
  var $overview = $(
    '<div class="senator">' +
      this.getLabel() +
      '<div class="senator-involvement">'+this.involvement+'</span>' +
      'div class="senator-goals">'+this.goals+'</span>' +
    '</div>'
  );

  return $overview;
};

Senator.prototype.getLabel = function() {
  var $label = $(
    '<div class="senator-label">' +
      '<span class="senator-name">'+this.name+'</span>' +
      '<span class="senator-major">'+this.major+'</span>' +
      '<span class="senator-class">'+this.class+'</span>' +
    '</div>'
  );

  return $label;
};