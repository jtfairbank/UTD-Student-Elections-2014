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
    year: ""
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
 *     year, name, major, involvement, goals
 *
 * Expected csv file layout:
 *
 *     headers                   (can be anything, this line is skipped)
 *     data                      (must follow the column format described above) 
 *     data
 *     ...
 */
Senator.importAllFromCSV = function(doc) {
  var senators = [];

  var senatorsCsv = $.csv.toArrays(doc);
  var warn = function(line) {
    console.warn('Malformed Data on line '+line);
    console.log(data);
    console.log(keys);
    // TODO: automated bug report
  };
  var i = 1; // SKIP THE FIRST LINE OF HEADER DATA
  for (; i < senatorsCsv.length; i++) {
    var keys = Object.keys(Senator.template);
    var data = senatorsCsv[i];

    if (data.length < keys.length || data.length > keys.length+1) {
      warn(i);
    } else if (data.length == keys.length+1) {
      if (data[data.length-1].replace(/\s+/, '') === "") {
        data.pop();
      } else {
        warn(i);
      }
    }

    var properties = {};
    for (var j = 0; j < data.length; j++) {
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
 *       - .senator-profile-wrapper
 *           * .senator-profile
 *
 *       - .senator-details
 *           * .senator-involvement
 *           * .senator-goals
 *
 *              - .sentator-label
 *                  * .senator-name
 *                  * .senator-major
 *                  * .senator-class
 */

Senator.prototype.getOverview = function() {
  var $overview = $(
    '<div class="senator row">' +
      '<div class="senator-profile-wrapper col-md-offset-1 col-md-3"></div>' +
      '<div class="senator-details col-md-7">' +
        '<p class="senator-involvement">'+this.involvement+'</p>' +
        '<p class="senator-goals">'+this.goals+'</p>' +
      '</div>' +
    '</div>'
  );
  $overview.find(".senator-profile-wrapper").append(this.getProfile());
  $overview.find(".senator-details").prepend(this.getLabel());

  return $overview;
};

Senator.prototype.getLabel = function() {
  var $label = $(
    '<div class="senator-label">' +
      '<p class="senator-name">'+this.name+'</p>' +
      '<p>' +
        '<span class="senator-major">'+this.major+',</span> ' +
        '<span class="senator-class">'+this.year+'</span>' +
      '</p>' +
    '</div>'
  );

  return $label;
};

Senator.prototype.getProfile = function() {
  $profile = $('<img class="senator-profile" src="static/img/senator/'+this.name+'.jpg" alt="'+this.name+'\'s Profile Image" />');

  return $profile;
};


/* Comparison
 * ------------------------------------------------------ */

Senator.compareProperty = function(a, b, prop) {
  if (a[prop] < b[prop]) {
    return -1;
  } else if (a[prop] > b[prop]) {
    return 1;
  } else {
    return 0;
  }
}

Senator.compareYear = function(a, b) {
  return Senator.compareProperty(a, b, 'year');
}

Senator.compareName = function(a, b) {
  return Senator.compareProperty(a, b, 'name');
}