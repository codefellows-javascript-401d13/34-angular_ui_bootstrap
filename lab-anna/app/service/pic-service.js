'use strict';

module.exports = ['$q', '$log', '$http', 'Upload', 'authService', 'galleryService', picService];

function picService($q, $log, $http, Upload, authService, galleryService) {
  $log.debug('picService');

  let service = {};

  service.uploadGalleryPic = function(galleryData, picData) {
    $log.debug('service.uploadGalleryPic');

    return authService.getToken()
    .then( token => {
      let url = `${__API_URL__}/api/gallery/${galleryData._id}/pic`;
      let headers = {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json'
      };

      return Upload.upload({
        url,
        headers,
        method: 'POST',
        data: {
          name: picData.name,
          desc: picData.desc,
          file: picData.file
        }
      });
    })
    .then( res => {
      galleryData.pics.unshift(res.data);
      return res.data;
    })
    .catch( err => {
      $log.error(err.message);
      return $q.reject(err);
    });
  };

  service.deletePic = function(galleryID, picID) {
    $log.debug('service.deletePic');

    return authService.getToken()
    .then( token => {
      let url = `${__API_URL__}/api/gallery/${galleryID}/pic/${picID}`;
      let config = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      };

      return $http.delete(url, config);
    })
    .then( res => {
      let gallery = null;
      for (let i=0; i<galleryService.galleries.length; i++) {
        let current = galleryService.galleries[i];
        if (current._id === galleryID) {
          gallery = current;
          break;
        }
      }
      for (let j=0; j<gallery.pics.length; j++) {
        let current = gallery.pics[j];
        if (current._id === picID) {
          gallery.pics.splice(j, 1);
          break;
        }
      }
      return res.data;
    })
    .catch( err => {
      $log.error(err.message);
      return $q.reject(err);
    });

  };

  return service;
}
