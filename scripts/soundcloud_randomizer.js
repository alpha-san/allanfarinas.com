$(function() {
  const songIds = [
    289842554,
    204715554,
    255320064,
    865681609,
    303610726,
    289842554,
  ];
  const randomNum = Math.floor(Math.random() * 3);

  const songUrl = 
    `https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/${songIds[randomNum]}&amp;auto_play=false&amp;hide_related=false&amp;show_comments=true&amp;show_user=true&amp;show_reposts=false&amp;visual=true`;
  $("#soundcloud_iframe").attr('src', songUrl);

  const monitor = setInterval(() => {
    const elem = document.activeElement;
    if (elem && elem.tagName == 'IFRAME'){
      const musicCopy = $(".p-music").text();
      $(".p-music").text(musicCopy.slice(0, musicCopy.length-1));
      $("<span style='display: none;'> (🔄 for randomly selected track):</span>").appendTo(".p-music");
      setTimeout(() => $(".p-music span").fadeIn(3000));
      clearInterval(monitor);
    }
  }, 100);
});
