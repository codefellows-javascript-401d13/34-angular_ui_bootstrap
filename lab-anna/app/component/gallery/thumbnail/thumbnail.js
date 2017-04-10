'use strict';

require('./_thumbnail.scss');

module.exports = {
  template: require('./thumbnail.html'),
  controller: ['$log', 'picService', ThumbnailController],
  controllerAs: 'thumbnailCtrl',
  bindings: {
    pic: '<',
    galleryid: '='
  }
};

function ThumbnailController($log, picService) {
  $log.debug('ThumbnailController');

  this.deletePic = function() {
    $log.debug('deletePic', this.galleryid, this.pic._id);
    picService.deletePic(this.galleryid, this.pic._id);
  };
}


// this.deleteGallery = function() {
//   galleryService.deleteGallery(this.gallery._id);
// };
