- autoplay for webm (only visible video?)
- titles for videos
- crop videos (remove toolbars)
- css: add margin to carousel
- css: videos fill carousel (width 100%)
- nice to have: carousel turns when video ends

https://stackoverflow.com/questions/2741493/detect-when-an-html5-video-finishes

```
<video src="video.ogv" id="myVideo">
  video not supported
</video>

<script type='text/javascript'>
    document.getElementById('myVideo').addEventListener('ended',myHandler,false);
    function myHandler(e) {
        // What you want to do after the event
    }
</script>
```

