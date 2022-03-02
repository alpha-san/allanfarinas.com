$(function() {
  const animateTyping = async (el, nextCharDelay, beginDelay, endDelay) => {
    return new Promise((resolve) => {
      const textArray = $(el).text().split("");
      $(el).html("");
      $("<span class='cursor' />").appendTo(el);

      let setTimeoutIds = [];
      textArray.forEach((c, index) => {
        setTimeoutIds.push(setTimeout(() => {
            const currentText = $(el).text();
            $(el).text(currentText + c);
            $("<span class='cursor' />").appendTo(el);
          }, beginDelay + (nextCharDelay * (index + 1)))
        );
      });

      const totalAnimationTime = (textArray.length * nextCharDelay) + endDelay;
      const cancelTypingAnimation = () => {
        setTimeoutIds.forEach(id => clearTimeout(id));
        $(el).text(textArray.join(""));
        $(".cursor").hide();
        resolve(true);
      };

      $('body').click(() => cancelTypingAnimation());
      setTimeout(() => {
        $(".cursor").hide();
        resolve(true);
      }, totalAnimationTime);
    });
  };

  const animateElements = async () => {
    return new Promise(async (resolve) => {
      const nextCharDelay = 100;
      const beginDelay = 2000;
      const endDelay = 4000;
      const elementsToAnimate = $(".typing-animation").toArray();
      
      $(".typing-animation").css("visibility", "hidden");
      const totalAnimationTime = elementsToAnimate.reduce((acc, curr) =>  acc + ($(curr).text().length * nextCharDelay) + beginDelay + endDelay);
  
      for (const el of elementsToAnimate) {
        $(el).css("visibility", "visible");
        await animateTyping(el, nextCharDelay, beginDelay, endDelay);
      }

      setTimeout(() => {
        resolve(true);
        
      }, totalAnimationTime);
    });
  };

  setTimeout(() => $("#soundcloudIframeContainer").hide(), 2000);
  animateElements().then(() => $("#soundcloudIframeContainer").fadeIn(1500));
});