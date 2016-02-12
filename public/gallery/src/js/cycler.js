(function(global){
  'use strict';

  function ImageCycler() {

    this.container = document.querySelector('.container');
    this.largeImg = document.querySelector('#largeImg');
    this.video = document.querySelector('.video');
    this.thumbs = document.querySelector('.thumbs');
    this.items = {};
    this.selectedIndex = 0;

    this.getItems.call(this, this.render);

  }


  ImageCycler.prototype.getItems = function(callback) {

    var request = new XMLHttpRequest();
    request.open('GET', 'gallery/src/items.json', true);

    request.onload = (function() {
      if (request.status >= 200 && request.status < 400) {
        try{
          var data = JSON.parse(request.responseText);
          this.items = data.items;
          callback.call(this);
        } catch(e) {
          throw 'Error at parsing items.json';
        }
      } else {
        // We reached our target server, but it returned an error
        throw 'Could not get items.json';
      }
    }).bind(this);

    request.onerror = function() {
      // There was a connection error of some sort
      throw 'Could not get items.json';
    };

    request.send();

  };



  ImageCycler.prototype.render = function() {

    var first = this.items[0];
    this.selectedIndex = 0;
    this.largeImg.setAttribute('src', first.large);
    this.largeImg.setAttribute('alt', first.name);
    this.largeImg.setAttribute('title', first.name);

    var html = '';

    for (var i = 0; i < this.items.length; i++) {
      html += '<a href="'+ this.items[i].large + '"title="' + this.items[i].name + '"' +
        ' data-index="' + i + '" ' + (i === 0 ? ' class="hidden" ' : '') + '>' +
        '<img src="'+ this.items[i].thumb + '"/></a>';
    }
    this.thumbs.insertAdjacentHTML('beforeend', html);

    this.thumbs.addEventListener('click', (function(event) {
      // implement jQuery.delegate()
      event.preventDefault();
      var target = event.target || event.srcElement;
      for (; target && target !== this; target = target.parentNode) {
      // loop parent nodes from the target to the delegation node
        if (target.matches('a')) {
          this.select.call(this, target, event);
          break;
        }
      }
    }).bind(this), false);

    this.placeNav();

  };

  ImageCycler.prototype.placeNav = function() {
    if (this.items.length < 2) {
      return;
    }

    var html = '<span class="control prev">&#8592;</span><span class="control next">&#8594;</span>';
    this.container.insertAdjacentHTML('beforeend', html);

    var thumbImgs = this.thumbs.querySelectorAll('a');

    this.container.querySelector('.prev').addEventListener('click', (function(event) {
      var prev = this.selectedIndex > 0 ? this.selectedIndex - 1 : thumbImgs.length - 1;
      this.select.call(this, thumbImgs[prev]);
    }).bind(this), false);

    this.container.querySelector('.next').addEventListener('click', (function(event) {
      var next = this.selectedIndex < thumbImgs.length - 1 ? this.selectedIndex + 1 : 0;
      this.select.call(this, thumbImgs[next]);
    }).bind(this), false);

  };

  ImageCycler.prototype.select = function(target) {

    var setIndex = parseInt(target.getAttribute('data-index'), 10);//used to check for item in the list to return position
                                                                    


    var thumbImgs = this.thumbs.querySelectorAll('a');
    var index;

    /*for (var i = 0; i < thumbImgs.length; i++) {
      thumbImgs[i].classList.remove('hidden');
    }

    target.classList.add('hidden');*/

    this.selectedIndex = setIndex;
    if (this.items[setIndex].type === 'image') {
      this.removeVideo();
      this.largeImg.setAttribute('src', this.items[setIndex].large);
      this.largeImg.setAttribute('alt', this.items[setIndex].name);
      this.largeImg.setAttribute('title', this.items[setIndex].name);
      this.largeImg.style.display = 'block';
    } else {
      this.largeImg.setAttribute('src', '');
      this.largeImg.style.display = 'none';
    }

    if (this.items[setIndex].type === 'video') {
      this.placeVideo(this.items[setIndex].width, this.items[setIndex].height,
        this.items[setIndex].mp4, this.items[setIndex].webm, this.items[setIndex].ogg);
      var vid = this.video.querySelector('video');
      vid.play();
    }

  };

  ImageCycler.prototype.placeVideo = function(width, height, mp4, webm, ogg) {

    //var html = '<video controls preload="auto" width="' + width + '" height="' + height + '">' +
    var html = '<video controls preload="auto" width="" height="' + height + '">' +
        '<source src="' + mp4 + '" type="video/mp4" />' +
        '<source src="' + webm + '" type="video/webm" />' +
        '<source src="' + ogg + '" type="video/ogg" />' +
      '</video>';

    this.video.innerHTML = html;
  };

  ImageCycler.prototype.removeVideo = function() {
    this.video.innerHTML = '';
  };


  function domReady() {
    new ImageCycler();
  }

  document.addEventListener('DOMContentLoaded', function() {
    domReady();
  }, false);

  global.ImageCycler = ImageCycler;

})(this);
